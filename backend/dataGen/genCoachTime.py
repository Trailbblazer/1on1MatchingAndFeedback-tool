import random
import json
from datetime import datetime, timedelta



# User-defined constants
START_HOUR_MIN = 8    # Minimum start hour (8:00 AM)
START_HOUR_MAX = 10   # Maximum start hour (4:00 PM)
START_MINUTES = [0, 30]  # Possible start minutes (either on-the-hour or half-past)
MIN_SLOTS = 8           # Minimum number of slots per coach
MAX_SLOTS = 14           # Maximum number of slots per coach
NUM_COACHES = 5
END_TIME = "18:00"

# Helper function to generate timeslots with potential break
def generate_timeslots(start_time, end_time, duration, min_slots, max_slots, needs_break=False):
    slots = []
    num_slots = random.randint(min_slots, max_slots)

    # Ensure that total duration does not exceed end_time
    while True:
        total_duration = num_slots * duration
        if start_time + total_duration > end_time:
            num_slots -= 1
            if num_slots < min_slots:
                return []  # Not enough time for the minimum slots
        else:
            break

    # Determine the break position if needed
    if needs_break and num_slots >= 4:
        if num_slots % 2 == 1:
            # For odd number of slots, break is at the exact middle
            break_pos = num_slots // 2
        else:
            # For even number of slots, break is randomly at one of the two middle slots
            middle_positions = [num_slots // 2 - 1, num_slots // 2]
            break_pos = random.choice(middle_positions)
    else:
        break_pos = None

    current_time = start_time

    for i in range(num_slots):
        if i == break_pos:
            slots.append({"Slot": "Break", "Duration": "Break"})
            current_time += duration  # Break takes up time
        else:
            end_slot_time = current_time + duration
            if end_slot_time > end_time:
                break
            slots.append({
                "Slot": f"{current_time.strftime('%H:%M')} - {end_slot_time.strftime('%H:%M')}",
                "Duration": f"{duration.seconds // 60} minutes"
            })
            current_time = end_slot_time

    return slots

# Define the overall end time and duration of each slot
overall_end_time = datetime.strptime(END_TIME, "%H:%M")
slot_duration = timedelta(minutes=30)

# Generate coaches with varying start times and random Needs_break
coaches = {}
for i in range(NUM_COACHES):
    coach_name = f"Coach {i}"

    # Random start time between START_HOUR_MIN and START_HOUR_MAX for each coach
    random_start_hour = random.randint(START_HOUR_MIN, START_HOUR_MAX)
    random_start_minute = random.choice(START_MINUTES)  # Choose either on-the-hour or half-past start
    start_time = datetime.strptime(f"{random_start_hour}:{random_start_minute:02d}", "%H:%M")

    # Randomly decide if the coach needs a break
    needs_break = random.choice([True, False])

    availability = generate_timeslots(
        start_time, overall_end_time, slot_duration,
        min_slots=MIN_SLOTS, max_slots=MAX_SLOTS, needs_break=needs_break
    )

    coaches[coach_name] = {
        "Coach_id": i,
        "Needs_break": needs_break,
        "Availability": availability,
    }

# Write the output to a JSON file
output_file = "data/coachTimeWithBreaks.json"
with open(output_file, "w") as file:
    json.dump(coaches, file, indent=4)

print(f"Coach data has been successfully written to {output_file}.")
