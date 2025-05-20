import json
import random

print("Starting the feedback generation process...")

# Load daily_feedbacks JSON from files
try:
    with open('data/daily_feedbacks.json', 'r') as f:
        print("Loading daily_feedbacks.json...")
        daily_feedbacks = json.load(f)
        print("Daily feedbacks loaded successfully.")
except (json.decoder.JSONDecodeError, FileNotFoundError, Exception) as e:
    print(f"Error loading daily_feedbacks.json: {e}")
    daily_feedbacks = {}

# Load total_feedbacks JSON from file if it exists
try:
    with open('data/total_feedbacks.json', 'r') as f:
        print("Loading total_feedbacks.json...")
        total_feedbacks = json.load(f)
        print("Total feedbacks loaded successfully.")
except (json.decoder.JSONDecodeError, FileNotFoundError, Exception) as e:
    print(f"Error loading total_feedbacks.json: {e}")
    total_feedbacks = {}

# Define a function to optionally fill feedback data
def optional_fill_feedback():
    return random.choice([0, 1, -1, None]) # add None, -1 in further testing

def optional_fill_text_feedback():
    return random.choice(["", "Lorem ipsum."])  # Placeholder text or empty

# Update or add daily feedbacks to total_feedbacks
print("Updating total feedbacks with daily feedbacks...")
for coach_name, coach_data in daily_feedbacks.items():
    coach_id = coach_data.get("Coach_id")
    feedback_per_startup = coach_data.get("Feedback_per_startup", [])

    # Ensure coach is in the total_feedbacks dictionary
    if coach_name not in total_feedbacks:
        total_feedbacks[coach_name] = {
            "Coach_id": coach_id,
            "Feedback_per_startup": []
        }

    # Track startups already added for this coach
    existing_startups = {entry["Startup_id"] for entry in total_feedbacks[coach_name]["Feedback_per_startup"]}

    for feedback in feedback_per_startup:
        startup_id = feedback.get("Startup_id")
        startup_name = feedback.get("Startup_name")

        # If startup_name is Empty or Break, skip processing
        if startup_name in ["Empty", "Break"]:
            continue

        # Check if the startup_id exists in total_feedbacks for this coach
        startup_found = False
        for entry in total_feedbacks[coach_name]["Feedback_per_startup"]:
            if entry["Startup_id"] == startup_id:
                # Update existing startup feedback
                entry.update({
                    "Startup_name": startup_name,
                    "Startup_grade": optional_fill_feedback(),
                    "Coach_grade": optional_fill_feedback(),
                    "Startup_text_feedback": optional_fill_text_feedback(),
                    "Coach_text_feedback": optional_fill_text_feedback()
                })
                startup_found = True
                break

        # If startup_id is not found in total_feedbacks, add it
        if not startup_found:
            total_feedbacks[coach_name]["Feedback_per_startup"].append({
                "Startup_id": startup_id,
                "Startup_name": startup_name,
                "Startup_grade": optional_fill_feedback(),
                "Coach_grade": optional_fill_feedback(),
                "Startup_text_feedback": optional_fill_text_feedback(),
                "Coach_text_feedback": optional_fill_text_feedback()
            })
            existing_startups.add(startup_id)

# Save the updated feedbacks JSON to a file
with open('data/total_feedbacks.json', 'w') as f:
    print("Saving updated total feedbacks to total_feedbacks.json...")
    json.dump(total_feedbacks, f, indent=4)

print("Feedback generation process completed.")


