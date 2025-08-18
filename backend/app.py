from flask import Flask, request, jsonify
from flask_cors import CORS
import logging
from sqlalchemy import text

# Import database and models
from backend.database.base import db
from backend.database import (
    BannedToMeet,
    CoachAssignments,
    Coaches,
    CoachSlots,
    DailyFeedback,
    FeedbackHistory,
    Startups,
)

# Initialize Flask app
app = Flask(__name__)

# Configuration
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///sauna.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True  # Show SQL in logs

# Initialize DB
db.init_app(app)

# Enable CORS
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

# Setup logging
logging.basicConfig(level=logging.INFO)
logging.getLogger('sqlalchemy.engine').setLevel(logging.INFO)

@app.before_request
def log_request_info():
    logging.info(f"Request Headers: {request.headers}")

# ----------------------------
# Routes
# ----------------------------

@app.route("/")
def home():
    return {"message": "API is running"}

@app.route("/test-db")
def test_db():
    try:
        db.session.execute(text("SELECT 1"))  # Wrap raw SQL in text()
        return jsonify({"message": "Database connected successfully", "status": "ok"}), 200
    except Exception as e:
        return jsonify({"message": str(e), "status": "error"}), 500

@app.route("/startups", methods=["POST"])
def add_startup():
    try:
        data = request.json
        new_startup = Startups(**data)
        db.session.add(new_startup)
        db.session.commit()
        return jsonify({"message": "Startup added successfully", "startup": data}), 201
    except Exception as e:
        db.session.rollback()
        logging.error(f"Error adding startup: {e}")
        return jsonify({"error": str(e)}), 400

@app.route("/startups", methods=["GET"])
def get_startups():
    try:
        startups = Startups.query.all()
        startups_list = [
            {
                "StartupId": startup.StartupId,
                "StartupName": startup.StartupName,
                "StartupMembers": startup.StartupMembers,
                "PrimaryContact": startup.PrimaryContact,
                "SecondaryContact": startup.SecondaryContact,
                "StartupDescription": startup.StartupDescription,
                "StartupWebsite": startup.StartupWebsite,
                "StartupSocialMedia1": startup.StartupSocialMedia1,
                "StartupSocialMedia2": startup.StartupSocialMedia2,
                "MeetingsCount": startup.MeetingsCount,
            }
            for startup in startups
        ]
        return jsonify(startups_list), 200
    except Exception as e:
        logging.error(f"Error fetching startups: {e}")
        return jsonify({"error": str(e)}), 400
    
@app.route("/coaches", methods=["POST"])
def add_coach():
    try:
        data = request.json
        new_coach = Coaches(
            CoachName=data.get("CoachName"),
            CoachEmail=data.get("LinkedInAccount"),  # storing LinkedInAccount as email for now
            Speciality=data.get("Expertise"),
            Bio=data.get("Bio"),   
            ExperienceYears=data.get("ExperienceYears")
            # Optionally add ExperienceYears, Bio if your DB model supports it
        )
        db.session.add(new_coach)
        db.session.commit()
        return jsonify({"message": "Coach added successfully", "coach": data}), 201
    except Exception as e:
        db.session.rollback()
        logging.error(f"Error adding coach: {e}")
        return jsonify({"error": str(e)}), 400

@app.route("/coaches", methods=["GET"])
def get_coaches():
    try:
        coaches = Coaches.query.all()
        coaches_list = [
            {
                "CoachName": coach.CoachName,
                "LinkedInAccount": coach.LinkedInAccount,
                "Expertise": coach.Expertise,
                
            }
            for coach in coaches
        ]
        return jsonify(coaches_list), 200
    except Exception as e:
        logging.error(f"Error fetching coaches: {e}")
        return jsonify({"error": str(e)}), 400

# ----------------------------
# Initialize DB and Run App
# ----------------------------

if __name__ == "__main__":
    with app.app_context():
        try:
            db.create_all()
            logging.info("✅ Tables created successfully.")
        except Exception as e:
            logging.error(f"❌ Error creating tables: {e}")
    app.run(debug=True)
