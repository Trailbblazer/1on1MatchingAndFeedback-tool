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

    # StartupName (Unicode, numbers, and symbols)
    cleaned_name = strip_whitespace(data["StartupName"])
    validate_startup_name("StartupName", cleaned_name, min_len=1, max_len=100)
    data["StartupName"] = cleaned_name

    # Slot
    data["Slot"] = validate_slot("Slot", data["Slot"])

    # Duration
    validate_int("Duration", data["Duration"], min_val=1, max_val=240)

    # Date
    validate_date("Date", data["Date"])

    # Foreign keys (must be positive integers)
    validate_int("CoachId", data["CoachId"], min_val=1)
    validate_int("StartupId", data["StartupId"], min_val=1)
    validate_int("SlotId", data["SlotId"], min_val=1)

    return data