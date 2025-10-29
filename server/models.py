from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Hospital(db.Model):
    __tablename__ = "hospitals"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    location = db.Column(db.String(120), nullable=False)
    county = db.Column(db.String(120), nullable=False)
    description = db.Column(db.Text)
    image_url = db.Column(db.String(255))
    phone = db.Column(db.String(20))
    rating = db.Column(db.Float, default=0.0)

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "location": self.location,
            "county": self.county,
            "description": self.description,
            "image_url": self.image_url,
            "phone": self.phone,
            "rating": self.rating,
        }