from flask import request, jsonify
from backend.database.base import db
from backend.database import DailyFeedback
from backend.validation.daily_feedback_validation import validate_daily_feedback
from .routes import api_v1, row_to_dict, parse_date

@api_v1.route("/daily_feedback", methods=["GET"])
def get_daily_feedback():
    try:
        rows = DailyFeedback.query.all()
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