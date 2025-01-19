ensure that:

Startups with 0 meetings get the priority in matching.
No startup is booked for the same coach more than once, and
No startup is double-booked across different coaches at the same time
Startups with "Startup_grade": null match last


add optional json to algo with feedback coach-to-startup -> return another dictionary with session id, coach id, startup id, startup feedback, coach feedback

round counter add

The main idea for matching in this group is:
- if "Startup_grade": 1, "Coach_grade": 1 - they have priority 1 in meeting each other, or in other words, this startup should take slot for this coach as a priority.
- if "Startup_grade": 0, "Coach_grade": 1 - they have priority 2 in meeting each other
- if "Startup_grade": 1, "Coach_grade": 0 - they have priority 3 in meeting each other
- if "Startup_grade": 1, "Coach_grade": null - they have priority 4 in meeting each other
- if "Startup_grade": 0, "Coach_grade": 0 - they have priority 5 in meeting each other
- if "Startup_grade": 0, "Coach_grade": null - they have priority 6 in meeting each other
- if "Startup_grade": -1, "Coach_grade": 1 - they have priority 7 in meeting each other
- if "Startup_grade": -1, "Coach_grade": 0 - they have priority 8 in meeting each other
- if "Startup_grade": -1, "Coach_grade": null - they have priority 8 in meeting each other
- if "Coach_grade": -1 - they should not match at all


Todo:
- Add the name, members, description, social media, email, phone for the startup in startup.json

Data Input:
Replace data generation scripts with mechanisms to collect real data from users (e.g., web forms, APIs).

User Interface:
Develop a front-end application for coaches and startups to input availability and feedback.

Database Integration:
Use a database system (e.g., SQL, NoSQL) to store and manage data more efficiently and securely.

Authentication and Authorization:
Implement user authentication to secure data input and access.
Ensure that administrative tools are protected and only accessible to authorized personnel.

Error Handling and Logging:
Enhance scripts with robust error handling.
Implement logging to track system operations and assist in troubleshooting.

Scalability and Performance:
Optimize the matching algorithm for larger datasets.
Consider asynchronous processing for handling data updates and assignments.

Testing and Validation:
Develop comprehensive test cases to ensure system reliability.
Validate user inputs to prevent data corruption.
