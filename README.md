# 1on1MatchingAndFeedbackTool

## Overview
The **1on1MatchingAndFeedbackTool** is a project designed to match startups and coaches efficiently. This guide provides instructions for setting up and running both the backend and frontend components.

---

## Backend Setup (Flask + SQLAlchemy)

### Step 1: Clone the repository and navigate into the project directory

**In GitLab:**
```bash
git clone https://gitlab.com/SampoAccelerator/1on1MatchingAndFeedback-tool.git 
```

**In GitHub (Current Version - Still using personal username):**
```bash
git clone https://github.com/1on1matchingtool-team/1on1MatchingAndFeedback-tool.git
```

```bash
cd your-repository-name
```
(Current case: cd 1on1MatchingAndFeedback-tool/backend)

### Step 2: (Optional) Create a virtual environment
```bash
python -m venv venv
source venv/bin/activate  # On Windows use: venv\Scripts\activate
```

### Step 3: Install python dependencies (if any requirements.txt is provided)
```bash
pip install -r requirements.txt
```

### Step 4: Start the Backend Server
```bash
python backend/app.py
```

- If successful, you will see::
  ```[BackendDocs.md](BackendDocs.md)
  Running on http://127.0.0.1:5000
  ```

### Notes:
- If your IDE does not recognize the `1on1MatchingAndFeedbackTool` folder, mark it as **Source Root**.
- If you see `backend/database/__init__.py` or `backend/app.py` causes "Unresolved reference" or "No module named 'backend'" just run `app.py`, the server will start.
- On first run, the backend automatically creates the SQLite database instance/sauna.db using:
  ```python
  with app.app_context():
      db.create_all()
  ```
  This ensures the database schema matches the SQLAlchemy models.

---

## Frontend Setup

### Step 1: Install Dependencies
```bash
cd ../frontend
npm install
```

### Step 2: Start the Frontend Server
```bash
npm start
```

- You should see the following output:
  ```
  Compiled successfully!
  Local: http://localhost:3000
  ```
- Click the link to open in your browser.

---

##  Environment Variables

### Backend
The backend uses SQLite by default:
```
SQLALCHEMY_DATABASE_URI=sqlite:///instance/sauna.db
```

### Frontend
Create a `.env` file inside `/frontend`:
```
REACT_APP_BACKEND_URL=http://127.0.0.1:5000
```

---
