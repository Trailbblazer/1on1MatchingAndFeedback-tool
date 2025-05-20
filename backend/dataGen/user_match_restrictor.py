import json
import random

import json

# Load JSON files
with open('data/startups.json', 'r') as f:
    startups_data = json.load(f)

with open('data/coaches.json', 'r') as f:
    coaches_data = json.load(f)

with open('data/total_feedbacks.json', 'r') as f:
    feedbacks_data = json.load(f)

def restrict_meeting(coach_id, startup_id):
    # Check if the coach exists
    coach_key = f"Coach {coach_id}"
    if coach_key not in feedbacks_data:
        print(f"Coach {coach_id} not found.")
        return

    # Check if the startup exists in startups.json
    startup_key = f"Startup {startup_id}"
    if startup_key not in startups_data:
        print(f"Startup {startup_id} not found.")
        return

    # Access the Feedback_per_startup for the given coach
    feedback_per_startup = feedbacks_data[coach_key]["Feedback_per_startup"]

    # Check if the startup is already in the coach's feedback list
    for feedback in feedback_per_startup:
        if feedback["Startup_id"] == startup_id:
            # Update feedback for the existing startup
            feedback["Startup_grade"] = -1
            feedback["Coach_grade"] = -1
            feedback["Startup_text_feedback"] = "Restricted meeting by admin"
            feedback["Coach_text_feedback"] = "Restricted meeting by admin."
            break
    else:
        # Add the startup to the feedback list if not present
        new_feedback = {
            "Startup_id": startup_id,
            "Startup_name": startups_data[startup_key]["startup_id"],
            "Startup_grade": -1,
            "Coach_grade": -1,
            "Startup_text_feedback": "Restricted meeting by admin",
            "Coach_text_feedback": "Restricted meeting by admin."
        }
        feedback_per_startup.append(new_feedback)

    # Save the updated feedbacks data back to the file
    with open('data/total_feedbacks.json', 'w') as f:
        json.dump(feedbacks_data, f, indent=4)

    print(f"Updated feedback for Coach {coach_id} and Startup {startup_id}.")


restrict_meeting(4, 3)