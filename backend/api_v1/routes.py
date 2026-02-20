from flask import Blueprint, jsonify
from datetime import datetime
from backend.database.base import db
from backend.database import (
    BannedToMeet,
    CoachAssignments,
    CoachSlots,
    DailyFeedback,
    FeedbackHistory,
    Startups,
)

api_v1 = Blueprint("api_v1", __name__)

# -----------------------
# Helper Functions
# -----------------------

def row_to_dict(row):
    return {col.name: getattr(row, col.name) for col in row.__table__.columns}

def parse_date(date_str):
    if not date_str:
        return None
    return datetime.strptime(date_str, "%Y-%m-%d").date()

# -------------------------
# Trend + Priority Logic
# -------------------------

def compute_trend_score(startup_id):
    # Negative trend = higher priority, positive trend = lower priority.
    history = (
        FeedbackHistory.query
        .filter_by(StartupId=startup_id)
        .order_by(FeedbackHistory.DateFeedbackOriginal.asc())
        .all()
    )
    if len(history) < 2:
        return 0 # no trend

    prev = history[-2].StartupGrade
    last = history[-1].StartupGrade
    
    if last is None or prev is None:
        return 0

    return -1 if last < prev else 1

def compute_startup_priority(startup_id):
    # Compute a priority score for a startup. (Lower score = higher priority.)
    # Count past meetings
    past_meetings = CoachAssignments.query.filter_by(StartupId=startup_id).count()

    # Get latest grade from FeedbackHistory
    latest_history = (
        FeedbackHistory.query
        .filter_by(StartupId=startup_id)
        .order_by(FeedbackHistory.DateFeedbackOriginal.desc())
        .first()
    )

    latest_grade = latest_history.StartupGrade if latest_history else 3  # neutral default

    # Get average daily feedback grade (if numeric grades are stored)
    daily_avg = 3  # neutral default / placeholder

    # Trend score (negative = worse, so higher priority)
    trend_score = compute_trend_score(startup_id)
    # Priority formula (tunable)
    score = (latest_grade * 0.5) + (daily_avg * 0.2) + (past_meetings * 0.1) + (trend_score * 0.2)
    return score

# ---------------------------
# Business Logic Endpoints
# ---------------------------

@api_v1.route('/availability/<int:coach_id>', methods=['GET'])
def availability(coach_id):
    # Return all upcoming, non-break slots for a given coach.
    try:
        today = datetime.today().date()
        slots = (
            CoachSlots.query
            .filter(CoachSlots.CoachId == coach_id)  # Query all slots for this coach that:
            .filter(CoachSlots.Date >= today)        # are on or after today
            .filter(CoachSlots.IsBreak == False)     # are not marked as break
            .all()
        )
        return jsonify([row_to_dict(s) for s in slots]), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@api_v1.route('/feedback/<int:startup_id>', methods=['GET'])
def feedback(startup_id):
    # Return combined DailyFeedback + FeedbackHistory for a startup.
    try:
        # Get all DailyFeedback for this startup
        daily = DailyFeedback.query.filter_by(StartupId=startup_id).all()
        # Get all FeedbackHistory for this startup
        history = FeedbackHistory.query.filter_by(StartupId=startup_id).all()
        # Build response
        response = {
            "startup_id": startup_id,
            "daily_feedback": [row_to_dict(d) for d in daily],
            "feedback_history": [row_to_dict(h) for h in history]
        }
        return jsonify(response), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400

# ---------------------------
# Matching Algorithm
# ---------------------------

MAX_MEETINGS_PER_STARTUP = 3
MAX_MEETINGS_PER_COACH = 5

@api_v1.route('/match', methods=['POST'])
def match():
    try:
        today = datetime.today().date()
        # Get all future, non-break slots
        slots = (
            CoachSlots.query
            .filter(CoachSlots.Date >= today)
            .filter(CoachSlots.IsBreak == False)
            .all()
        )

        # Get all startups
        startups = Startups.query.all()
        # Sort startups by priority (lower score = higher priority)
        sorted_startups = sorted(
            startups,
            key=lambda s: (
                compute_startup_priority(s.StartupId),
                CoachAssignments.query.filter_by(StartupId=s.StartupId).count()
            )
        )
        # Sort slots by coach load (fairness)
        slots = sorted(
            slots,
            key=lambda s: (
                CoachAssignments.query.filter_by(CoachId=s.CoachId).count(),
                s.Date
            )
        )
        matches = []
        for startup in sorted_startups:
            for slot in slots:
                # Skip if banned
                banned = BannedToMeet.query.filter_by(
                    StartupId=startup.StartupId,
                    CoachId=slot.CoachId
                ).first()
                if banned:
                    continue

                # Skip if this startup already met this coach before
                repeat_pair = CoachAssignments.query.filter_by(
                    StartupId=startup.StartupId,
                    CoachId=slot.CoachId
                ).first()

                # Only skip repeat pairing if there are other coaches available
                if repeat_pair:
                    # Check if ANY other coach is available for this startup
                    alternative_exists = any(
                        (CoachAssignments.query.filter_by(CoachId=s.CoachId).count() < MAX_MEETINGS_PER_COACH)
                        and not BannedToMeet.query.filter_by(StartupId=startup.StartupId, CoachId=s.CoachId).first()
                        and not CoachAssignments.query.filter_by(SlotId=s.SlotId).first()
                        for s in slots if s.CoachId != slot.CoachId
                    )
                    if alternative_exists:
                        continue

                # Skip if startup reached max meetings
                startup_meetings = CoachAssignments.query.filter_by(
                    StartupId=startup.StartupId
                ).count()
                if startup_meetings >= MAX_MEETINGS_PER_STARTUP:
                    continue

                # Skip if coach reached max load
                coach_meetings = CoachAssignments.query.filter_by(
                    CoachId=slot.CoachId
                ).count()
                if coach_meetings >= MAX_MEETINGS_PER_COACH:
                    continue
                    
                # Skip if slot already assigned
                assigned = CoachAssignments.query.filter_by(SlotId=slot.SlotId).first()
                if assigned:
                    continue
                    
                # Create assignment
                new_assignment = CoachAssignments(
                    StartupId=startup.StartupId,
                    CoachId=slot.CoachId,
                    SlotId=slot.SlotId,
                    Slot=slot.Slot,
                    Duration=slot.Duration,
                    Date=slot.Date,
                    StartupName=startup.StartupName
                )
                db.session.add(new_assignment)
                db.session.commit()

                matches.append(row_to_dict(new_assignment))
                break  # move to next startup

        return jsonify({"matches": matches}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 400