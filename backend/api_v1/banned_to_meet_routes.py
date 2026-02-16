from flask import request, jsonify
from backend.database.base import db
from backend.database import BannedToMeet
from .routes import api_v1, row_to_dict, parse_date

@api_v1.route("/banned_to_meet", methods=["GET"])
def get_banned_to_meet():
    try:
        rows = BannedToMeet.query.all()
        return jsonify([row_to_dict(r) for r in rows]), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@api_v1.route("/banned_to_meet/<int:id>", methods=["GET"])
def get_banned_to_meet_by_id(id):
    try:
        row = BannedToMeet.query.get(id)
        if not row:
            return jsonify({"error": "Not found"}), 404
        return jsonify(row_to_dict(row)), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@api_v1.route("/banned_to_meet", methods=["POST"])
def add_banned_to_meet():
    data = request.json or {}
    try:
        new_row = BannedToMeet(
            StartupId=data.get("StartupId"),
            CoachId=data.get("CoachId"),
            DateFrom=parse_date(data.get("DateFrom")),
            DateTo=parse_date(data.get("DateTo")),
            Reason=data.get("Reason"),
        )
        db.session.add(new_row)
        db.session.commit()
        return jsonify({"message": "BannedToMeet created", "id": new_row.RestrictionId}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 400

@api_v1.route("/banned_to_meet/<int:id>", methods=["PATCH"])
def update_banned_to_meet(id):
    try:
        row = BannedToMeet.query.get(id)
        if not row:
            return jsonify({"error": "Not found"}), 404

        data = request.json or {}
        for key, value in data.items():
            if key in ("DateFrom", "DateTo"):
                value = parse_date(value)
            if hasattr(row, key):
                setattr(row, key, value)

        db.session.commit()
        return jsonify({"message": "BannedToMeet updated"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 400

@api_v1.route("/banned_to_meet/<int:id>", methods=["DELETE"])
def delete_banned_to_meet(id):
    try:
        row = BannedToMeet.query.get(id)
        if not row:
            return jsonify({"error": "Not found"}), 404

        db.session.delete(row)
        db.session.commit()
        return jsonify({"message": "BannedToMeet deleted"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 400