from .base_validators import *

def validate_banned_to_meet(data, is_patch=False):
    # Allowed fields
    ALLOWED_FIELDS = {"StartupId", "CoachId", "DateFrom", "DateTo", "Reason"}

    # Reject unknown fields
    for key in data.keys():
        if key not in ALLOWED_FIELDS:
            raise BadRequest({"error": f"Unknown field: {key}"})

    # Required fields
    REQUIRED_FIELDS = ["StartupId", "CoachId", "DateFrom"]

    if not is_patch:
        # POST: all required fields must be present
        require_fields(data, REQUIRED_FIELDS)
    else:
        # PATCH: must include at least one valid field
        if not any(field in data for field in ALLOWED_FIELDS):
            raise BadRequest({"error": "No valid fields provided for update"})

    # --------------------
    # Field validations
    # --------------------

    # StartupId
    if "StartupId" in data:
        validate_int("StartupId", data["StartupId"], min_val=1)

    # CoachId
    if "CoachId" in data:
        validate_int("CoachId", data["CoachId"], min_val=1)

    # DateFrom
    if "DateFrom" in data:
        date_from = validate_date("DateFrom", data["DateFrom"])
    else:
        date_from = None  # For PATCH logic

    # DateTo
    if "DateTo" in data and data["DateTo"] is not None:
        date_to = validate_date("DateTo", data["DateTo"])

        # Logical constraint: DateTo >= DateFrom
        if date_from is not None and date_to < date_from:
            raise BadRequest({
                "error": "DateTo cannot be earlier than DateFrom",
                "DateFrom": data["DateFrom"],
                "DateTo": data["DateTo"]
            })

    # Reason (free-text, emojis allowed)
    if "Reason" in data and data["Reason"] is not None:
        cleaned = validate_free_text("Reason", data["Reason"])
        validate_string("Reason", cleaned, min_len=1, max_len=500)
        data["Reason"] = cleaned

    return data