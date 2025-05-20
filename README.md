# 1on1MatchingAndFeedbackTool

## Overview
The **1on1MatchingAndFeedbackTool** is a project designed to match startups and coaches efficiently. This guide provides instructions for setting up and running both the backend and frontend components.

---

## Backend Setup

### Step 1: Install Dependencies
```bash
cd Sauna-Trainee/1on1MatchingAndFeedbackTool/backend
pip install -r requirements.txt
```

### Step 2: Setup SQLite JDBC Driver
- Ensure the SQLite JDBC driver (version 3.45.1) is installed.
- If using PyCharm:
  1. Go to `File > Settings > Project: <Project Name> > Python Interpreter`.
  2. Add the SQLite JDBC driver if missing.
  3. Test the database connection.

### Step 3: Start the Backend Server
```bash
python backend/app.py
```

- You should see the following output:
  ```
  Running on http://127.0.0.1:5000
  ```

### Notes:
- If your IDE does not recognize the `1on1MatchingAndFeedbackTool` folder, mark it as **Source Root**.
- If `backend/database/__init__.py` or `backend/app.py` causes "Unresolved reference" or "No module named 'backend'" inside those files, run `app.py` anyway. When the server starts, the error will be gone.
- The `app.py` file also initializes the database. When the backend server runs for the first time, it creates the necessary tables in the `sauna.db` file automatically using the following code:
  ```python
  with app.app_context():
      db.create_all()
  ```
  This ensures that your database schema matches the defined models.

---

## Frontend Setup

### Step 1: Install Dependencies
```bash
cd Sauna-Trainee/1on1MatchingAndFeedbackTool/frontend
npm install
```

### Step 2: Start the Frontend Server
```bash
npm start
```

- You should see the following output:
  ```
  Compiled successfully!

  You can now view frontend in the browser.

    Local:            http://localhost:3000
  ```
- Click the link to open the frontend in your browser.

---
