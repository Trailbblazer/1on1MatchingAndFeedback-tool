# Backend Documentation
#### Updated 12 March 2026

## Table of Contents

1. [Overview](#overview)
2. [Folder Structure](#folder-structure)
3. [Configuration](#configuration)
4. [Key Files and Components](#key-files-and-components)
5. [API Endpoints](#api-endpoints)
6. [Validation Testing](#validation-testing)
7. [Database Models](#database-models)
8. [Cascade Delete Behavior](#cascade-delete-behavior)
9. [API v1 (Routing Prototype)](#api-v1-routing-prototype)
10. [Data Generation Scripts](#data-generation-scripts)
11. [Environment Variables](#environment-variables)
12. [Future Enhancements](#future-enhancements)

---

## Overview

The backend of the **1on1MatchingAndFeedbackTool** application is built with Flask and uses Flask‑SQLAlchemy for database management. It now provides full CRUD endpoints for all seven core models, supported by a unified validation layer that enforces strict type checking, JSON shape rules, logical constraints, and consistent error responses. The backend stores data for startups, coaches, scheduling, and feedback, using an SQLite database (`sauna.db`) and supports CORS for frontend communication.

---

## Folder Structure

```plaintext
backend/
├── api_v1/
│   ├── __init__.py
│   ├── banned_to_meet_routes.py
│   ├── coach_assignments_routes.py
│   ├── coach_routes.py
│   ├── coach_slots_routes.py
│   ├── daily_feedback_routes.py
│   ├── feedback_history_routes.py
│   ├── routes.py
│   └── startup_routes.py
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
│   │   ├── db_model_updated_mar2026.jpg
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
│   └── sauna.db
├── scripts/
│   └── migrate_coach_names.py
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
├── validation/
│   ├── __init__.py
│   ├── banned_validation.py
│   ├── base_validators.py
│   ├── coach_assigment_validation.py
│   ├── coach_slot_validation.py
│   ├── coach_validation.py
│   ├── daily_feedback_validation.py
│   ├── feedback_history_validation.py
│   └── startup_validation.py
├── __init__.py
├── algo.py
├── app.py
├── requirements.txt
├── schema.sql
└── schema_clean.sql
```

---

## Configuration

- **Database**: SQLite `sauna.db`
- **Database URI**: `sqlite:///instance/sauna.db`
- **CORS**: Enabled for `http://localhost:3000`
- **Logging**: SQLAlchemy echo enabled for development
- **Models**: 7 tables with full foreign key relationships
- **Validation**: Unified validation layer for all POST and PATCH requests, including type checks, JSON shape rules, unknown‑field rejection, and logical constraints
- **Error Handling**: Consistent JSON error responses across all endpoints
- **ERD**: Located at `backend/dataGen/info/db_model_updated_feb2026.png`


---

## Key Files and Components

### 1. `app.py`

This is the main entry point of the backend. It initializes Flask, configures the database, registers all CRUD routes, and applies the unified validation layer.

#### Features:
- Initializes Flask‑SQLAlchemy with `sauna.db`
- Registers CRUD routes for all seven models
- Applies validation for POST and PATCH requests
- Provides health and database connectivity checks
- Enables CORS for frontend integration
- Ensures consistent JSON error responses

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

The models represent the schema and data structure for entities in the application using SQLAlchemy ORM. They correspond directly to the tables in `sauna.db` and the ERD diagram.
JSON‑based fields (such as StartupMembers and SocialMedia) are stored as TEXT and validated before saving. All models support partial updates through PATCH with strict validation.

Key Models are presented in **Database Models**.

### 5. Documentation and Schema Files

#### **`backend/dataGen/info/db_model_updated_mar2026.png`**
Updated ERD (Entity–Relationship Diagram) reflecting the current database schema (March 2026 Update).
Includes the remastered Coaches model (`Title`, `FirstName`, `LastName`) and corrected relationships with cascade delete behavior.

#### **`backend/dataGen/info/rules.md`**
Contains matching logic, constraints, and business rules.
Updated to align with the new structured coach naming and consistent foreign key relationships. 

#### **`backend/dataGen/info/tested_data.md`**
Includes sample data and meeting count tests used during development.
Also documents cascade delete test scenarios performed in March 2026. 

#### **`schema_clean.sql`**
- Clean SQL schema used for generating the ERD. 
- Uses unquoted identifiers and SQLite-compatible types.
- Updated to reflect the new Coaches fields (`Title`, `FirstName`, `LastName`) and corrected foreign key constraints with `ON DELETE CASCADE`.

#### **`schema.sql`**
- Full schema used by the backend, now updated with structured coach names, JSON fields, and cascade delete rules across all models. 

---

## API Endpoints

The backend exposes RESTful CRUD endpoints for all seven core models.  
Each model supports:

- **GET** (list and single item)
- **POST** (create)
- **PATCH** (partial update with strict validation)
- **DELETE** (remove)

All POST/PATCH requests pass through the unified validation layer, which enforces:
- type checking  
- JSON shape rules  
- unknown‑field rejection  
- logical constraints (e.g., DateTo ≥ DateFrom)  
- consistent JSON error responses  

Below is a summary of each model’s endpoints and example request/response formats.

---

### 1. **Root Endpoint**

`GET /`: Returns a simple health check.

```json
{ "message": "API is running" }
```

### 2. **Database Connectivity**

`GET /test-db`: Verifies that the backend can connect to the SQLite database.

#### Response:

```json
{ "message": "Database connected successfully", "status": "ok" }
```

### 3. **Database Model Endpoints**

### **3.1 Startups**

- **Endpoints**: 
- `GET /startups`
- `GET /startups/<id>`
- `POST /startups`
- `PATCH /startups/<id>`
- `DELETE /startups/<id>`

#### Example POST:

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

#### Example PATCH (Valid):
Update startup status

```json
{ "Status": "on-pause" }
```

#### Example Error (Invalid Type):
Status must be one of the allowed values

```json
{ "error": "Status must be one of: alive, on-pause, dead" }
```

### **3.2 Coaches**

- **Endpoints**: 
- `GET /coaches`
- `GET /coaches/<id>`
- `POST /coaches`
- `PATCH /coaches/<id>`
- `DELETE /coaches/<id>`


#### Example POST:

```json
{
  "FirstName": "John",
  "LastName": "Mentor",
  "Email": "john.mentor@example.com",
  "Expertise": "Growth, fundraising",
  "SocialMedia": { "linkedin": "https://linkedin.com/in/johnmentor" }
}
```

#### Example PATCH (Valid)
Update coach’s contact info *(The phone number is only the example.)*

```json
{ "Phone": "+358401234567" }
```

#### Example Error (Invalid Type):

```json
{ "error": "Email must be a string" }
```

### **3.3 Coach Slots**

- **Endpoints**: 
- `GET /coach_slots`
- `GET /coach_slots/<id>`
- `POST /coach_slots`
- `PATCH /coach_slots/<id>`
- `DELETE /coach_slots/<id>`

#### Example POST:

```json
{
  "CoachId": 1,
  "Date": "2026-03-01",
  "Slot": "10:00–10:20",
  "Duration": 20,
  "IsBreak": false
}
```

#### Example PATCH (Valid)
Update slot duration

```json
{ "Duration": 30 }
```

#### Example Error (Invalid Type):

```json
{ "error": "Duration must be an integer" }
```

### **3.4 Coach Assignments**

- **Endpoints**: 
- `GET /coach_assignments`
- `GET /coach_assignments/<id>`
- `POST /coach_assignments`
- `PATCH /coach_assignments/<id>`
- `DELETE /coach_assignments/<id>`

#### Example POST:

```json
{
  "CoachId": 2,
  "StartupId": 5,
  "SlotId": 12
}
```

#### Example PATCH (Valid)
Update assigned slot

```json
{ "SlotId": 15 }
```

#### Example Error (Invalid Type):

```json
{ "error": "SlotId must be an integer" }
```

### **3.5 Daily Feedback**

- **Endpoints**: 
- `GET /daily_feedback`
- `GET /daily_feedback/<id>`
- `POST /daily_feedback`
- `PATCH /daily_feedback/<id>`
- `DELETE daily_feedback/<id>`

#### Example POST:

```json
{
  "CoachId": 1,
  "StartupId": 3,
  "Grade": 1,
  "FeedbackText": "Great progress today."
}
```

#### Example PATCH (Valid)
Update feedback text

```json
{ "FeedbackText": "Improved clarity in pitch." }
```

#### Example Error (Invalid Type):

```json
{ "error": "FeedbackText must be a string" }
```

### **3.6 Feedback History**

- **Endpoints**: 
- `GET /feedback_history`
- `GET /daily_feedback/<id>`
- `POST /daily_feedback`
- `PATCH /daily_feedback/<id>`
- `DELETE daily_feedback/<id>`

**Notes:** *`FeedbackHistory` shouldn't be deleted but the DELETE method has been used for manual testing.*

#### Example POST:

```json
{
  "DailyFeedbackId": 10,
  "StartupId": 5,
  "CoachId": 3,
  "StartupGrade": 4,
  "CoachGrade": 5
}
```

#### Example PATCH (Valid)
Update updated grade

```json
{ "UpdatedStartupGrade": 3 }
```

#### Example Error (Invalid Type):

```json
{ "error": "UpdatedStartupGrade must be an integer between 1 and 5" }
```

### **3.7 Banned To Meet**

- **Endpoints**: 
- `GET /banned_to_meet`
- `GET /banned_to_meet/<id>`
- `POST /banned_to_meet`
- `PATCH /banned_to_meet/<id>`
- `DELETE banned_to_meet/<id>`

**Notes:** *`BannedToMeet` shouldn't be deleted but the DELETE method has been used for manual testing.*

#### Example POST:

```json
{
  "StartupId": 1,
  "CoachId": 2,
  "DateFrom": "2026-03-01",
  "DateTo": "2026-03-10",
  "Reason": "Conflict of interest"
}
```

#### Example PATCH (Valid)
Update DateTo

```json
{ "DateTo": "2026-03-15" }
```

#### Example Error (Invalid Logic):

```json
{ "error": "DateTo must be greater than or equal to DateFrom" }
```

---

## Validation Testing

The backend features a unified validation layer for all `POST` and `PATCH` requests across seven models, ensuring that incoming data is structurally correct, type-safe, logically consistent, and devoid of unknown fields. 
This section outlines the validation rules and includes example test cases based on actual development testing.

### 1. Validation Philosophy

All POST and PATCH requests follow the same validation principles:

- **Strict field validation**: Only known fields are allowed. Unknown fields trigger an error.
- **Type checking**: Every field must match the expected type (string, integer, boolean, list, object).
- **JSON shape validation**: Nested structures (e.g., `StartupMembers`, `SocialMedia`) must follow the correct schema.
- **Logical constraints**, for examples:
   - `DateTo` ≥ `DateFrom` 
   - Grades must be integers within allowed ranges (FeedbackHistory only)
   - Foreign keys must reference existing records
- **PATCH partial updates**: Only provided fields are validated and updated. Empty PATCH bodies are rejected.
- **Consistent error responses**: All validation failures return
```json
{ "error": "Description of the validation error" }
```
- **Record existence checks**: PATCH/DELETE on non‑existent IDs return
```json
{ "error": "Record not found" }
```

### 2. Main Validation Cases (Across All Models)

This subsection consolidates key validation scenarios from all seven models, representing crucial patterns of validation behavior essential for developers' understanding.

### Unknown Fields
Occurs when the request contains keys not defined in the model.

**Example:**
```json
{ "RandomField": "test" }
```

**Error:**
```json
{ "error": "Unknown field: RandomField" }
```

### Wrong Data Types
Triggered when a field has the wrong primitive type.

**Examples:**
```json
{ "Email": 123 }
{ "Duration": "sixty" }
{ "StartupId": "five" }
{ "FirstName": 99 }
```

**Errors:**
```json
{ "error": "Email must be a string" }
{ "error": "Duration must be an integer" }
{ "error": "StartupId must be an integer" }
{ "error": "FirstName must be a string" }
```

### Wrong JSON Shapes
Used for nested structures that must follow a specific schema.

**Examples:**
```json
{ "StartupMembers": ["Alice"] }
{ "SocialMedia": "linkedin.com/john" }
{ "StartupSocialMedia": [] }
```

**Errors:**
```json
{ "error": "StartupMembers must be a list of objects" }
{ "error": "SocialMedia must be an object" }
{ "error": "StartupSocialMedia must be an object" }
```

### Invalid Enum Values
Used when a field must match a predefined set of allowed values.

**Example:**
```json
{ "Status": "Active" }
```

**Error:**
```json
{ "error": "Status must be one of: alive, on-pause, dead" }
```

### Invalid Date Formats
All dates must follow ISO format `YYYY-MM-DD`.

**Example:**
```json
{ "Date": "March 1st" }
```

**Error:**
```json
{ "error": "Date must be in YYYY-MM-DD format" }
```

### Logical Constraints
Used when fields must satisfy a relationship.

**Example:**
```json
{ "DateFrom": "2026-03-10", "DateTo": "2026-03-01" }
```

**Error:**
```json
{ "error": "DateTo must be greater than or equal to DateFrom" }
```

### Empty PATCH Body
PATCH must include at least one valid field.

**Example:**
```json
{}
```

**Error:**
```json
{ "error": "No valid fields provided for update" }
```

### Record Not Found
Occurs when the ID does not exist in the database.

**Example:**
`PATCH /startups/9999`

**Error:**
```json
{ "error": "Not found" }
```

---

## Database Models

All models are defined in `database/models`.
Each model corresponds to a table in `sauna.db` and follows a consistent structure with:
- clearly defined columns
- foreign‑key relationships
- JSON‑based fields stored as TEXT
- full CRUD support
- unified validation for `POST` and `PATCH`
The complete schema is shown in the ERD `(db_model_updated_mar2026.png)`.

### 1. Startups
Represents a startup participating in the program.

**Key characteristics:**
- Uses flexible JSON fields (`StartupMembers`, `StartupSocialMedia`, `PreviousNames`)
- Tracks metadata such as `Status`, `MeetingsCount`, and `Website`
- Enforces strict validation for nested JSON structures
- Connected to feedback, assignments, and banned‑to‑meet records
- Deleting a startup cascades to: `DailyFeedback`, `FeedbackHistory`, `CoachAssignments`, `BannedToMeet`

### 2. Coaches`
Represents a coach in the program.

**Key characteristics:**
- Uses structured name fields: `Title`, `FirstName`, `LastName`
- Stores profile information (title, first name, last name, email, phone, chat)
- Includes counters (`CoachingSessions`, `BatchesCoached`)
- Supports JSON `SocialMedia` field
- Linked to slots, assignments, feedback, and restrictions
- Deleting a coach cascades to: `CoachSlots`, `CoachAssignments`, `DailyFeedback`, `FeedbackHistory`, `BannedToMeet`

### 3. CoachSlots
Represents available time slots for each coach.

**Key characteristics:**
- Includes `Date`, `Slot`, `Duration`, and `IsBreak`
- Linked to `CoachId`
- Used by the matching engine and assignment logic
- Deleting a coach automatically removes all their slots

### 4. CoachAssignments
Represents the mapping between a coach, a startup, and a specific slot.

**Key characteristics:**
- Connects `CoachId`, `StartupId`, and `SlotId`
- Tracks scheduled 1‑on‑1 meetings
- Supports updates to any of the linked foreign keys
- Cascades when a coach, startup, or slot is deleted

### 5. DailyFeedback
Represents daily feedback given after each meeting.

**Key characteristics:**
- Stores `FeedbackText`, and `Date`
- Linked to both `CoachId` and `StartupId`
- Forms the basis for historical feedback tracking
- Deleting a coach or startup removes related daily feedback

### 6. FeedbackHistory
Represents historical revisions of feedback.

**Key characteristics:**
- Stores original and updated grades
- Includes text feedback from both sides
- Tracks update timestamps
- Linked to `DailyFeedbackId`, `StartupId`, and `CoachId`
- Uses corrected field names: `StartupTextFeedback`, `CoachTextFeedback`, `UpdatedStartupGrade`, `DateUpdatedStartupGrade`
- Cascades when related daily feedback, coach, or startup is deleted

### 7. BannedToMeet
Represents restrictions preventing certain coach–startup meetings.

**Key characteristics:**
- Stores `DateFrom`, `DateTo`, and `Reason`
- Enforces logical constraints (e.g., `DateTo ≥ DateFrom`)
- Used by the matching engine to avoid invalid pairings
- Cascades when either the coach or startup is deleted

---

## Cascade Delete Behavior

The backend employs database-level cascade delete rules to maintain data integrity across seven models. 
When a parent record, like a coach or startup, is deleted, all dependent records are also automatically removed, preventing orphaned rows 
and ensuring relational consistency. This cascade behavior is implemented in the SQL schema through `ON DELETE CASCADE` and is reflected in 
SQLAlchemy model relationships.

### 1. Delete a Coach
Removing a coach automatically deletes all records linked to that coach:
- **CoachSlots** (their available time slots)
- **CoachAssignments** (scheduled meetings)
- **DailyFeedback** (daily interaction logs)
- **FeedbackHistory** (historical feedback revisions)
- **BannedToMeet** (restriction rules involving that coach)

### 2. Delete a Startup
Removing a startup cascades through all related tables:
**DailyFeedback**, **FeedbackHistory**, **CoachAssignments**, **BannedToMeet**

### 3. Deleting a CoachSlot
When a slot is deleted, All **CoachAssignments** linked to that slot are automatically removed.

### 4. Deleting DailyFeedback
When a daily feedback entry is removed, All **FeedbackHistory** entries referencing it are also deleted.

### 5. Summary of Cascade Rules

| Parent Deleted    | Automatically Removed                                                      |
|-------------------|----------------------------------------------------------------------------|
| Coach             | CoachSlots, CoachAssignments, DailyFeedback, FeedbackHistory, BannedToMeet |
| Startup           | DailyFeedback, FeedbackHistory, CoachAssignments, BannedToMeet             |
| CoachSlot         | CoachAssignments                                                           |
| DailyFeedback     | FeedbackHistory                                                            |

### 6. Testing Summary (March 2026)

Cascade behavior was verified through manual and automated tests:
- Creating a coach/startup with related slots, assignments, feedback, and bans
- Deleting the parent record
- Confirming all dependent rows were removed
- Ensuring no orphaned foreign keys remained
- Verifying that unrelated records were untouched 

All cascade paths behaved as expected and matched the SQL schema and ERD.

---

## API v1 (Routing Prototype)

The `api_v1` folder contains an early prototype of the routing structure using Flask Blueprints.  
These routes were created before the full CRUD backend existed and were used only to test URL patterns and request handling.

### Purpose of `api_v1`
- Prototype route structure with Blueprints
- Test URL patterns and HTTP methods
- Provide a temporary sandbox before real database logic was implemented

### Placeholder Routes
These routes return static JSON and **do not** interact with the database.

| Endpoint          | Method | Description                                  |
|-------------------|--------|----------------------------------------------|
| `/match`          | POST   | Placeholder for the matching algorithm       |
| `/feedback/`      | GET    | Placeholder for retrieving feedback          |
| `/availability/`  | GET    | Placeholder for coach availability           |
| `/startup/`       | PATCH  | Placeholder for updating startup information |

### Status
- Prototype only
- Kept for reference
- Will be removed or replaced as the full API is now implemented

---

## Data Generation Scripts

The `backend/dataGen` folder contains helper scripts used during development to generate test data and simulate program workflows.
These scripts are **not part of the production API.**

### 1. **`genStartups.py`**:
- Generates sample startup data, including:
   - `StartupMembers` 
   - `StartupSocialMedia` 
   - `PreviousNames` 
- Useful for populating the database during development.

### 2. **`filling_feedbacks.py`**
- Simulates:
  - `DailyFeedback` entries
  - `FeedbackHistory` updates
- Used to test feedback endpoints and relationships.

### 3. `remove_shadow_ban.py` 
- Utility for clearing entries in `BannedToMeet`.
- Helpful when resetting constraints during scheduling tests.

### 4. Documentation Files in (`dataGen/info`)
- **`db_model_updated_feb2026.png`**: Updated ERD diagram
- **`rules.md`**: — Matching logic, constraints, and business rules
- **`tested_data.md`**: — Sample meeting counts and imbalance tests

---

## Environment Variables
The backend supports a small set of environment variables.
Defaults are provided for local development, and no additional configuration is required for basic usage.

### 1. **`SQLALCHEMY_DATABASE_URI`**:
   - Defines the database connection string.
   - **Default** (development): `sqlite:///instance/sauna.db` 
   - Uses Flask’s `instance/` folder for safe, writable storage.

### 2. **`REACT_APP_BACKEND_URL`**:
   - Base URL for the frontend to communicate with the backend.
   - Typical local value: `http://localhost:5000`

### 3. **Optional Debug Variables**
These are helpful during development but not required in production:
   - `FLASK_ENV=development`
   - `FLASK_DEBUG=1`

They enable hot reload and detailed error messages.

---

## Future Enhancements

The backend is now stable with full CRUD, unified validation, and consistent error handling.
The remaining work focuses on deeper functionality, integration, and long‑term maintainability.

### 1. **Matching Engine Integration**
Add full CRUD endpoints for the remaining database models:
- Implement the real matching algorithm based on `rules.md`
- Replace the `/match` prototype route with production logic
- Use live data from Startups, Coaches, Slots, and BannedToMeet
- Add helper utilities for scoring, filtering, and conflict resolution

### 2. Upgrade `api_v1` Prototype Routes
- Remove temporary placeholder endpoints
- Connect them to real/finalized SQLAlchemy queries
- Align routing structure with the production matching engine

### 3. Frontend–Backend Integration
- Connect frontend forms and flows to the new CRUD API
- Add UI for scheduling, feedback, and entity management
- Surface validation and error messages in the UI

### 4. **Automated Testing (pytest)**
- Add unit tests for models and serialization
- Add validation tests for POST/PATCH logic
- Add integration tests for all CRUD endpoints
- Add workflow tests for scheduling, matching, and feedback