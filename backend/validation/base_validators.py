from datetime import datetime
from werkzeug.exceptions import BadRequest

# -----------------------------
# Generic Validation Helpers
# -----------------------------

def require_fields(data, required):
# Ensure required fields exist in the JSON body.
    missing = [f for f in required if f not in data]
    if missing:
        raise BadRequest({
            "error": "Missing required fields",
            "fields": missing
        })

def validate_string(field, value, min_len=1, max_len=255):
    # Validate string type and length
    if not isinstance(value, str):
        raise BadRequest({
            "error": f"{field} must be a string",
            "value": value
        })
    if not (min_len <= len(value) <= max_len):
        raise BadRequest({
            "error": f"{field} length must be between {min_len} and {max_len}",
            "actual_length": len(value)
        })

def validate_int(field, value, min_val=None, max_val=None):
    # Validate integer type and optional range.
    if not isinstance(value, int):
        raise BadRequest({
            "error": f"{field} must be an integer",
            "value": value
        })
    if min_val is not None and value < min_val:
        raise BadRequest({
            "error": f"{field} must be >= {min_val}",
            "value": value
        })
    if max_val is not None and value > max_val:
        raise BadRequest({
            "error": f"{field} must be <= {max_val}",
            "value": value
        })

def validate_bool(field, value):
    # Validate boolean type
    if not isinstance(value, bool):
        raise BadRequest({
            "error": f"{field} must be true or false",
            "value": value
        })

def validate_date(field, value):
    # Validate YYYY-MM-DD date format.
    try:
        return datetime.strptime(value, "%Y-%m-%d").date()
    except Exception:
        raise BadRequest({
            "error": f"{field} must be a valid date in YYYY-MM-DD format",
            "value": value
        })





