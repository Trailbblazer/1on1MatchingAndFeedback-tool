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

    # StartupName
    validate_string("StartupName", data["StartupName"], min_len=2, max_len=100)

    # DateFeedbackOriginal
    validate_date("DateFeedbackOriginal", data["DateFeedbackOriginal"])

    # Grades (1–5)
    validate_int("StartupGrade", data["StartupGrade"], min_val=1, max_val=5)
    validate_int("CoachGrade", data["CoachGrade"], min_val=1, max_val=5)

    # Optional: UpdatedStartupGrade
    if "UpdatedStartupGrade" in data and data["UpdatedStartupGrade"] is not None:
        validate_int("UpdatedStartupGrade", data["UpdatedStartupGrade"], min_val=1, max_val=5)

    # Optional: DateUpdatedStartupGrade
    if "DateUpdatedStartupGrade" in data and data["DateUpdatedStartupGrade"] is not None:
        validate_date("DateUpdatedStartupGrade", data["DateUpdatedStartupGrade"])

    # Optional: StartupTextFeedback
    if "StartupTextFeedback" in data and data["StartupTextFeedback"] is not None:
        validate_string("StartupTextFeedback", data["StartupTextFeedback"], min_len=1, max_len=2000)

    # Optional: CoachTextFeedback
    if "CoachTextFeedback" in data and data["CoachTextFeedback"] is not None:
        validate_string("CoachTextFeedback", data["CoachTextFeedback"], min_len=1, max_len=2000)

    # Foreign keys
    validate_int("DailyFeedbackId", data["DailyFeedbackId"], min_val=1)
    validate_int("StartupId", data["StartupId"], min_val=1)
    validate_int("CoachId", data["CoachId"], min_val=1)