from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS
from models import db, Hospital
import os
import jwt
import datetime
from functools import wraps
from werkzeug.security import generate_password_hash, check_password_hash

# ----------------------------------------------------
# Initialize App
# ----------------------------------------------------
app = Flask(__name__)
CORS(app)

# ----------------------------------------------------
# Config
# ----------------------------------------------------
BASE_DIR = os.path.abspath(os.path.dirname(__file__))
INSTANCE_DIR = os.path.join(BASE_DIR, "instance")
STATIC_DIR = os.path.join(BASE_DIR, "static")  # For image files
DB_PATH = os.path.join(INSTANCE_DIR, "afyalink.db")

os.makedirs(INSTANCE_DIR, exist_ok=True)
os.makedirs(STATIC_DIR, exist_ok=True)

app.config["SQLALCHEMY_DATABASE_URI"] = f"sqlite:///{DB_PATH}"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["SECRET_KEY"] = "supersecretkey123"

db.init_app(app)

print("📁 Using database:", app.config["SQLALCHEMY_DATABASE_URI"])

# ----------------------------------------------------
# JWT Decorator
# ----------------------------------------------------
def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
        if "Authorization" in request.headers:
            try:
                token = request.headers["Authorization"].split()[1]
            except IndexError:
                pass

        if not token:
            return jsonify({"message": "Token is missing"}), 401

        try:
            data = jwt.decode(token, app.config["SECRET_KEY"], algorithms=["HS256"])
            current_user = data["user"]
        except Exception as e:
            return jsonify({"message": "Token is invalid", "error": str(e)}), 401

        return f(current_user, *args, **kwargs)
    return decorated

# ----------------------------------------------------
# Demo Authentication
# ----------------------------------------------------
USER_DATA = {"username": "admin", "password": generate_password_hash("password123")}

@app.route("/api/login", methods=["POST"])
def login():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")

    if not username or not password:
        return jsonify({"message": "Username and password required"}), 400

    if username != USER_DATA["username"] or not check_password_hash(USER_DATA["password"], password):
        return jsonify({"message": "Invalid credentials"}), 401

    token = jwt.encode(
        {"user": username, "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=1)},
        app.config["SECRET_KEY"],
        algorithm="HS256"
    )

    return jsonify({"token": token}), 200

# ----------------------------------------------------
# Serve Static Files (Images)
# ----------------------------------------------------
@app.route("/static/<path:filename>")
def serve_static(filename):
    """Serve static files from the /static folder (e.g., images)."""
    return send_from_directory(STATIC_DIR, filename)

# ----------------------------------------------------
# Helper Function: Fix Image URLs
# ----------------------------------------------------
def make_absolute_image_url(image_url: str):
    """Ensure all image URLs are absolute and valid."""
    if not image_url:
        return ""

    # Normalize malformed URLs like "https//" → "https://"
    if image_url.startswith("https//"):
        image_url = image_url.replace("https//", "https://", 1)
    elif image_url.startswith("http//"):
        image_url = image_url.replace("http//", "http://", 1)

    # Already a full valid URL
    if image_url.startswith("http://") or image_url.startswith("https://"):
        return image_url

    # Handle Unsplash-style partial IDs
    if image_url.startswith("photo-"):
        return f"https://images.unsplash.com/{image_url}"

    # Handle local static files
    return request.host_url.rstrip("/") + "/static/" + image_url.lstrip("/")

# ----------------------------------------------------
# Hospital Routes
# ----------------------------------------------------
@app.route("/api/hospitals", methods=["GET"])
def get_hospitals():
    hospitals = Hospital.query.all()
    result = []
    for h in hospitals:
        hospital_dict = h.to_dict()
        hospital_dict["image_url"] = make_absolute_image_url(hospital_dict.get("image_url"))
        result.append(hospital_dict)
    return jsonify(result), 200


@app.route("/api/hospitals/<int:id>", methods=["GET"])
def get_hospital(id):
    hospital = Hospital.query.get_or_404(id)
    hospital_dict = hospital.to_dict()
    hospital_dict["image_url"] = make_absolute_image_url(hospital_dict.get("image_url"))
    return jsonify(hospital_dict), 200


@app.route("/api/hospitals", methods=["POST"])
@token_required
def create_hospital(current_user):
    data = request.get_json()
    required_fields = ["name", "location", "county"]
    missing = [f for f in required_fields if not data.get(f)]
    if missing:
        return jsonify({"error": f"Missing required fields: {', '.join(missing)}"}), 400

    new_hospital = Hospital(
        name=data["name"],
        location=data["location"],
        county=data["county"],
        description=data.get("description"),
        image_url=data.get("image_url"),
        phone=data.get("phone"),
        rating=data.get("rating", 0.0),
    )
    db.session.add(new_hospital)
    db.session.commit()

    hospital_dict = new_hospital.to_dict()
    hospital_dict["image_url"] = make_absolute_image_url(hospital_dict.get("image_url"))
    return jsonify(hospital_dict), 201


@app.route("/api/hospitals/<int:id>", methods=["PUT"])
@token_required
def update_hospital(current_user, id):
    hospital = Hospital.query.get_or_404(id)
    data = request.get_json()

    hospital.name = data.get("name", hospital.name)
    hospital.location = data.get("location", hospital.location)
    hospital.county = data.get("county", hospital.county)
    hospital.description = data.get("description", hospital.description)
    hospital.image_url = data.get("image_url", hospital.image_url)
    hospital.phone = data.get("phone", hospital.phone)
    hospital.rating = data.get("rating", hospital.rating)

    db.session.commit()

    hospital_dict = hospital.to_dict()
    hospital_dict["image_url"] = make_absolute_image_url(hospital_dict.get("image_url"))
    return jsonify(hospital_dict), 200


@app.route("/api/hospitals/<int:id>", methods=["DELETE"])
@token_required
def delete_hospital(current_user, id):
    hospital = Hospital.query.get_or_404(id)
    db.session.delete(hospital)
    db.session.commit()
    return jsonify({"message": "Hospital deleted successfully"}), 200

# ----------------------------------------------------
# Run Server
# ----------------------------------------------------
if __name__ == "__main__":
    with app.app_context():
        db.create_all()

    port = int(os.environ.get("PORT", 5000))
    print(f"🚀 Server running on http://127.0.0.1:{port}")
    app.run(host="0.0.0.0", port=port)
