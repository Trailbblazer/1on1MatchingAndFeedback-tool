from .base_validators import *

def validate_daily_feedback(data):
    # Required fields
    require_fields(data, ["Date", "StartupId", "CoachId"])

    # Date
    validate_date("Date", data["Date"])

    # StartupId
    validate_int("StartupId", data["StartupId"], min_val=1)

    # CoachId
    validate_int("CoachId", data["CoachId"], min_val=1)

    # Optional: FeedbackText
    if "FeedbackText" in data and data["FeedbackText"] is not None:
        validate_string("FeedbackText", data["FeedbackText"], min_len=1, max_len=2000)