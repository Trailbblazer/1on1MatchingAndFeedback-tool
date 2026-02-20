from .base_validators import *

def validate_banned_to_meet(data):
    # Required fields
    require_fields(data, ["StartupId", "CoachId", "DateFrom"])

    # StartupId
    validate_int("StartupId", data["StartupId"], min_val=1)

    # CoachId
    validate_int("CoachId", data["CoachId"], min_val=1)

    # DateFrom
    date_from = validate_date("DateFrom", data["DateFrom"])

    # Optional: DateTo
    if "DateTo" in data and data["DateTo"] is not None:
        date_to = validate_date("DateTo", data["DateTo"])
        # Logical constraint: DateTo >= DateFrom
        if date_to < date_from:
            raise BadRequest({
                "error": "DateTo cannot be earlier than DateFrom",
                "DateFrom": data["DateFrom"],
                "DateTo": data["DateTo"]
            })

    # Optional: Reason
    if "Reason" in data and data["Reason"] is not None:
        validate_string("Reason", data["Reason"], min_len=1, max_len=2000)