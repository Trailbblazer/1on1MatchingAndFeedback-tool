from flask import request, jsonify
from backend.database.base import db
from backend.database import Coaches
from backend.validation.coach_validation import validate_coach
from backend.api_v1.routes import api_v1, row_to_dict, parse_date
import logging

@api_v1.route("/coaches", methods=["GET"])
def get_coaches():
    try:
        coaches = Coaches.query.all()
        return jsonify([row_to_dict(c) for c in coaches]), 200
    except Exception as e:
        logging.error(f"Error fetching coaches: {e}")
        return jsonify({"error": str(e)}), 400

@api_v1.route("/coaches/<int:id>", methods=["GET"])
def get_coach_by_id(id):
    try:
        coach = Coaches.query.get(id)
        if not coach:
            return jsonify({"error": "Coach not found"}), 404
        return jsonify(row_to_dict(coach)), 200
    except Exception as e:
        logging.error(f"Error fetching coach: {e}")
        return jsonify({"error": str(e)}), 400

@api_v1.route("/coaches", methods=["POST"])  # Add coach
def add_coach():
    try:
        data = request.json or {}
        validate_coach(data)

        new_coach = Coaches(
            CoachName=data.get("CoachName"),
            Email=data.get("Email"),
            Phone=data.get("Phone"),
            Chat=data.get("Chat"),
            Bio=data.get("Bio"),
            Expertise=data.get("Expertise"),
            SocialMedia=data.get("SocialMedia"),
            CoachingSessions=data.get("CoachingSessions", 0),
            BatchesCoached=data.get("BatchesCoached", 0)
        )
        db.session.add(new_coach)
        db.session.commit()

        return jsonify({
            "message": "Coach added successfully",
            "coach": row_to_dict(new_coach)
        }), 201

    except Exception as e:
        db.session.rollback()
        logging.error(f"Error adding coach: {e}")
        return jsonify({"error": str(e)}), 400

@api_v1.route("/coaches/<int:id>", methods=["PATCH"])
def patch_coach(id):
    try:
        coach = Coaches.query.get(id)
        if not coach:
            return jsonify({"error": "Coach not found"}), 404

        data = request.json or {}

        existing = row_to_dict(coach)
        merged = {**existing, **data}
        validate_coach(merged)

        for key, value in data.items():
            if hasattr(coach, key):
                setattr(coach, key, value)

        db.session.commit()
        return jsonify({"message": "Coach updated"}), 200

    except Exception as e:
        db.session.rollback()
        logging.error(f"Error updating coach: {e}")
        return jsonify({"error": str(e)}), 400

@api_v1.route("/coaches/<int:id>", methods=["DELETE"])
def delete_coach(id):
    try:
        coach = Coaches.query.get(id)
        if not coach:
            return jsonify({"error": "Coach not found"}), 404

        db.session.delete(coach)
        db.session.commit()
        return jsonify({"message": "Coach deleted"}), 200

    except Exception as e:
        db.session.rollback()
        logging.error(f"Error deleting coach: {e}")
        return jsonify({"error": str(e)}), 400