# Backend Documentation

## Table of Contents

1. [Overview](#overview)
2. [Folder Structure](#folder-structure)
3. [Configuration](#configuration)
4. [Key Files and Components](#key-files-and-components)
   - [app.py](#1-apppy)
   - [database/**init**.py](#2-databaseinitpy)
   - [database/base.py](#3-databasebasepy)
   - [Models in database/models](#4-models-in-databasemodels)
5. [API Endpoints](#api-endpoints)
   - [Root Endpoint](#1-root-endpoint)
   - [Add Startup](#2-add-startup)
   - [Get Startups](#3-get-startups)
6. [Database Models](#database-models)
7. [Data Generation Scripts](#data-generation-scripts)
8. [Environment Variables](#environment-variables)
9. [Future Enhancements](#future-enhancements)

---

## Overview

The backend of the **1on1MatchingAndFeedbackTool** application is built with Flask and uses Flask-SQLAlchemy for database management. It provides RESTful API endpoints to interact with the database, which stores data for startups, coaches, feedback, and related entities. The backend is connected to an SQLite database named `sauna.db` and supports Cross-Origin Resource Sharing (CORS) for frontend communication.

---

## Folder Structure

```plaintext
backend/
├── data/
│   ├── assigned_startups.json
│   ├── assigned_startups_count.json
│   ├── coaches.json
│   ├── coachTimeWithBreaks.json
│   ├── daily_feedbacks.json
│   ├── startups.json
│   └── total_feedbacks.json
├── database/
│   ├── models/
│   │   ├── __init__.py
│   │   ├── banned_to_meet.py
│   │   ├── coach_assignments.py
│   │   ├── coach_slots.py
│   │   ├── coaches.py
│   │   ├── daily_feedback.py
│   │   ├── feedback_history.py
│   │   └── startups.py
│   ├── __init__.py
│   └── base.py
├── dataGen/
│   ├── filling_feedbacks.py
│   ├── gen_daily_feedbacks.py
│   ├── genCoachTime.py
│   ├── genStartups.py
│   ├── helper_meetings_count.py
│   ├── remove_shadow_ban.py
│   └── user_match_restrictor.py
├── info/
│   ├── diagrams/
│   │   ├── architecture_diagram.png
│   │   ├── flowchart.png
│   │   └── schema_diagram.png
│   └── images/
│       ├── project_overview.png
│       └── sample_data_visualization.png
├── testDatasets/
│    ├── testSet1/
│    │   ├── algo_output.md
│    │   ├── expected_assigned_startups.json
│    │   ├── expected_startups.json
│    │   ├── test_coachTimeWithBreaks.json
│    │   ├── test_startups.json
│    │   └── test_total_feedbacks.json
│    └── testSet2/
│        ├── algo_output.md
│        ├── expected_assigned_startups.json
│        ├── expected_startups.json
│        ├── test_coachTimeWithBreaks.json
│        ├── test_startups.json
│        └── test_total_feedbacks.json
│
├── app.py
├── algo.py
└── requirements.txt
```

---

## Configuration

- **Database**: SQLite (`sauna.db`)
- **Database URI**: `sqlite:///sauna.db`
- **CORS**: Enabled for `http://localhost:3000`
- **Logging**: SQLAlchemy logging enabled for debugging database queries.

---

## Key Files and Components

### 1. **`app.py`**

This is the main entry point of the backend application. It initializes the Flask app, configures the database, and defines API routes.

#### Features:

- Initializes Flask-SQLAlchemy with `sauna.db`.
- Enables CORS for frontend interaction.
- Provides routes for adding and fetching startups.

#### Routes:

| HTTP Method | Endpoint    | Description                                      |
| ----------- | ----------- | ------------------------------------------------ |
| `GET`       | `/`         | Returns a message confirming the API is running. |
| `POST`      | `/startups` | Adds a new startup to the database.              |
| `GET`       | `/startups` | Fetches all startups from the database.          |

#### Example Responses:

- **GET `/`**:
  ```json
  {
    "message": "API is running"
  }
  ```
- **POST `/startups`**:

  ```json
  {
    "message": "Startup added successfully",
    "startup": {
      "StartupName": "Example Startup"
    }
  }
  ```

### 2. **`database/__init__.py`**

This file initializes the database models and imports all entities for easy access.

#### Imports:

- Models: `BannedToMeet`, `CoachAssignments`, `Coaches`, `CoachSlots`, `DailyFeedback`, `FeedbackHistory`, `Startups`

#### Purpose:

Centralized access to all database models.

### 3. **`database/base.py`**

Defines and initializes the SQLAlchemy database object.

```python
from flask_sqlalchemy import SQLAlchemy
db = SQLAlchemy()
```

### 4. **Models in `database/models`**

The database models represent the schema and data structure for entities in the application.

#### Key Models:

1. **`BannedToMeet`**:

   - Tracks startups and coaches that cannot meet.

2. **`CoachAssignments`**:

   - Records the assignment of coaches to startups.

3. **`Coaches`**:

   - Stores details about coaches.

4. **`CoachSlots`**:

   - Represents available time slots for coaches.

5. **`DailyFeedback`**:

   - Manages daily feedback entries.

6. **`FeedbackHistory`**:

   - Tracks feedback history over time.

7. **`Startups`**:
   - Stores details about startups, including:
     - Name
     - Members
     - Contacts
     - Description
     - Social media links
     - Number of meetings

---

## API Endpoints

### 1. **Root Endpoint**

- **Endpoint**: `/`
- **Method**: `GET`
- **Description**: Confirms that the API is running.

#### Response:

```json
{
  "message": "API is running"
}
```

### 2. **Add Startup**

- **Endpoint**: `/startups`
- **Method**: `POST`
- **Description**: Adds a new startup to the database.

#### Request Body:

```json
{
  "StartupName": "Example Startup",
  "StartupMembers": "5",
  "PrimaryContact": "example@startup.com",
  "SecondaryContact": "support@startup.com",
  "StartupDescription": "Innovative tech solutions.",
  "StartupWebsite": "https://www.example.com",
  "StartupSocialMedia1": "https://twitter.com/example",
  "StartupSocialMedia2": "https://linkedin.com/company/example",
  "MeetingsCount": 10
}
```

#### Response:

```json
{
  "message": "Startup added successfully",
  "startup": {
    "StartupName": "Example Startup"
  }
}
```

### 3. **Get Startups**

- **Endpoint**: `/startups`
- **Method**: `GET`
- **Description**: Fetches all startups from the database.

#### Response:

```json
[
  {
    "StartupId": 1,
    "StartupName": "Example Startup",
    "StartupMembers": "5",
    "PrimaryContact": "example@startup.com",
    "SecondaryContact": "support@startup.com",
    "StartupDescription": "Innovative tech solutions.",
    "StartupWebsite": "https://www.example.com",
    "StartupSocialMedia1": "https://twitter.com/example",
    "StartupSocialMedia2": "https://linkedin.com/company/example",
    "MeetingsCount": 10
  }
]
```

---

## Database Models

The models are defined in `database/models`. Each model represents a database table.

### Example Model: **`Startups`**:

```python
class Startups(db.Model):
    __tablename__ = "startups"
    StartupId = db.Column(db.Integer, primary_key=True)
    StartupName = db.Column(db.String(255), nullable=False)
    StartupMembers = db.Column(db.String(255))
    PrimaryContact = db.Column(db.String(255), nullable=False)
    SecondaryContact = db.Column(db.String(255))
    StartupDescription = db.Column(db.Text)
    StartupWebsite = db.Column(db.String(255))
    StartupSocialMedia1 = db.Column(db.String(255))
    StartupSocialMedia2 = db.Column(db.String(255))
    MeetingsCount = db.Column(db.Integer, default=0)
```

---

## Data Generation Scripts

Located in `dataGen`, these scripts generate test data and manage feedback mechanisms.

### Key Scripts:

1. **`genStartups.py`**:

   - Generates test data for startups.

2. **`filling_feedbacks.py`**:

   - Simulates feedback form submissions.

3. **`remove_shadow_ban.py`**:
   - Admin tool to remove shadow bans from startups.

---

## Environment Variables

The backend supports the following environment variables:

1. **`SQLALCHEMY_DATABASE_URI`**:

   - URI for the database connection (default: `sqlite:///sauna.db`).

2. **`REACT_APP_BACKEND_URL`**:
   - Base URL for the API (used by the frontend).

---

## Future Enhancements

1. **Extend API Endpoints**:

   - Add more endpoints for coaches, feedback history, and scheduling.

2. **Connection of Frontend/Backend/DB**:

   - Connect frontend to backend logic of the algorithm and process data to/from the db

3. **Error Handling**:

   - Improve error handling and validation for API requests.

4. **Testing**:

   - Add unit and integration tests for all API endpoints.

5. **Performance Optimization**:
   - Optimize database queries and improve API response times.
