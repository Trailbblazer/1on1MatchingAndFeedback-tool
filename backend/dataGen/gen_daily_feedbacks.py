# gen_daily_feedbacks.py

import json


# Load assigned_startups JSON from file
try:
    with open('data/assigned_startups.json', 'r') as f:
        assigned_startups = json.load(f)
except (json.decoder.JSONDecodeError, FileNotFoundError, Exception) as e:
    print(f"Error loading assigned_startups.json: {e}")
    assigned_startups = {}

feedbacks = {}

# Generate feedbacks JSON based on assigned_startups
for coach_name, coach_data in assigned_startups.items():
    coach_id = coach_data.get("Coach_id")
    assignments = coach_data.get("Assignments", [])

    # Ensure coach is in the feedbacks dictionary
    feedbacks.setdefault(coach_name, {
        "Coach_id": coach_id,
        "Feedback_per_startup": []
    })

    # Track existing startups for the coach
    existing_startups = {entry["Startup_id"] for entry in feedbacks[coach_name]["Feedback_per_startup"]}

    # Add or update feedbacks for each startup assigned to the coach
    for assignment in assignments:
        startup_id = assignment.get("Startup_id")
        startup_name = assignment.get("Startup_name")

        # Skip empty assignments
        if startup_name in ["Empty", "Break"] or startup_id in existing_startups:
            continue

        # Add a new feedback entry
        feedbacks[coach_name]["Feedback_per_startup"].append({
            "Startup_id": startup_id,
            "Startup_name": startup_name,
            "Startup_grade": None,
            "Coach_grade": None,
            "Startup_text_feedback": "",
            "Coach_text_feedback": ""
        })
        existing_startups.add(startup_id)

# Save the updated feedbacks JSON to a file
try:
    with open('data/daily_feedbacks.json', 'w') as f:
        json.dump(feedbacks, f, indent=4)
    print("Feedbacks JSON has been updated.")
except Exception as e:
    print(f"Error saving {'daily_feedbacks.json'}: {e}")

