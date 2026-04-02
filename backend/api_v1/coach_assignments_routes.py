from flask import request, jsonify
from datetime import datetime
from backend.database.base import db
from backend.database import CoachAssignments
from backend.validation.coach_assignment_validation import validate_coach_assignment
from backend.date_utils import parse_date, parse_db_date
from .routes import api_v1, row_to_dict

@api_v1.route("/coach_assignments/all", methods=["GET"]) # Returns everything
def get_all_coach_assignments():
    try:
        rows = CoachAssignments.query.all()
        return jsonify([row_to_dict(r) for r in rows]), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@api_v1.route("/coach_assignments", methods=["GET"]) # Returns filtered results (past/future ones)
def get_coach_assignments():
    try:
        coach_id = request.args.get("coachId", type=int)
        include_future = request.args.get("includeFuture", "false").lower() == "true"
        include_past = request.args.get("includePast", "false").lower() == "true"

        if not coach_id:
            return jsonify({"error": "coachId is required"}), 400

        all_assignments = CoachAssignments.query.filter_by(CoachId=coach_id).all()
        today = datetime.utcnow().date()

        if include_future:
            assignments = [
                a for a in all_assignments
                if parse_db_date(a.Date) and parse_db_date(a.Date) > today
            ]
        elif include_past:
            assignments = [
                a for a in all_assignments
                if parse_db_date(a.Date) and parse_db_date(a.Date) <= today
            ]
        else:
            assignments = all_assignments

        return jsonify([row_to_dict(a) for a in assignments]), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 400

@api_v1.route("/coach_assignments/<int:id>", methods=["GET"]) # Returns one row
def get_coach_assignment_by_id(id):
    try:
        row = CoachAssignments.query.get(id)
        if not row:
            return jsonify({"error": "Not found"}), 404
        return jsonify(row_to_dict(row)), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@api_v1.route("/coach_assignments", methods=["POST"])
def add_coach_assignment():
    data = request.json or {}
    validate_coach_assignment(data)
    try:
        new_row = CoachAssignments(
            StartupName=data.get("StartupName"),
            Slot=data.get("Slot"),
            Duration=data.get("Duration"),
            Date=parse_date(data.get("Date")),
            CoachId=data.get("CoachId"),
            StartupId=data.get("StartupId"),
            SlotId=data.get("SlotId"),
        )
        db.session.add(new_row)
        db.session.commit()
        return jsonify({"message": "CoachAssignment created", "id": new_row.AssignmentId}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 400

@api_v1.route("/coach_assignments/<int:id>", methods=["PATCH"])
def update_coach_assignment(id):
    try:
        row = CoachAssignments.query.get(id)
        if not row:
            return jsonify({"error": "Not found"}), 404

        data = request.json or {}

        existing = row_to_dict(row)
        merged = {**existing, **data}
        validate_coach_assignment(merged)

        for key, value in data.items():
            if key == "Date":
                value = parse_date(value)
            if hasattr(row, key):
                setattr(row, key, value)

        db.session.commit()
        return jsonify({"message": "CoachAssignment updated"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 400

@api_v1.route("/coach_assignments/<int:id>", methods=["DELETE"])
def delete_coach_assignment(id):
    try:
        row = CoachAssignments.query.get(id)
        if not row:
            return jsonify({"error": "Not found"}), 404

        db.session.delete(row)
        db.session.commit()
        return jsonify({"message": "CoachAssignment deleted"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 400