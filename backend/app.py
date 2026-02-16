from flask import Flask, request, jsonify
from flask_cors import CORS
from sqlalchemy import text
import logging
import os

# Initialize Flask app
app = Flask(__name__)

# ----------------------------
# Database Configuration
# ----------------------------
# Create an absolute path to backend/instance/sauna.db to ensure the path is deterministic.
basedir = os.path.abspath(os.path.dirname(__file__))  # backend folder
db_path = os.path.join(basedir, "instance", "sauna.db")
app.config['SQLALCHEMY_DATABASE_URI'] = f"sqlite:///{db_path}"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True  # Show SQL in logs

# Initialize DB
from backend.database.base import db
db.init_app(app)

# Import models so SQLAlchemy metadata includes them
from backend.database import (
    BannedToMeet,
    CoachAssignments,
    Coaches,
    CoachSlots,
    DailyFeedback,
    FeedbackHistory,
    Startups,
)

# Register API blueprint(s)
from backend.api_v1.routes import api_v1
app.register_blueprint(api_v1, url_prefix='/api/v1')

# Enable CORS
# CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})
CORS(app)

# Setup logging
logging.basicConfig(level=logging.INFO)
logging.getLogger('sqlalchemy.engine').setLevel(logging.INFO)

@app.before_request
def log_request_info():
    logging.info(f"Request Headers: {request.headers}")

# ----------------------------
# Routes
# ----------------------------

@app.route("/")  # Health check
def home():
    return {"message": "API is running"}

@app.route("/test-db")  # DB connectivity check
def test_db():
    try:
        db.session.execute(text("SELECT 1"))  # Wrap raw SQL in text()
        return jsonify({"message": "Database connected successfully", "status": "ok"}), 200
    except Exception as e:
        return jsonify({"message": str(e), "status": "error"}), 500

# -------------------- Startups --------------------

@app.route("/startups", methods=["GET"])  # Get all startups
def get_startups():
    try:
        startups = Startups.query.all()
        startups_list = []
        for startup in startups:
            row = {col.name: getattr(startup, col.name) for col in startup.__table__.columns}
            startups_list.append(row)
        return jsonify(startups_list), 200
    except Exception as e:
        logging.error(f"Error fetching startups: {e}")
        return jsonify({"error": str(e)}), 400

@app.route("/startups/<int:id>", methods=["GET"]) # Get one startup
def get_startup_by_id(id):
    try:
        startup = Startups.query.get(id)
        if not startup:
            return jsonify({"error": "Startup not found"}), 404

        row = {col.name: getattr(startup, col.name) for col in startup.__table__.columns}
        return jsonify(row), 200
    except Exception as e:
        logging.error(f"Error fetching startup: {e}")
        return jsonify({"error": str(e)}), 400

@app.route("/startups", methods=["POST"])  # Add startup
def add_startup():
    try:
        data = request.json or {}
        # Required fields
        if not data.get("StartupName"):
            return jsonify({"error": "StartupName is required"}), 400
        if not data.get("Website"):
            return jsonify({"error": "Website is required"}), 400
        if not data.get("Status"):
            return jsonify({"error": "Status is required (alive, on-pause, dead)"}), 400

        members = data.get("StartupMembers", [])
        if not members or not isinstance(members, list):
            return jsonify({"error": "StartupMembers must be a non-empty list"}), 400

        # Ensure each member has name + email and at least one primary
        has_primary = False
        for member in members:
            if not member.get("name") or not member.get("email"):
                return jsonify({"error": "Each member must have name and email"}), 400
            if member.get("level") == "primary":
                has_primary = True
        if not has_primary:
            return jsonify(
                {"error": "At least one member must be marked as primary (level='primary')"}
            ), 400

        new_startup = Startups(
            StartupName=data.get("StartupName"),
            Website=data.get("Website"),
            Status=data.get("Status"),
            PreviousNames=data.get("PreviousNames"),
            StartupMembers=members,
            StartupSocialMedia=data.get("StartupSocialMedia"),
            StartupDescription=data.get("StartupDescription"),
            MeetingsCount=data.get("MeetingsCount", 0),
        )
        db.session.add(new_startup)
        db.session.commit()
        return jsonify({"message": "Startup added successfully", "startup": data}), 201
    except Exception as e:
        db.session.rollback()
        logging.error(f"Error adding startup: {e}")
        return jsonify({"error": str(e)}), 400

