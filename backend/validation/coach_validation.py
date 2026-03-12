from .base_validators import *
from werkzeug.exceptions import BadRequest
def validate_coach(data, is_patch=False):
    # Allowed fields

    ALLOWED_FIELDS = {
        "Title",
        "FirstName",
        "LastName",
        "Email",
        "Phone",
        "Chat",
        "Bio",
        "Expertise",
        "SocialMedia",
        "CoachingSessions",
        "BatchesCoached"
    }

    # Reject unknown fields
    for key in data.keys():
        if key not in ALLOWED_FIELDS:
            raise BadRequest({"error": f"Unknown field: {key}"})

    # Required fields (for POST)
    if not is_patch:
        REQUIRED_FIELDS = ["FirstName", "LastName", "Email"]
        require_fields(data, REQUIRED_FIELDS)
    else:
        # PATCH: must include at least one valid field
        if not any(field in data for field in ALLOWED_FIELDS):
            raise BadRequest({"error": "No valid fields provided for update"})

    # --------------------
    # Field validations
    # --------------------

        # Title (optional)
        if "Title" in data and data["Title"] is not None:
            validate_string("Title", data["Title"], min_len=2, max_len=20)

        # FirstName
        if "FirstName" in data:
            validate_string("FirstName", data["FirstName"], min_len=1, max_len=60)

        # LastName
        if "LastName" in data:
            validate_string("LastName", data["LastName"], min_len=1, max_len=60)

    # Email
    if "Email" in data:
        validate_string("Email", data["Email"], min_len=5, max_len=100)
        if "@" not in data["Email"] or "." not in data["Email"]:
            raise BadRequest({"error": "Invalid email format"})

    # Phone
    if "Phone" in data and data["Phone"] is not None:
        validate_string("Phone", data["Phone"], min_len=3, max_len=100)

    # Chat
    if "Chat" in data and data["Chat"] is not None:
        validate_string("Chat", data["Chat"], min_len=2, max_len=100)

    # Bio
    if "Bio" in data and data["Bio"] is not None:
        validate_string("Bio", data["Bio"], min_len=1, max_len=500)

    # Expertise
    if "Expertise" in data and data["Expertise"] is not None:
        validate_string("Expertise", data["Expertise"], min_len=2, max_len=200)

    # SocialMedia (must be a dict)
    if "SocialMedia" in data and data["SocialMedia"] is not None:
        if not isinstance(data["SocialMedia"], dict):
            raise BadRequest({"error": "SocialMedia must be an object"})

    # CoachingSessions
    if "CoachingSessions" in data:
        validate_int("CoachingSessions", data["CoachingSessions"], min_val=0)

    # BatchesCoached
    if "BatchesCoached" in data:
        validate_int("BatchesCoached", data["BatchesCoached"], min_val=0)