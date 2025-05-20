import json

# Load the assigned_startups data from the JSON file
try:
    with open('data/assigned_startups.json', 'r') as file:
        assigned_startups = json.load(file)
except FileNotFoundError:
    print("Error: The file 'assigned_startups.json' does not exist.")
    assigned_startups = {}
except json.JSONDecodeError:
    print("Error: The file 'assigned_startups.json' is not a valid JSON.")
    assigned_startups = {}

# Count the number of meetings for each startup
def count_startup_meetings(assigned_startups):
    startup_meetings = {}

    for coach_data in assigned_startups.values():
        assignments = coach_data.get("Assignments", [])
        for meeting in assignments:
            startup_name = meeting.get("Startup_name")
            if startup_name not in ["Empty", "Break"]:  # Exclude "Empty" and "Break"
                if startup_name not in startup_meetings:
                    startup_meetings[startup_name] = 0
                startup_meetings[startup_name] += 1

    return startup_meetings

# Count meetings for startups
startup_meeting_counts = count_startup_meetings(assigned_startups)

# Print the meeting counts
print("Startup Meeting Counts:")
for startup, count in startup_meeting_counts.items():
    print(f"{startup}: {count}")
