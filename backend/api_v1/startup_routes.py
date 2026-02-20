from flask import request, jsonify
from backend.database.base import db
from backend.database import Startups
from backend.validation.startup_validation import validate_startup
from backend.api_v1.routes import api_v1, row_to_dict
import logging

@api_v1.route("/startups", methods=["GET"])
def get_startups():
    try:
        startups = Startups.query.all()
        return jsonify([row_to_dict(s) for s in startups]), 200
    except Exception as e:
        logging.error(f"Error fetching startups: {e}")
        return jsonify({"error": str(e)}), 400

@api_v1.route("/startups/<int:id>", methods=["GET"])
def get_startup_by_id(id):
    try:
        startup = Startups.query.get(id)
        if not startup:
            return jsonify({"error": "Startup not found"}), 404
        return jsonify(row_to_dict(startup)), 200
    except Exception as e:
        logging.error(f"Error fetching startup: {e}")
        return jsonify({"error": str(e)}), 400

@api_v1.route("/startups", methods=["POST"])
def add_startup():
    try:
        data = request.json or {}
        validate_startup(data)

        new_startup = Startups(
            StartupName=data.get("StartupName"),
            Website=data.get("Website"),
            Status=data.get("Status"),
            PreviousNames=data.get("PreviousNames"),
            StartupMembers=data.get("StartupMembers"),
            StartupSocialMedia=data.get("StartupSocialMedia"),
            StartupDescription=data.get("StartupDescription"),
            MeetingsCount=data.get("MeetingsCount", 0),
        )
        db.session.add(new_startup)
        db.session.commit()
        return jsonify({
            "message": "Startup added successfully",
            "startup": row_to_dict(new_startup)
        }), 201

    except Exception as e:
        db.session.rollback()
        logging.error(f"Error adding startup: {e}")
        return jsonify({"error": str(e)}), 400

@api_v1.route("/startups/<int:id>", methods=["PATCH"])
def patch_startup(id):
    try:
        startup = Startups.query.get(id)
        if not startup:
            return jsonify({"error": "Startup not found"}), 404

        data = request.json or {}

        existing = row_to_dict(startup)
        merged = {**existing, **data}
        validate_startup(merged)

        for key, value in data.items():
            if hasattr(startup, key):
                setattr(startup, key, value)

        db.session.commit()
        return jsonify({"message": "Startup updated"}), 200

    except Exception as e:
        db.session.rollback()
        logging.error(f"Error updating startup: {e}")
        return jsonify({"error": str(e)}), 400

@api_v1.route("/startups/<int:id>", methods=["DELETE"])
def delete_startup(id):
    try:
        startup = Startups.query.get(id)
        if not startup:
            return jsonify({"error": "Startup not found"}), 404

        db.session.delete(startup)
        db.session.commit()
        return jsonify({"message": "Startup deleted"}), 200
    except Exception as e:
        db.session.rollback()
        logging.error(f"Error deleting startup: {e}")
        return jsonify({"error": str(e)}), 400