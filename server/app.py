from flask import Flask, jsonify, request, url_for
from flask_cors import CORS
from models import db, Hospital
import os

app = Flask(__name__)
CORS(app)

# ----------------------------------------------------
# Configure Database
# ----------------------------------------------------
BASE_DIR = os.path.abspath(os.path.dirname(__file__))
INSTANCE_DIR = os.path.join(BASE_DIR, "instance")
DB_PATH = os.path.join(INSTANCE_DIR, "afyalink.db")
os.makedirs(INSTANCE_DIR, exist_ok=True)

app.config["SQLALCHEMY_DATABASE_URI"] = f"sqlite:///{DB_PATH}"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
db.init_app(app)

print("📁 Using database:", app.config["SQLALCHEMY_DATABASE_URI"])

# ----------------------------------------------------
# Default Route
# ----------------------------------------------------
@app.route("/")
def home():
    return jsonify({"message": "Welcome to Afya Link Care API"}), 200

# ----------------------------------------------------
# Hospital CRUD
# ----------------------------------------------------
def make_absolute_image_url(image_url: str):
    if image_url:
        return request.host_url.rstrip("/") + image_url
    return ""

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
def create_hospital():
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
def update_hospital(id):
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
def delete_hospital(id):
    hospital = Hospital.query.get_or_404(id)
    db.session.delete(hospital)
    db.session.commit()
    return jsonify({"message": "Hospital deleted successfully"}), 200

# ----------------------------------------------------
# Serve Images from static folder
# ----------------------------------------------------
# Place images in server/static/images/
# Example in seed.py: image_url="/static/images/st_mary.jpg"

# ----------------------------------------------------
# Run Server
# ----------------------------------------------------
if __name__ == "__main__":
    with app.app_context():
        db.create_all()  # Create tables if missing

    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)
