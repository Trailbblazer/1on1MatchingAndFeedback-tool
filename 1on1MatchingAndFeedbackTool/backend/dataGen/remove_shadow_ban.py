import json

# The list of Startup_ids to process. Pass Startup_id to remove ban from
remove_from_ban = [9, 4, 2, 0, 3, 8, 5]  # 6, 7 left banned

# File paths
startups_file = "data/startups.json"
input_file = "data/total_feedbacks.json"
output_file = "data/total_feedbacks.json"

# Load JSON files
try:
    with open(startups_file, "r") as file:
        startups_data = json.load(file)
except (FileNotFoundError, json.JSONDecodeError) as e:
    print(f"Error loading startups.json file: {e}")
    startups_data = {}

try:
    with open(input_file, "r") as file:
        feedbacks_data = json.load(file)
except (FileNotFoundError, json.JSONDecodeError) as e:
    print(f"Error loading total_feedbacks.json file: {e}")
    feedbacks_data = {}

# Check and update the JSON data
for startup_id in remove_from_ban:
    startup_key = f"Startup {startup_id}"
    startup_in_startups = startup_key in startups_data
    startup_in_feedbacks = any(
        feedback["Startup_id"] == startup_id
        for coach in feedbacks_data.values()
        if "Feedback_per_startup" in coach
        for feedback in coach["Feedback_per_startup"]
    )

    if not startup_in_startups and not startup_in_feedbacks:
        print(f"Startup {startup_id} not found in startups.json and total_feedbacks.json.")
        continue
    elif not startup_in_startups:
        print(f"Startup {startup_id} not found in startups.json.")
        continue
    elif not startup_in_feedbacks:
        print(f"Startup {startup_id} not found in total_feedbacks.json.")
        continue

    # Update feedbacks if checks pass
    for coach_name, coach_data in feedbacks_data.items():
        if isinstance(coach_data, dict) and "Feedback_per_startup" in coach_data:
            for feedback in coach_data["Feedback_per_startup"]:
                if feedback["Startup_id"] == startup_id and feedback["Startup_grade"] is None:
                    feedback["Startup_grade"] = 0

# Save the updated JSON data back to the file
try:
    with open(output_file, "w") as file:
        json.dump(feedbacks_data, file, indent=4)
    print(f"Updated JSON has been written to {output_file}")
except Exception as e:
    print(f"Error writing JSON file: {e}")
