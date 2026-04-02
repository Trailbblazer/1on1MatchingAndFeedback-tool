from flask import request, jsonify
from datetime import datetime
from backend.database.base import db
from backend.database import DailyFeedback
from backend.validation.daily_feedback_validation import validate_daily_feedback
from backend.date_utils import parse_date, parse_db_date
from .routes import api_v1, row_to_dict

@api_v1.route("/daily_feedback/all", methods=["GET"]) # Returns everything
def get_all_daily_feedback():
    try:
        rows = DailyFeedback.query.all()
        return jsonify([row_to_dict(r) for r in rows]), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@api_v1.route("/daily_feedback", methods=["GET"])
def get_daily_feedback():
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
        all_rows = DailyFeedback.query.filter_by(StartupId=startup_id).all()
        today = datetime.utcnow().date()

        # Apply date filters
        if include_future:
            rows = [
                r for r in all_rows
                if parse_db_date(r.Date) and parse_db_date(r.Date) > today
            ]
        elif include_past:
            rows = [
                r for r in all_rows
                if parse_db_date(r.Date) and parse_db_date(r.Date) <= today
            ]
        else:
            rows = all_rows

        return jsonify([row_to_dict(r) for r in rows]), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 400

@api_v1.route("/daily_feedback/<int:id>", methods=["GET"])
def get_daily_feedback_by_id(id):
    try:
        row = DailyFeedback.query.get(id)
        if not row:
            return jsonify({"error": "Not found"}), 404
        return jsonify(row_to_dict(row)), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@api_v1.route("/daily_feedback", methods=["POST"])
def add_daily_feedback():
    data = request.json or {}
    validate_daily_feedback(data)
    try:
        new_row = DailyFeedback(
            FeedbackText=data.get("FeedbackText"),
            Date=parse_date(data.get("Date")),
            StartupId=data.get("StartupId"),
            CoachId=data.get("CoachId"),
        )
        db.session.add(new_row)
        db.session.commit()
        return jsonify({"message": "DailyFeedback created", "id": new_row.DailyFeedbackId}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 400

@api_v1.route("/daily_feedback/<int:id>", methods=["PATCH"])
def update_daily_feedback(id):
    try:
        row = DailyFeedback.query.get(id)
        if not row:
            return jsonify({"error": "Not found"}), 404

        data = request.json or {}

        existing = row_to_dict(row)
        merged = {**existing, **data}
        validate_daily_feedback(merged)

        for key, value in data.items():
            if key == "Date":
                value = parse_date(value)
            if hasattr(row, key):
                setattr(row, key, value)

        db.session.commit()
        return jsonify({"message": "DailyFeedback updated"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 400

@api_v1.route("/daily_feedback/<int:id>", methods=["DELETE"])
def delete_daily_feedback(id):
    try:
        row = DailyFeedback.query.get(id)
        if not row:
            return jsonify({"error": "Not found"}), 404

        db.session.delete(row)
        db.session.commit()
        return jsonify({"message": "DailyFeedback deleted"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 400