@app.route("/startups/<int:id>", methods=["PATCH"]) # Update startup
def patch_startup(id):
    try:
        startup = Startups.query.get(id)
        if not startup:
            return jsonify({"error": "Startup not found"}), 404

        data = request.json or {}
        for key, value in data.items():
            if hasattr(startup, key):
                setattr(startup, key, value)

        db.session.commit()
        return jsonify({"message": "Startup updated"}), 200
    except Exception as e:
        db.session.rollback()
        logging.error(f"Error updating startup: {e}")
        return jsonify({"error": str(e)}), 400

@app.route("/startups/<int:id>", methods=["DELETE"]) # Delete startup
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

# --------------------
# Coaches
# --------------------

@app.route("/coaches", methods=["GET"])  # Get all coaches
def get_coaches():
    try:
        coaches = Coaches.query.all()
        coaches_list = []
        for coach in coaches:
            coaches_list.append({
                "CoachId": getattr(coach, "CoachID", None),
                "CoachName": getattr(coach, "CoachName", None),
                "Email": getattr(coach, "Email", None),
                "Phone": getattr(coach, "Phone", None),
                "Chat": getattr(coach, "Chat", None),
                "Expertise": getattr(coach, "Expertise", None),
                "SocialMedia": getattr(coach, "SocialMedia", None),
                "CoachingSessions": getattr(coach, "CoachingSessions", 0),
                "BatchesCoached": getattr(coach, "BatchesCoached", 0),
            })
        return jsonify(coaches_list), 200
    except Exception as e:
        logging.error(f"Error fetching coaches: {e}")
        return jsonify({"error": str(e)}), 400

@app.route("/coaches/<int:id>", methods=["GET"]) # Add one coach
def get_coach_by_id(id):
    try:
        coach = Coaches.query.get(id)
        if not coach:
            return jsonify({"error": "Coach not found"}), 404

        row = {col.name: getattr(coach, col.name) for col in coach.__table__.columns}
        return jsonify(row), 200
    except Exception as e:
        logging.error(f"Error fetching coach: {e}")
        return jsonify({"error": str(e)}), 400

@app.route("/coaches", methods=["POST"])  # Add coach
def add_coach():
    try:
        data = request.json or {}
        # Basic validation (adjust as needed)
        if not data.get("CoachName"):
            return jsonify({"error": "CoachName is required"}), 400
        if not data.get("Email"):
            return jsonify({"error": "Email is required"}), 400

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
        return jsonify({"message": "Coach added successfully", "coach": data}), 201
    except Exception as e:
        db.session.rollback()
        logging.error(f"Error adding coach: {e}")
        return jsonify({"error": str(e)}), 400

@app.route("/coaches/<int:id>", methods=["PATCH"]) # Update Coach
def patch_coach(id):
    try:
        coach = Coaches.query.get(id)
        if not coach:
            return jsonify({"error": "Coach not found"}), 404

        data = request.json or {}
        for key, value in data.items():
            if hasattr(coach, key):
                setattr(coach, key, value)

        db.session.commit()
        return jsonify({"message": "Coach updated"}), 200
    except Exception as e:
        db.session.rollback()
        logging.error(f"Error updating coach: {e}")
        return jsonify({"error": str(e)}), 400

@app.route("/coaches/<int:id>", methods=["DELETE"]) # Delete coach
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

# ----------------------------
# Initialize DB and Run App
# ----------------------------

# Create tables and run the app (dev only)
if __name__ == "__main__":
    with app.app_context():
        try:
            db.create_all()
            logging.info("✅ Tables created successfully.")
        except Exception as e:
            logging.error(f"❌ Error creating tables: {e}")
    app.run(debug=True)
