import sys, os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..")))

from backend.database.base import db
from backend.database.models.coaches import Coaches
from backend.app import app

# List of known titles to detect
TITLES = {"Mr.", "Mrs.", "Miss", "Ms.", "Dr.", "Prof.", "Sir", "Madam", "Coach", "mr.", "mrs.", "miss", "ms.", "dr.", "prof.", "sir", "madam", "coach"}

def split_name(full_name):
    # Split a full name into Title, FirstName, LastName.
    # Handles cases like: 'Dr. Emma Stone', 'Mr. John Mentor', 'Anna Maria Smith', 'Cher'
    parts = full_name.strip().split()
    title = None

    # Detect title (first word)
    if parts and parts[0] in TITLES:
        title = parts[0]
        parts = parts[1:]  # Remove title from the list

    # If nothing left after removing title
    if len(parts) == 0:
        return title,  "", ""
    # If only one name left
    if len(parts) == 1:
        return title, parts[0], ""

    # First name = everything except last word
    first = " ".join(parts[:-1])
    last = parts[-1]
    return title, first, last

def migrate():
    with app.app_context():
        coaches = Coaches.query.all()

        for coach in coaches:
            title, first, last = split_name(coach.CoachName)

            coach.Title = title
            coach.FirstName = first
            coach.LastName = last

        db.session.commit()
        print("Migration completed: CoachName → Title + FirstName + LastName")

if __name__ == "__main__":
    migrate()