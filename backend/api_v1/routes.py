from flask import Blueprint, jsonify

api_v1 = Blueprint('api_v1', __name__)

@api_v1.route('/match', methods=['POST'])
def match():
    return jsonify({"message": "Match endpoint working"})

@api_v1.route('/feedback/<int:startup_id>', methods=['GET'])
def feedback(startup_id):
    return jsonify({"message": f"Feedback for startup {startup_id}"})

@api_v1.route('/availability/<int:coach_id>', methods=['GET'])
def availability(coach_id):
    return jsonify({"message": f"Availability for coach {coach_id}"})

@api_v1.route('/startup/<int:id>', methods=['PATCH'])
def update_startup(id):
    return jsonify({"message": f"Startup {id} updated"})