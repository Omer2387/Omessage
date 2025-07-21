from flask import Flask, request, jsonify
from flask_cors import CORS
import hashlib

app = Flask(__name__)
CORS(app)  # Allow access from your React Native app

# Dummy database (in a real app, use a real database)
users = {
    "omer": hashlib.sha256("bonbon".encode()).hexdigest(),  # hashed password
    "alice": hashlib.sha256("123456".encode()).hexdigest()
}

# Hashing function
def hash_password(password):
    return hashlib.sha256(password.encode()).hexdigest()

@app.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")

    if not username or not password:
        return jsonify({"success": False, "message": "Missing credentials"}), 400

    hashed_input = hash_password(password)
    stored_password = users.get(username)

    if stored_password and stored_password == hashed_input:
        return jsonify({"success": True, "message": f"Welcome, {username}"}), 200
    else:
        return jsonify({"success": False, "message": "Invalid username or password"}), 401

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)

