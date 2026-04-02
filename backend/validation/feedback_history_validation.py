from .base_validators import *

def validate_feedback_history(data):
    # Required fields
    require_fields(data, [
        "StartupName",
        "DateFeedbackOriginal",
        "StartupGrade",
        "CoachGrade",
        "DailyFeedbackId",
        "StartupId",
        "CoachId"
    ])

    # StartupName (Unicode, numbers, and symbols allowed)
    cleaned_name = strip_whitespace(data["StartupName"])
    validate_startup_name("StartupName", cleaned_name, min_len=1, max_len=100)
    data["StartupName"] = cleaned_name

    # DateFeedbackOriginal
    validate_date("DateFeedbackOriginal", data["DateFeedbackOriginal"])

    # Grades
    validate_int("StartupGrade", data["StartupGrade"], min_val=1, max_val=5)
    validate_int("CoachGrade", data["CoachGrade"], min_val=1, max_val=5)

    # Optional: UpdatedStartupGrade
    if "UpdatedStartupGrade" in data and data["UpdatedStartupGrade"] is not None:
        validate_int("UpdatedStartupGrade", data["UpdatedStartupGrade"], min_val=1, max_val=5)

    # Optional: DateUpdatedStartupGrade
    if "DateUpdatedStartupGrade" in data and data["DateUpdatedStartupGrade"] is not None:
        validate_date("DateUpdatedStartupGrade", data["DateUpdatedStartupGrade"])

    # Optional: StartupTextFeedback (free text, emojis allowed)
    if "StartupTextFeedback" in data and data["StartupTextFeedback"] is not None:
        cleaned = validate_free_text("StartupTextFeedback", data["StartupTextFeedback"])
        validate_string("StartupTextFeedback", cleaned, min_len=1, max_len=2000)
        data["StartupTextFeedback"] = cleaned

    # Optional: CoachTextFeedback (free text, emojis allowed)
    if "CoachTextFeedback" in data and data["CoachTextFeedback"] is not None:
        cleaned = validate_free_text("CoachTextFeedback", data["CoachTextFeedback"])
        validate_string("CoachTextFeedback", cleaned, min_len=1, max_len=2000)
        data["CoachTextFeedback"] = cleaned

    # Foreign keys
    validate_int("DailyFeedbackId", data["DailyFeedbackId"], min_val=1)
    validate_int("StartupId", data["StartupId"], min_val=1)
    validate_int("CoachId", data["CoachId"], min_val=1)

    return data