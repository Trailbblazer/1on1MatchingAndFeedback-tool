from flask import Flask, request, jsonify
from flask_cors import CORS  # Import CORS
import logging
from backend.database.base import db
from backend.database import BannedToMeet, CoachAssignments, Coaches, CoachSlots, DailyFeedback, FeedbackHistory, Startups

# Initialize Flask app
app = Flask(__name__)

# Configuration
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///sauna.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True  # Enable SQL logging

# Initialize extensions mysql -u root
db.init_app(app)

# Enable CORS for all origins (allowing frontend to make requests from any domain)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

# Setup logging
logging.basicConfig(level=logging.INFO)
logging.getLogger('sqlalchemy.engine').setLevel(logging.INFO)

# Log request headers
@app.before_request
def log_request_info():
    logging.info(f"Request Headers: {request.headers}")


# Routes
@app.route("/")
def home():
    return {"message": "API is running"}

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
        startups = Startups.query.all()  # Fetch all startups from the database
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
        return jsonify(startups_list), 200  # Return all startups in a JSON response
    except Exception as e:
        logging.error(f"Error fetching startups: {e}")
        return jsonify({"error": str(e)}), 400

# Initialize database
with app.app_context():
    try:
        db.create_all()  # Create tables if they don't exist
        logging.info("Tables created successfully.")
    except Exception as e:
        logging.error(f"Error creating tables: {e}")

# Run the app
if __name__ == "__main__":
    app.run(debug=True)
