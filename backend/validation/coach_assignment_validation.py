from .base_validators import *

def validate_coach_assignment(data):
    # Required fields
    require_fields(data, [
        "StartupName",
        "Slot",
        "Duration",
        "Date",
        "CoachId",
        "StartupId",
        "SlotId"
    ])

    # StartupName
    validate_string("StartupName", data["StartupName"], min_len=2, max_len=100)

    # Slot
    validate_string("Slot", data["Slot"], min_len=2, max_len=50)

    # Duration
    validate_int("Duration", data["Duration"], min_val=1, max_val=240)

    # Date
    validate_date("Date", data["Date"])

    # Foreign keys (must be positive integers)
    validate_int("CoachId", data["CoachId"], min_val=1)
    validate_int("StartupId", data["StartupId"], min_val=1)
    validate_int("SlotId", data["SlotId"], min_val=1)