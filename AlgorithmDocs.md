# Project Documentation

## Table of Contents

- [Overview](#overview)
- [Workflow Summary](#workflow-summary)
- [Detailed Documentation](#detailed-documentation)
    - [1. `genCoachTime.py`](#1-gencoachtimepy)
    - [2. `genStartups.py`](#2-genstartupspy)
    - [3. `algo.py`](#3-algopy)
    - [4. `gen_daily_feedbacks.py`](#4-gen_daily_feedbackspy)
    - [5. `filling_feedbacks.py`](#5-filling_feedbackspy)
    - [6. `remove_shadow_ban.py`](#6-remove_shadow_banpy)
    - [7. `user_match_restrictor.py`](#7-user_match_restrictorpy)
- [Project Logic and Data Flow](#project-logic-and-data-flow)
- [Conclusion](#conclusion)
- [License](#License)
- [Authors](#Authors)

## Overview

This project is designed (to simulate) and manage a matching process between coaches and startups. The primary goal is to assign startups to coaches based on availability, feedback, and specific constraints. The system ensures that:

- **Startups do not meet the same coach more than once per round (day).**
- **Coaches' preferences and feedback influence future matching.**
- **Startups that fail to provide feedback are temporarily shadow-banned and receive less coach meetings until admin removes them from it.**

The project comprises several Python scripts and JSON data files that work together to:

1. Generate sample data for coaches' availability and startups. (Sample data is generated for the development and testing purposes. When project is ready, coaches will send their availability, and startups will be added by the admin.)
2. Implement the main matching algorithm.
3. Generate and simulate the filling of daily feedback forms.
4. Manage shadow bans for startups.
5. Provide administrative tools for managing startups' status.


---

## Workflow Summary

All files except `algo.py` are in `backend/dataGen` folder

1. **Data Generation**:
    - `genCoachTime.py`* creates sample coach availability schedules.
    - `genStartups.py`* generates sample startup data.

2. **Matching Algorithm**:
    - `algo.py` reads in the generated data and assigns startups to coaches, considering various constraints and feedback.

3. **Feedback Collection**:
    - `gen_daily_feedbacks.py` generates empty feedback templates based on the day's assignments.
    - `filling_feedbacks.py`* simulates the process of coaches and startups providing feedback.

4. **Shadow Banning Mechanism**:
    - Startups that fail to provide feedback are placed in a shadow ban state, affecting their participation in future matching.

5. **Administrative Tools**:
    - `remove_shadow_ban.py` allows administrators to remove startups from the shadow ban list when appropriate.
    - `user_match_restrictor.py` allows administrators to forbid meeting for the selected startup and coach.

 \* - File used for development and testing only.

---

## Detailed Documentation

### 1. `genCoachTime.py`

**Purpose**: Generates sample availability time slots for each coach, including whether they require a break during their schedule. This file is used for development and testing purposes.

**Functionality**:

- **Constants Definition**:
    - `START_HOUR_MIN` and `START_HOUR_MAX`: Define the earliest and latest possible start times.
    - `START_MINUTES`: Possible minutes for start times (on-the-hour or half-past).
    - `MIN_SLOTS` and `MAX_SLOTS`: Minimum and maximum number of slots a coach can have.
    - `NUM_COACHES`: Total number of coaches to generate schedules for.
    - `END_TIME`: Define the latest possible end times.

- **Timeslot Generation**:
    - Randomly determines each coach's start time and whether they need a break.
    - Utilizes `generate_timeslots` to create time slots for each coach, considering breaks and ensuring they don't exceed the end time.

- **Break Implementation**:
    - If a coach needs a break and has >= 4 slots, a break is inserted randomly into one of middle slots within their schedule.
  This was the requirement not to place the break slot in the same position all the time.
    - If a coach needs a break and has < 4 slots, break is not inserted.

- **Output**:
    - Writes the generated coach schedules to `data/coachTimeWithBreaks.json`.

**Key Components**:

- **`generate_timeslots` Function**:
    - Inputs: Start time, end time, slot duration, minimum and maximum slots, and break requirement.
    - Outputs: A list of time slots with potential breaks included.

**Sample Output (`coachTimeWithBreaks.json`)**:

```json
{
    "Coach 0": {
        "Coach_id": 0,
        "Needs_break": true,
        "Availability": [
            {
                "Slot": "16:00 - 16:30",
                "Duration": "30 minutes"
            },
            {
                "Slot": "16:30 - 17:00",
                "Duration": "30 minutes"
            }
        ]
    }
    
}
```

---

### 2. `genStartups.py`

**Purpose**: Generates sample startup data, including unique IDs and initial meeting counts. This file is used for development and testing purposes. In production startups will be added by the admin.


**Functionality**:

- **Startup Generation**:
    - Creates a specified number of startups (e.g., 6).
    - Assigns each startup a unique ID and initializes their `meetings_count` to zero.

- **Output**:
    - Writes the startup data to `data/startups.json`.

**Sample Output (`startups.json`)**:

```json
{
    "Startup 0": {
        "startup_id": 0,
        "meetings_count": 0
    },
    "Startup 1": {
        "startup_id": 1,
        "meetings_count": 0
    }
}
```

---

### 3. `algo.py`

**Purpose**: Implements the main matching algorithm to assign startups to coaches based on availability, feedback, and specific constraints.

**Functionality**:

- **Data Loading**:
    - Reads coaches' availability from `coachTimeWithBreaks.json`.
    - Reads startup data from `startups.json`.
    - Reads feedback from `total_feedbacks.json` if it exists.

- **Assignment Logic** (`assign_startups_to_coaches` function):
    - **Startup Categorization and Priority**:
      1. **Startups with zero meetings**: Prioritized to ensure they get maximum of possible meetings available.
      2. **Startups with feedback**: Sorted based on previous feedback to optimize match quality.
      3. **Shadow-banned startups**: Startups that failed to provide feedback; assigned last.

    - **Feedback Sorting**:
        - Startups are sorted based on a multi-level priority considering both startup and coach grades.

    - **Constraints Enforcement**:
        - A coach cannot be assigned the same startup more than once.
        - Coaches' negative feedback (`Coach_grade` of -1) for the startup in `data/total_feedbacks.json` from the previous meeting excludes this startup from meeting this coach ever again.
        - Time slot conflicts are avoided.

    - **Assignment Process**:
        - Iterates over each coach and their available slots.
        - Assigns startups to slots based on the above priorities and constraints.
        - If no suitable startup is found for a slot, it is marked as `"Empty"` or left as a `"Break"`.<br>

    <a id="matching-priority"></a>
    - **Matching Priority**:

      Based on the grading in `data/total_feedbacks.json`
      1. `"Startup_grade": 1, "Coach_grade": 1`
      2. `"Startup_grade": 0, "Coach_grade": 1`
      3. `"Startup_grade": 1, "Coach_grade": 0`
      4. `"Startup_grade": 1, "Coach_grade": null`
      5. `"Startup_grade": 0, "Coach_grade": 0`
      6. `"Startup_grade": 0, "Coach_grade": null`
      7. `"Startup_grade": -1, "Coach_grade": 1`
      8. `"Startup_grade": -1, "Coach_grade": 0`
      9. `"Startup_grade": -1, "Coach_grade": null`
      10. `"Coach_grade": -1` (should not match at all)


- **Data Updating**:
    - Increments the `meetings_count` for each assigned startup.
    - Writes the assignment results to `data/assigned_startups.json`. Existing data from the previous day in `assigned_startups.json` is erased before filling JSON with new results.
    - Updates `data/startups.json` with new meeting counts.

**Sample Output (`assigned_startups.json`)**:

```json
{
    "Coach 0": {
        "Coach_id": 0,
        "Assignments": [
            {
                "Startup_id": 1,
                "Startup_name": "Startup 1",
                "Slot": "15:00 - 15:30",
                "Duration": "30 minutes"
            }
        ]
    }
}
```

- **Testing the Algorithm**:
    - Two test datasets are provided in `1on1MatchingAndFeedbackTool/backend/testDatasets/testSet1` and `1on1MatchingAndFeedbackTool/backend/testDatasets/testSet2`.
    - To verify the algorithm:
      1. Copy values from `test_coachTimeWithBreaks.json` into `coachTimeWithBreaks.json`, `test_startups.json` into `startups.json`, and `test_total_feedbacks.json` into `total_feedbacks.json`.
      2. Run `algo.py`.
      3.  Ensure that:
           - The output matches `algo_output.md`.
           - Values in `assigned_startups.json` match `expected_assigned_startups.json`.
           - `startups.json` meeting counts match `expected_startups.json`.

---

### 4. `gen_daily_feedbacks.py`

**Purpose**: Generates daily feedback templates for each coach-startup meeting. These templates are to be filled by coaches and startups after their meetings.

**Functionality**:

- **Data Loading**:
    - Reads the latest assignments from `assigned_startups.json`.

- **Feedback Template Creation**:
    - For each coach and their assignments, creates feedback entries for each startup.
    - Initializes feedback fields with `null` for grade feedback and empty strings for text feedback.

- **Output**:
    - Writes the feedback templates to `data/daily_feedbacks.json`.

**Sample Output (`daily_feedbacks.json`)**:

```json
{
    "Coach 0": {
        "Coach_id": 0,
        "Feedback_per_startup": [
            {
                "Startup_id": 1,
                "Startup_name": "Startup 1",
                "Startup_grade": null,
                "Coach_grade": null,
                "Startup_text_feedback": "",
                "Coach_text_feedback": ""
            }
        ]
    }
}
```

---

### 5. `filling_feedbacks.py`

**Purpose**: Simulates the filling of feedback forms by coaches and startups, updating the total feedback records.
This file is used for development and testing purposes. In production startups and coaches will fill the feedback form.


**Functionality**:

- **Data Loading**:
    - Reads daily feedback templates from `daily_feedbacks.json`.
    - Loads existing total feedback from `total_feedbacks.json`, if available.

- **Feedback Simulation**:
    - Randomly decides whether to fill in numeric feedback (`-1`, `0`, `1`, or `null`).
    - Numeric feedback explanation:
      - -1 - didn't like the meeting. Don't want to meet again.<br> (If `"Coach_grade": -1` for the startup - they will never match again. If `"Startup_grade": -1` but not coach - it just provides the lowest priority in matching. See [Matching Priority](#matching-priority))
      -  0 - neutral. Maybe would like to meet again
      -  1 - liked the meeting. Would like to meet again
      -  `null` - didn't leave the feedback
    - Randomly decides whether to provide text feedback. Text feedback is optional. For admin only. Does not affect the matching algorithm.

- **Shadow Ban Mechanism**:
    - If a startup fails to provide feedback (`Startup_grade` is `null`), they are flagged for shadow-banning in the next matching round.
    - Coaches are not shadow-banned for not leaving feedback. Only startups are.
- **Data Updating**:
    - Merges daily feedback into `total_feedbacks.json`.
    - !!! Ensures that feedback for each startup-coach pair is **updated** (if particular coach already met this particular startup) or **added** if they haven't met before and there is no record in `total_feedbacks.json`
    - `total_feedbacks.json` keeps only the last feedback from coach-startup meeting. Even if coach met the startup several times.
- **Output**:
    - Writes the updated total feedback to `data/total_feedbacks.json`.

**Sample Output (`total_feedbacks.json`)**:

```json
{
    "Coach 0": {
        "Coach_id": 0,
        "Feedback_per_startup": [
            {
                "Startup_id": 1,
                "Startup_name": "Startup 1",
                "Startup_grade": 0,
                "Coach_grade": 1,
                "Startup_text_feedback": "Lorem ipsum.",
                "Coach_text_feedback": ""
            }
        ]
    }
}
```

---

### 6. `remove_shadow_ban.py`

**Purpose**: Allows administrators to remove startups from the shadow ban list by specifying their `startup_id`.

**Functionality**:

- **Startup Identification**:
    - Accepts a `startup_id` as input into the array. Multiple startups can be removed from the ban simultaneously.

- **Shadow Ban Removal**:
    -  Updates the `total_feedbacks.json` by iterating through each coach's `"Feedback_per_startup"` searching for `startup_id` that has `"Startup_grade": null`. `null` values for this startup are changed to 0 in all occasions, lifting the ban. Other numeric feedbacks from the same startup are left unchanged.

**Sample code (`total_feedbacks.json`)**:

Before
```json
{
    "Coach 0": {
        "Coach_id": 3,
        "Feedback_per_startup": [
            {
                "Startup_id": 5,
                "Startup_name": "Startup 5",
                "Startup_grade": null,
                "Coach_grade": 1,
                "Startup_text_feedback": "Lorem ipsum.",
                "Coach_text_feedback": ""
            }
        ]
    }
}
```
After
```json
{
    "Coach 0": {
        "Coach_id": 3,
        "Feedback_per_startup": [
            {
                "Startup_id": 5,
                "Startup_name": "Startup 5",
                "Startup_grade": 0,
                "Coach_grade": 1,
                "Startup_text_feedback": "Lorem ipsum.",
                "Coach_text_feedback": ""
            }
        ]
    }
}
```

---

### 7. `user_match_restrictor.py`

**Purpose**: Allows administrators to forbid meeting for the selected startup and coach by specifying their `startup_id` and `coach_id`.

**Functionality**:

- **Startup and Coach Identification**:
    - Accepts a `startup_id` and `coach_id` as 2 arguments to `restrict_meeting` function.

- **Restricting meetings**:
    -  Updates the `total_feedbacks.json` by finding the coach by `coach_id` and adding selected `startup_id` into coach's `"Feedback_per_startup"` with values
  `-1` for both `Startup_grade` and `Coach_grade` and text feedback `"Restricted meeting by admin"` for both `Startup_text_feedback` and `Coach_text_feedback`.
    - Following the logic in `algo.py` where coaches' negative feedback (Coach_grade of -1) for the startup excludes this startup from meeting this coach ever again, we manually implement this logic from the admin's side.
    - Work in both cases:
      - If startup already had a meeting with the coach that admin wants to restrict, feedback in `total_feedbacks.json` will be updated. 
      - If startup haven't met the coach yet, and admin want to prevent them ever meeting - feedback in `total_feedbacks.json` will be created as shown below.

**Sample code (`total_feedbacks.json`)**:

def restrict_meeting(0, 1) # (coach_id, startup_id)<br> 

Before
```json
{
  "Coach 0": {
    "Coach_id": 0,
    "Feedback_per_startup": []
  }
}
```

After
```json
{
  "Coach 0": {
    "Coach_id": 0,
    "Feedback_per_startup": [
      {
        "Startup_id": 1,
        "Startup_name": "Startup 1",
        "Startup_grade": -1,
        "Coach_grade": -1,
        "Startup_text_feedback": "Restricted meeting by admin",
        "Coach_text_feedback": "Restricted meeting by admin"
      }
    ]
  }
}

```

---

## Project Logic and Data Flow

1. **Initial Data Generation**:
    - Coaches' availability and startups are generated for testing purposes.
    - In production, this data would be collected from real users.

2. **Matching Process**:
    - The algorithm assigns startups to coaches, considering availability and past interactions (if present).
    - Constraints ensure fairness and diversity in matching.

3. **Feedback Loop**:
    - After meetings, both coaches and startups provide feedback.
    - Feedback affects future matching:
        - Negative feedback from coaches prevents future pairings with startups that received this feedback.
        - Lack of feedback from startups results in shadow banning for the coaches that startups didn't give feedback to.

4. **Shadow Ban Mechanism**:
    - Startups that do not provide feedback are temporarily shadow-banned.
    - Shadow-banned startups have the lowest priority in matching and get less or no meetings if no spots available. 


5. **Administrative Controls**:
   - Admins can remove startups from the shadow ban list using `remove_shadow_ban.py`.
   - This allows for flexibility and human oversight in the matchmaking process.
   - Admins can restrict startups from matching the selected coaches using `user_match_restrictor.py`.

---

## Conclusion

This project provides a comprehensive simulation of a matchmaking system between coaches and startups, incorporating:

- Availability scheduling.
- Matching algorithms with multiple constraints.
- Feedback mechanisms that influence future interactions.
- Administrative tools for managing exceptions and special cases.

The use of JSON files for data storage allows for easy inspection and modification of data, facilitating testing and debugging.

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## Authors

This version of the project was done by:

- [Andrii Deshko](https://github.com/LVNDLORD)
- [Artur Golavskiy](https://github.com/arturgola)

