from .base_validators import *

def validate_daily_feedback(data, is_patch=False):
    # Allowed fields
    ALLOWED_FIELDS = {"FeedbackText", "Date", "StartupId", "CoachId"}

    # Reject unknown fields
    for key in data.keys():
        if key not in ALLOWED_FIELDS:
            raise BadRequest({"error": f"Unknown field: {key}"})

    # Required fields
    REQUIRED_FIELDS = ["Date", "StartupId", "CoachId"]

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

    # Date
    if "Date" in data:
        validate_date("Date", data["Date"])

    # StartupId
    if "StartupId" in data:
        validate_int("StartupId", data["StartupId"], min_val=1)

    # CoachId
    if "CoachId" in data:
        validate_int("CoachId", data["CoachId"], min_val=1)

    # FeedbackText (free text, emojis allowed)
    if "FeedbackText" in data and data["FeedbackText"] is not None:
        cleaned = validate_free_text("FeedbackText", data["FeedbackText"])
        validate_string("FeedbackText", cleaned, min_len=1, max_len=2000)
        data["FeedbackText"] = cleaned

    return data