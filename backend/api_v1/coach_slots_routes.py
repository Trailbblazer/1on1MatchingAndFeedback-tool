from flask import request, jsonify
from datetime import datetime
from backend.database.base import db
from backend.database import CoachSlots
from backend.validation.coach_slot_validation import validate_coach_slot
from backend.date_utils import parse_date, parse_db_date
from .routes import api_v1, row_to_dict

@api_v1.route("/coach_slots/all", methods=["GET"]) # Returns everything
def get_all_coach_slots():
    try:
        rows = CoachSlots.query.all()
        return jsonify([row_to_dict(r) for r in rows]), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@api_v1.route("/coach_slots", methods=["GET"]) # Returns filtered results (past/future ones)
def get_coach_slots():
    try:
        coach_id = request.args.get("coachId", type=int)
        include_future = request.args.get("includeFuture", "false").lower() == "true"
        include_past = request.args.get("includePast", "false").lower() == "true"

        if not coach_id:
            return jsonify({"error": "coachId is required"}), 400

        all_slots = CoachSlots.query.filter_by(CoachId=coach_id).all()
        today = datetime.utcnow().date()

        if include_future:
            slots = [
                s for s in all_slots
                if parse_db_date(s.Date) and parse_db_date(s.Date) > today
            ]
        elif include_past:
            slots = [
                s for s in all_slots
                if parse_db_date(s.Date) and parse_db_date(s.Date) <= today
            ]
        else:
            slots = all_slots

        return jsonify([row_to_dict(s) for s in slots]), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 400

@api_v1.route("/coach_slots/<int:id>", methods=["GET"]) # Returns one row
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