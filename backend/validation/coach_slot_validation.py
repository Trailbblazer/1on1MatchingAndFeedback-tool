from .base_validators import *

def validate_coach_slot(data):
    # Required fields
    require_fields(data, ["CoachId", "Slot", "Duration", "Date", "IsBreak"])

    # CoachId
    validate_int("CoachId", data["CoachId"], min_val=1)

    # Slot
    data["Slot"] = validate_slot("Slot", data["Slot"])

    # Duration
    validate_int("Duration", data["Duration"], min_val=1, max_val=240)

    # Date
    validate_date("Date", data["Date"])

    # IsBreak
    validate_bool("IsBreak", data["IsBreak"])

    return data