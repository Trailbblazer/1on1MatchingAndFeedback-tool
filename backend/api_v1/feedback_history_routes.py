from flask import request, jsonify
from datetime import datetime
from backend.database.base import db
from backend.database import FeedbackHistory
from backend.validation.feedback_history_validation import validate_feedback_history
from backend.date_utils import parse_date, parse_db_date
from .routes import api_v1, row_to_dict

@api_v1.route("/feedback_history/all", methods=["GET"]) # Returns everything
def get_all_feedback_history():
    try:
        rows = FeedbackHistory.query.all()
        return jsonify([row_to_dict(r) for r in rows]), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@api_v1.route("/feedback_history", methods=["GET"])
def get_feedback_history():
    try:
        startup_id = request.args.get("startupId", type=int)
        include_future = request.args.get("includeFuture", "false").lower() == "true"
        include_past = request.args.get("includePast", "false").lower() == "true"

        # Require startupId
        if not startup_id:
            return jsonify({"error": "startupId is required"}), 400

        # Validate startup exists
        from backend.database import Startups
        if not Startups.query.get(startup_id):
            return jsonify({"error": f"StartupId {startup_id} does not exist"}), 400

        # Base query
        all_rows = FeedbackHistory.query.filter_by(StartupId=startup_id).all()
        today = datetime.utcnow().date()

        # Apply date filters
        if include_future:
            rows = [
                r for r in all_rows
                if parse_db_date(r.DateFeedbackOriginal)
                and parse_db_date(r.DateFeedbackOriginal) > today
            ]
        elif include_past:
            rows = [
                r for r in all_rows
                if parse_db_date(r.DateFeedbackOriginal)
                and parse_db_date(r.DateFeedbackOriginal) <= today
            ]
        else:
            rows = all_rows

        return jsonify([row_to_dict(r) for r in rows]), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 400

@api_v1.route("/feedback_history/<int:id>", methods=["GET"])
def get_feedback_history_by_id(id):
    try:
        row = FeedbackHistory.query.get(id)
        if not row:
            return jsonify({"error": "Not found"}), 404
        return jsonify(row_to_dict(row)), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@api_v1.route("/feedback_history", methods=["POST"])
def add_feedback_history():
    data = request.json or {}
    validate_feedback_history(data)
    try:
        new_row = FeedbackHistory(
            StartupName=data.get("StartupName"),
            DateFeedbackOriginal=parse_date(data.get("DateFeedbackOriginal")),
            StartupGrade=data.get("StartupGrade"),
            CoachGrade=data.get("CoachGrade"),
            StartupTextFeedback=data.get("StartupTextFeedback"),
            CoachTextFeedback=data.get("CoachTextFeedback"),
            UpdatedStartupGrade=data.get("UpdatedStartupGrade"),
            DateUpdatedStartupGrade=parse_date(data.get("DateUpdatedStartupGrade")),
            DailyFeedbackId=data.get("DailyFeedbackId"),
            StartupId=data.get("StartupId"),
            CoachId=data.get("CoachId"),
        )
        db.session.add(new_row)
        db.session.commit()
        return jsonify({"message": "FeedbackHistory created", "id": new_row.FeedbackHistoryId}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 400

@api_v1.route("/feedback_history/<int:id>", methods=["PATCH"])
def update_feedback_history(id):
    try:
        row = FeedbackHistory.query.get(id)
        if not row:
            return jsonify({"error": "Not found"}), 404

        data = request.json or {}
        validate_feedback_history(data, is_patch=True)

        for key, value in data.items():
            if key in ("DateFeedbackOriginal", "DateUpdatedStartupGrade"):
                value = parse_date(value)
            setattr(row, key, value)

        db.session.commit()
        return jsonify({"message": "FeedbackHistory updated"}), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 400

@api_v1.route("/feedback_history/<int:id>", methods=["DELETE"])
def delete_feedback_history(id):
    try:
        row = FeedbackHistory.query.get(id)
        if not row:
            return jsonify({"error": "Not found"}), 404

        db.session.delete(row)
        db.session.commit()
        return jsonify({"message": "FeedbackHistory deleted"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 400