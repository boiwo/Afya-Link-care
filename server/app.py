from flask import Flask, jsonify, request
from flask_cors import CORS
from models import db, Hospital
import os

app = Flask(__name__)
CORS(app)

# ----------------------------------------------------
# ✅ Configure Database
# ----------------------------------------------------
BASE_DIR = os.path.abspath(os.path.dirname(__file__))
DB_PATH = os.path.join(BASE_DIR, "instance", "afyalink.db")

app.config["SQLALCHEMY_DATABASE_URI"] = f"sqlite:///{DB_PATH}"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
db.init_app(app)

print("📁 Using database:", app.config["SQLALCHEMY_DATABASE_URI"])

# ----------------------------------------------------
# ✅ Default Route
# ----------------------------------------------------
@app.route("/")
def home():
    return jsonify({"message": "Welcome to Afya Link Care API"}), 200

# ----------------------------------------------------
# ✅ Hospital CRUD Routes
# ----------------------------------------------------
@app.route("/api/hospitals", methods=["GET"])
def get_hospitals():
    hospitals = Hospital.query.all()
    return jsonify([h.to_dict() for h in hospitals]), 200

@app.route("/api/hospitals/<int:id>", methods=["GET"])
def get_hospital(id):
    hospital = Hospital.query.get_or_404(id)
    return jsonify(hospital.to_dict()), 200

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
    return jsonify(new_hospital.to_dict()), 201

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
    return jsonify(hospital.to_dict()), 200

@app.route("/api/hospitals/<int:id>", methods=["DELETE"])
def delete_hospital(id):
    hospital = Hospital.query.get_or_404(id)
    db.session.delete(hospital)
    db.session.commit()
    return jsonify({"message": "Hospital deleted successfully"}), 200


if __name__ == "__main__":
    os.makedirs(os.path.join(BASE_DIR, "instance"), exist_ok=True)
    with app.app_context():
        db.create_all()

    app.run(host="0.0.0.0", port=int(os.environ.get("PORT", 5000)))
