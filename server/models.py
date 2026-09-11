from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()


# =====================================================
# HOSPITAL MODEL
# =====================================================

class Hospital(db.Model):
    __tablename__ = "hospitals"

    id = db.Column(
        db.Integer,
        primary_key=True
    )

    name = db.Column(
        db.String(120),
        nullable=False
    )

    location = db.Column(
        db.String(120),
        nullable=False
    )

    county = db.Column(
        db.String(120),
        nullable=False
    )

    description = db.Column(
        db.Text
    )

    image_url = db.Column(
        db.String(255)
    )

    phone = db.Column(
        db.String(20)
    )

    rating = db.Column(
        db.Float,
        default=0.0
    )

    # Relationship with appointments
    appointments = db.relationship(
        "Appointment",
        backref="hospital",
        lazy=True,
        cascade="all, delete-orphan"
    )

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


# =====================================================
# APPOINTMENT MODEL
# =====================================================

class Appointment(db.Model):
    __tablename__ = "appointments"

    id = db.Column(
        db.Integer,
        primary_key=True
    )

    # -----------------------------------------------
    # HOSPITAL
    # -----------------------------------------------

    hospital_id = db.Column(
        db.Integer,
        db.ForeignKey(
            "hospitals.id"
        ),
        nullable=False
    )

    # -----------------------------------------------
    # PATIENT INFORMATION
    # -----------------------------------------------

    name = db.Column(
        db.String(150),
        nullable=False
    )

    phone = db.Column(
        db.String(30),
        nullable=False
    )

    # -----------------------------------------------
    # APPOINTMENT DETAILS
    # -----------------------------------------------

    appointment_date = db.Column(
        db.String(30),
        nullable=False
    )

    appointment_time = db.Column(
        db.String(30),
        nullable=False
    )

    # -----------------------------------------------
    # PAYMENT
    # -----------------------------------------------

    amount = db.Column(
        db.Float,
        nullable=False,
        default=500
    )

    payment_status = db.Column(
        db.String(30),
        nullable=False,
        default="PENDING"
    )

    appointment_status = db.Column(
        db.String(30),
        nullable=False,
        default="PENDING"
    )

    # Unique appointment payment reference
    payment_reference = db.Column(
        db.String(100),
        unique=True,
        nullable=True
    )

    # -----------------------------------------------
    # M-PESA PAYMENT DETAILS
    # -----------------------------------------------

    mpesa_transaction_code = db.Column(
        db.String(100),
        unique=True,
        nullable=True
    )

    mpesa_phone = db.Column(
        db.String(30),
        nullable=True
    )

    paid_amount = db.Column(
        db.Float,
        nullable=True
    )

    paid_at = db.Column(
        db.DateTime,
        nullable=True
    )

    # -----------------------------------------------
    # CREATED DATE
    # -----------------------------------------------

    created_at = db.Column(
        db.DateTime,
        default=datetime.utcnow
    )

    # -----------------------------------------------
    # CONVERT TO JSON
    # -----------------------------------------------

    def to_dict(self):
        return {
            "id": self.id,

            "hospital_id": self.hospital_id,

            "name": self.name,

            "phone": self.phone,

            "date": self.appointment_date,

            "time": self.appointment_time,

            "amount": self.amount,

            "payment_status": self.payment_status,

            "appointment_status": self.appointment_status,

            "payment_reference": self.payment_reference,

            "mpesa_transaction_code": self.mpesa_transaction_code,

            "mpesa_phone": self.mpesa_phone,

            "paid_amount": self.paid_amount,

            "paid_at": (
                self.paid_at.isoformat()
                if self.paid_at
                else None
            ),

            "created_at": (
                self.created_at.isoformat()
                if self.created_at
                else None
            ),
        }