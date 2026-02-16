from flask import request, jsonify
from backend.database.base import db
from backend.database import FeedbackHistory
from .routes import api_v1, row_to_dict, parse_date
@api_v1.route("/feedback_history", methods=["GET"])
def get_feedback_history():
    try:
        rows = FeedbackHistory.query.all()
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
        for key, value in data.items():
            if key in ("DateFeedbackOriginal", "DateUpdatedStartupGrade"):
                value = parse_date(value)
            if hasattr(row, key):
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