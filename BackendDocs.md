# Backend Documentation

## Table of Contents

1. [Overview](#overview)
2. [Folder Structure](#folder-structure)
3. [Configuration](#configuration)
4. [Key Files and Components](#key-files-and-components)
   - [app.py](#1-apppy)
   - [database/__init__.py](#2-databaseinitpy)
   - [database/base.py](#3-databasebasepy)
   - [Models in database/models](#4-models-in-databasemodels)
   - [Documentation and Schema Files](#5-documentation-and-schema-files)
5. [API Endpoints](#api-endpoints)
   - [Root Endpoint](#1-root-endpoint)
   - [Database Connectivity Check](#2-database-connectivity-check) 
   - [Add Startup](#3-add-startup) 
   - [Get Startups](#4-get-startups) 
   - [Add Coach](#5-add-coach) 
   - [Get Coaches](#6-get-coaches)
6. [Database Models](#database-models)
7. [API v1 (Routing Prototype)](#api-v1-routing-prototype)
8. [Data Generation Scripts](#data-generation-scripts)
9. [Environment Variables](#environment-variables)
10. [Future Enhancements](#future-enhancements)

---

## Overview

The backend of the **1on1MatchingAndFeedbackTool** application is built with Flask and uses Flask-SQLAlchemy for database management. It provides RESTful API endpoints to interact with the database, which stores data for startups, coaches, feedback, and related entities. The backend is connected to an SQLite database named `sauna.db` and supports Cross-Origin Resource Sharing (CORS) for frontend communication.

---

## Folder Structure

```plaintext
backend/
├── api_v1/
│   ├── __init__.py
│   ├── routes.py
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
│   ├── info
│   │   ├── db_model.jpg
│   │   ├── logic.model.jpg
│   │   ├── rules.md
│   │   └── tested_data.md
│   ├── filling_feedbacks.py
│   ├── gen_daily_feedbacks.py
│   ├── genCoachTime.py
│   ├── genStartups.py
│   ├── helper_meetings_count.py
│   ├── remove_shadow_ban.py
│   └── user_match_restrictor.py
├── instance/
│    ├── sauna.db
├── testDatasets/
│    ├── testSet1/
│    │   ├── algo_output.md
│    │   ├── expected_assigned_startups.json
│    │   ├── expected_startups.json
│    │   ├── test_coachTimeWithBreaks.json
│    │   ├── test_startups.json
│    │   └── test_total_feedbacks.json
│    └── testSet2/
│    │   ├── algo_output.md
│    │   ├── expected_assigned_startups.json
│    │   ├── expected_startups.json
│    │   ├── test_coachTimeWithBreaks.json
│    │   ├── test_startups.json
│    │   └── test_total_feedbacks.json
│    └── testSetInformation.md
│
├── __init__.py
├── algo.py
├── app.py
└── requirements.txt
```

---

## Configuration

- **Database**: SQLite `sauna.db`
- **Database URI**: `sqlite:///instance/sauna.db`
- **CORS**: Enabled for `http://localhost:3000`
- **Logging**: SQLAlchemy echo enabled for debugging
- **Models**: 7 tables with full foreign key relationships
- **ERD**: Located at backend/dataGen/info/db_model_updated_feb2026.png

---

## Key Files and Components

### 1. **`app.py`**

This is the main entry point of the backend application. It initializes the Flask app, configures the database, and defines API routes.

#### Features:

- Initializes Flask-SQLAlchemy with `sauna.db` (in the `instance/` folder).
- Uses `sqlite:///instance/sauna.db` as the database URI. 
- Enables CORS for frontend interaction (`http://localhost:3000`). 
- Provides routes for: 
  - Health check 
  - Database connectivity check 
  - Adding and fetching startups

#### Routes:

| HTTP Method | Endpoint    | Description                                         |
| ----------- |-------------|-----------------------------------------------------|
| `GET`       | `/`         | Returns a message confirming the API is running.    |
| `GET`       | `/test-db`  | Verifies database connectivity with a simple query. |
| `POST`      | `/startups` | Adds a new startup to the database.                 |
| `GET`       | `/startups` | Fetches all startups from the database.             |

#### Example Responses:

- **GET `/`**:
  ```json
  {
    "message": "API is running"
  }
  ```

- **GET `/test-db`**:
  ```json
  {
     "message": "Database connected successfully",
     "status": "ok"
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

This file imports and exposes all database models, so they can be accessed easily throughout the application.

#### Imports:

- Models: `BannedToMeet`, `CoachAssignments`, `Coaches`, `CoachSlots`, `DailyFeedback`, `FeedbackHistory`, `Startups`

#### Purpose:

- Provides centralized access to all database models.
- Ensures app.py and other modules can import models from a single location.

### 3. **`database/base.py`**

Defines and initializes the shared SQLAlchemy database object used across the backend.

```python
from flask_sqlalchemy import SQLAlchemy
db = SQLAlchemy()
```

### 4. **Models in `database/models`**

The database models represent the schema and data structure for entities in the application using SQLAlchemy ORM.
They correspond directly to the tables in `sauna.db` and the ERD diagram.

#### Key Models:

1. **`BannedToMeet`**:

   - Tracks coach–startup pairs that are not allowed to meet.
   - Includes date ranges and reasons for restrictions.
    
2. **`CoachAssignments`**:

   - Records which coach is assigned to which startup.
   - Links to specific time slots (`SlotId`).

3. **`Coaches`**:

   - Stores coach information, including:
     - Name
     - Email and phone
     - Chat handle
     - Bio and expertise
     - Social media links     
     - Number of coaching sessions and batches coached

4. **`CoachSlots`**:

   - Represents available time slots for coaches, including:
      - Date
      - Slot label
      - Duration
      - Break Indicator (`IsBreak`)

5. **`DailyFeedback`**:

   - Stores daily feedback entries for coach–startup interactions.
   - Includes text feedback and grades.

6. **`FeedbackHistory`**:

   - Tracks feedback history over time.
   - Stores:
      - Original grades
      - Updated grades 
      - Text feedback from both sides 
      - Links to `DailyFeedback`, `Startups`, and `Coaches`
        

7. **`Startups`**:
   - Stores startup information, including:
      - Name 
      - Website 
      - Status (alive, on-pause, dead)
      - Members 
      - Contacts 
      - Description 
      - Social media links 
      - Number of meetings

### 5. Documentation and Schema Files

#### **`backend/dataGen/info/db_model_updated_feb2026.png`**
Updated ERD (Entity–Relationship Diagram) reflecting the current database schema (February 2026 Update).

#### **`backend/dataGen/info/rules.md`**
Contains matching logic, constraints, and business rules.

#### **`backend/dataGen/info/tested_data.md`**
Includes sample data and meeting count tests used during development.

#### **`schema_clean.sql`**
- Clean SQL schema used for generating the ERD. 
- Uses unquoted identifiers and SQLite-compatible types.

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

### 2. **Database Connectivity Check**

- **Endpoint**: `/test-db`
- **Method**: `GET`
- **Description**: Verifies that the backend can connect to the SQLite database.

#### Response:

```json
{
  "message": "Database connected successfully",
  "status": "ok"
}
```

### 3. **Add Startup**

- **Endpoint**: `/startups`
- **Method**: `POST`
- **Description**: Adds a new startup to the database.

#### Request Body:

```json
{
  "StartupName": "Example Startup",
  "Website": "https://example.com",
  "Status": "alive",
  "StartupMembers": [
    {
      "name": "Alice Founder",
      "email": "alice@example.com",
      "level": "primary"
    }
  ]
}
```

#### Successful Response:

```json
{
  "message": "Startup added successfully",
  "startup": {
    "StartupName": "Example Startup"
  }
}
```

#### Error Example:

```json
{
  "error": "Website is required"
}
```

### 4. **Get Startups**

- **Endpoint**: `/startups`
- **Method**: `GET`
- **Description**: Fetches all startups from the database.

#### Response Example:

```json
[
  {
    "MeetingsCount": 0,
    "PreviousNames": null,
    "StartupDescription": null,
    "StartupId": 1,
    "StartupMembers": [
      {
        "email": "alice@example.com",
        "level": "primary",
        "name": "Alice Founder"
      }
    ],
    "StartupName": "Example Startup",
    "StartupSocialMedia": null,
    "Status": "alive",
    "Website": "https://example.com"
  }
]
```

### 5. **Add Coach**

- **Endpoint**: `/coaches`
- **Method**: `POST`
- **Description**: Adds a new coach to the database.

#### Request Body:

```json
{
  "CoachName": "John Mentor",
  "Email": "john.mentor@example.com",
  "Phone": "+358401234567",
  "Chat": "@johnmentor",
  "Expertise": "Growth, fundraising, product strategy",
  "Bio": "Experienced startup coach specializing in early-stage growth.",
  "CoachingSessions": 12,
  "BatchesCoached": 3,
  "SocialMedia": [
    "https://linkedin.com/in/johnmentor",
    "https://twitter.com/johnmentor"
  ]
}
```

#### Successful Response:

```json
{
  "coach": {
    "BatchesCoached": 3,
    "Bio": "Experienced startup coach specializing in early-stage growth.",
    "Chat": "@johnmentor",
    "CoachName": "John Mentor",
    "CoachingSessions": 12,
    "Email": "john.mentor@example.com",
    "Expertise": "Growth, fundraising, product strategy",
    "Phone": "+358401234567",
    "SocialMedia": [
      "https://linkedin.com/in/johnmentor",
      "https://twitter.com/johnmentor"
    ]
  },
  "message": "Coach added successfully"
}
```

#### Error Response:

```json
{
  "error": "CoachName is required"
}
```

### 6. **Get Coaches**

- **Endpoint**: `/coaches`
- **Method**: `GET`
- **Description**: Fetches all coaches from the database.

#### Response Example:
```json
[
  {
    "BatchesCoached": 3,
    "Chat": "@johnmentor",
    "CoachId": null,
    "CoachName": "John Mentor",
    "CoachingSessions": 12,
    "Email": "john.mentor@example.com",
    "Expertise": "Growth, fundraising, product strategy",
    "Phone": "+358401234567",
    "SocialMedia": [
      "https://linkedin.com/in/johnmentor",
      "https://twitter.com/johnmentor"
    ]
  }
]
```

---

## Database Models

All models are defined in `database/models`.  
Each model represents a table in `sauna.db` and includes relationships that connect entities across the system.

---

### 1. **`Startups`**

Represents a startup participating in the program.  
This model has been fully modernized to support flexible JSON fields and richer metadata.

```python
class Startups(db.Model):
    __tablename__ = 'startups'
    StartupId = db.Column(db.Integer, primary_key=True, autoincrement=True)

    # Core Identity
    StartupName = db.Column(db.String(100), nullable=False)
    Website = db.Column(db.String(255), nullable=False)
    # Status: alive / on-pause / dead
    Status = db.Column(db.String(20), nullable=False, default="alive")
    # Optional list of previous names
    PreviousNames = db.Column(db.JSON, nullable=False)
    # Members: list of objects { name, email, phone, role, level }
    StartupMembers = db.Column(db.JSON, nullable=False)
    # Flexible social media links (list of URLs)
    StartupSocialMedia = db.Column(db.JSON, nullable=True)
    # Optional description
    StartupDescription = db.Column(db.String(255), nullable=True)
    # Internal counter used by the matching tool
    MeetingsCount = db.Column(db.Integer, nullable=False, default=0)
    # Relationships
    feedback = db.relationship('FeedbackHistory', back_populates='startup')
    daily_feedback = db.relationship('DailyFeedback', back_populates='startup')
    assignments = db.relationship('CoachAssignments', back_populates='startup')
```

### 2. **`Coaches`**

Represents a coach in the program.
Supports flexible profile fields and activity counters.

```python
class Coaches(db.Model):
    __tablename__ = 'coaches'
    CoachId = db.Column(db.Integer, primary_key=True)

    # Required
    CoachName = db.Column(db.String(100), nullable=False)
    Email = db.Column(db.String(100), nullable=False, unique=True)
    # Optional contact methods
    Phone = db.Column(db.String(100), nullable=True)
    Chat = db.Column(db.String(100), nullable=True)
    # Profile information
    Bio = db.Column(db.Text, nullable=True)
    Expertise = db.Column(db.String(200), nullable=True)
    # Flexible list of social media links
    SocialMedia = db.Column(JSON, nullable=True)
    # Activity counters
    CoachingSessions = db.Column(db.Integer, nullable=False, default=0)
    BatchesCoached = db.Column(db.Integer, nullable=False, default=0)
    # Relationships
    slots = db.relationship('CoachSlots', back_populates='coach')
    feedback = db.relationship('FeedbackHistory', back_populates='coach')
    daily_feedback = db.relationship('DailyFeedback', back_populates='coach')
    assignments = db.relationship('CoachAssignments', back_populates='coach')
```

### 3. **Other Models**
The backend also includes:
- CoachSlots: available time slots for each coach
- CoachAssignments: mapping between coaches, startups, and slots
- DailyFeedback: daily feedback entries
- FeedbackHistory: historical feedback revisions
- BannedToMeet: restrictions preventing certain coach–startup meetings 
These models follow the same structure and are fully represented in the ERD diagram (db_model_updated_feb2026.png).

---

## API v1 (Routing Prototype)

The `api_v1` folder contains an early prototype of the routing structure using Flask Blueprints.  
These routes were created for testing and do not yet include real database logic.

### Purpose of `api_v1`
- Experiment with route organization using Blueprints.
- Test URL patterns and HTTP methods.
- Prepare the structure for future full API implementation.

### Current Placeholder Routes

| Endpoint                   | Method | Description                                                        |
|----------------------------|--------|--------------------------------------------------------------------|
| `/match`                   | POST   | Placeholder for the matching algorithm.                            |
| `/feedback/<startup_id>`   | GET    | Placeholder for retrieving feedback for a startup.                 |
| `/availability/<coach_id>` | GET    | Placeholder for retrieving coach availability.                     |
| `/startup/<id>`            | PATCH  | Placeholder for updating startup information.                      |

### Status
- These routes **do not** interact with the database yet.
- They return static JSON responses for testing.
- They will be replaced or expanded when full CRUD logic is implemented for all models.

---

## Data Generation Scripts

Located in `backend/dataGen`, these scripts are used for generating test data, validating matching logic, and supporting development workflows.
They are not part of the production API but help simulate realistic program data. ### Key Scripts

### 1. **`genStartups.py`**:
- Generates sample startup entries for testing. 
- Produces structured JSON fields such as: 
   - `StartupMembers` 
   - `StartupSocialMedia` 
   - `PreviousNames` 
- Useful for populating the database during development.

### 2. **`filling_feedbacks.py`**
- Simulates daily feedback submissions.
- Generates:
  - `DailyFeedback` entries
  - `FeedbackHistory` updates
- Helps test feedback-related endpoints and relationships.

### 3. `remove_shadow_ban.py` 
- Admin utility for removing entries from `BannedToMeet`. 
- Useful when testing scheduling logic or resetting constraints.

### 4. Documentation Files in `dataGen/info`
- **`db_model_updated_feb2026.png`**: Updated ERD diagram.
- **`rules.md`**: — Matching logic, constraints, and business rules.
- **`tested_data.md`**: — Sample meeting counts and imbalance testing notes.

---

## Environment Variables

The backend supports the following environment variables.  
Defaults are provided for local development.

### 1. **`SQLALCHEMY_DATABASE_URI`**:
   - Defines the database connection string.
   - **Current default** (development):
   - `sqlite:///instance/sauna.db` Uses Flask’s `instance/` folder for safe, writable storage.

### 2. **`REACT_APP_BACKEND_URL`**:
   - Base URL for the frontend to communicate with the backend.
   - Example (local development): `http://localhost:5000`

### 3. **Optional Debug Variables**
   - `FLASK_ENV=development`
   - `FLASK_DEBUG=1`
   - Enable hot reload and detailed error messages.

---

## Future Enhancements

These items represent the remaining backend work that has not yet been implemented.

### 1. **Complete API Endpoints for All Models**
Add full CRUD endpoints for the remaining database models:
- CoachSlots
- CoachAssignments
- DailyFeedback
- FeedbackHistory
- BannedToMeet

This will complete backend coverage for all 7 tables.

### 2. Integrate `api_v1` Blueprint With Real Logic 
- Replace placeholder responses with real SQLAlchemy operations. 
- Connect: 
   - `/match` → matching algorithm (based on rules.md)
   - `/feedback/<startup_id>` → DailyFeedback + FeedbackHistory 
   - `/availability/<coach_id>` → CoachSlots 
   - `/startup/<id>` → PATCH update for Startups

### 3. Frontend–Backend Integration
- Connect frontend forms to the new API structure.
- Implement UI flows for:
  - Startup creation and listing
  - Coach creation and listing
  - Scheduling (slots + assignments)
  - Feedback submission and history

### 4. **Error Handling & Validation**
- Add consistent validation for JSON fields.
- Standardize error responses.
- Implement global error handlers.

### 5. **Testing**
- Add unit tests for models serialization and JSON fields.
- Add integration tests for Startup creation, Coach creation, and Feedback flows
- Add workflow tests for `api_v1` once real logic is implemented.

### 6. **Performance Optimization**
- Add indexes for frequently queried fields.
- Optimize queries involving assignments and feedback.
- Add pagination for large datasets.

