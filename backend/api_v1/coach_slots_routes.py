from flask import request, jsonify
from backend.database.base import db
from backend.database import CoachSlots
from backend.validation.coach_slot_validation import validate_coach_slot
from .routes import api_v1, row_to_dict, parse_date

@api_v1.route("/coach_slots", methods=["GET"])
def get_coach_slots():
    try:
        rows = CoachSlots.query.all()
        return jsonify([row_to_dict(r) for r in rows]), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@api_v1.route("/coach_slots/<int:id>", methods=["GET"])
def get_coach_slot_by_id(id):
    try:
        row = CoachSlots.query.get(id)
        if not row:
            return jsonify({"error": "Not found"}), 404
        return jsonify(row_to_dict(row)), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@api_v1.route("/coach_slots", methods=["POST"])
def add_coach_slot():
    data = request.json or {}
    validate_coach_slot(data)
    try:
        new_row = CoachSlots(
            CoachId=data.get("CoachId"),
            Slot=data.get("Slot"),
            Duration=data.get("Duration"),
            Date=parse_date(data.get("Date")),
            IsBreak=data.get("IsBreak", False),
        )
        db.session.add(new_row)
        db.session.commit()
        return jsonify({"message": "CoachSlot created", "id": new_row.SlotId}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 400

@api_v1.route("/coach_slots/<int:id>", methods=["PATCH"])
def update_coach_slot(id):
    try:
        row = CoachSlots.query.get(id)
        if not row:
            return jsonify({"error": "Not found"}), 404

        data = request.json or {}
        validate_coach_slot({**row_to_dict(row), **data})
        for key, value in data.items():
            if key == "Date":
                value = parse_date(value)
            if hasattr(row, key):
                setattr(row, key, value)

        db.session.commit()
        return jsonify({"message": "CoachSlot updated"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 400

@api_v1.route("/coach_slots/<int:id>", methods=["DELETE"])
def delete_coach_slot(id):
    try:
        row = CoachSlots.query.get(id)
        if not row:
            return jsonify({"error": "Not found"}), 404

        db.session.delete(row)
        db.session.commit()
        return jsonify({"message": "CoachSlot deleted"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 400