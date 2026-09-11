from flask import (
    Flask,
    jsonify,
    request,
    send_from_directory
)

from flask_cors import CORS

from models import (
    db,
    Hospital,
    Appointment
)

import os
import jwt
import datetime

from functools import wraps

from werkzeug.security import (
    generate_password_hash,
    check_password_hash
)


# ----------------------------------------------------
# Initialize Flask
# ----------------------------------------------------

app = Flask(__name__)


# ----------------------------------------------------
# CORS
# ----------------------------------------------------

CORS(
    app,
    resources={
        r"/api/*": {

            "origins": [
                "https://afya-link-care-xcg8.vercel.app",

                "http://localhost:5173",
                "http://127.0.0.1:5173",

                "http://localhost:8080",
                "http://127.0.0.1:8080",

                "http://192.168.100.4:8080"
            ],

            "methods": [
                "GET",
                "POST",
                "PUT",
                "DELETE",
                "OPTIONS"
            ],

            "allow_headers": [
                "Content-Type",
                "Authorization"
            ]
        }
    }
)


# ----------------------------------------------------
# Directories
# ----------------------------------------------------

BASE_DIR = os.path.abspath(
    os.path.dirname(__file__)
)

INSTANCE_DIR = os.path.join(
    BASE_DIR,
    "instance"
)

STATIC_DIR = os.path.join(
    BASE_DIR,
    "static"
)

DB_PATH = os.path.join(
    INSTANCE_DIR,
    "afyalink.db"
)

os.makedirs(
    INSTANCE_DIR,
    exist_ok=True
)

os.makedirs(
    STATIC_DIR,
    exist_ok=True
)


# ----------------------------------------------------
# Database
# ----------------------------------------------------

DATABASE_URL = os.environ.get(
    "DATABASE_URL"
)


if DATABASE_URL:

    # Render PostgreSQL compatibility
    if DATABASE_URL.startswith(
        "postgres://"
    ):

        DATABASE_URL = (
            DATABASE_URL.replace(
                "postgres://",
                "postgresql://",
                1
            )
        )

    app.config[
        "SQLALCHEMY_DATABASE_URI"
    ] = DATABASE_URL

else:

    app.config[
        "SQLALCHEMY_DATABASE_URI"
    ] = f"sqlite:///{DB_PATH}"


app.config[
    "SQLALCHEMY_TRACK_MODIFICATIONS"
] = False


# ----------------------------------------------------
# Secret Key
# ----------------------------------------------------

app.config[
    "SECRET_KEY"
] = os.environ.get(
    "SECRET_KEY",
    "change-this-secret-key"
)


# ----------------------------------------------------
# Payment Configuration
# ----------------------------------------------------

app.config[
    "TILL_NUMBER"
] = os.environ.get(
    "TILL_NUMBER",
    "123456"
)


app.config[
    "APPOINTMENT_FEE"
] = float(
    os.environ.get(
        "APPOINTMENT_FEE",
        "500"
    )
)


# ----------------------------------------------------
# Initialize Database
# ----------------------------------------------------

db.init_app(app)


# ----------------------------------------------------
# HOME
# ----------------------------------------------------

@app.route(
    "/",
    methods=["GET"]
)
def home():

    return jsonify({

        "message":
            "AfyaLink Care API is running",

        "status":
            "success"

    }), 200


# ----------------------------------------------------
# HEALTH
# ----------------------------------------------------

@app.route(
    "/api/health",
    methods=["GET"]
)
def health():

    return jsonify({

        "status":
            "healthy",

        "message":
            "AfyaLink Care backend is running"

    }), 200


# ----------------------------------------------------
# JWT DECORATOR
# ----------------------------------------------------

def token_required(f):

    @wraps(f)

    def decorated(
        *args,
        **kwargs
    ):

        token = None

        authorization = (
            request.headers.get(
                "Authorization"
            )
        )


        if authorization:

            try:

                parts = (
                    authorization.split()
                )

                if (
                    len(parts) == 2
                    and parts[0].lower()
                    == "bearer"
                ):

                    token = parts[1]

            except Exception:

                token = None


        if not token:

            return jsonify({

                "message":
                    "Token is missing"

            }), 401


        try:

            data = jwt.decode(

                token,

                app.config[
                    "SECRET_KEY"
                ],

                algorithms=[
                    "HS256"
                ]
            )


            current_user = (
                data["user"]
            )


        except jwt.ExpiredSignatureError:

            return jsonify({

                "message":
                    "Token has expired"

            }), 401


        except jwt.InvalidTokenError:

            return jsonify({

                "message":
                    "Token is invalid"

            }), 401


        except Exception as error:

            return jsonify({

                "message":
                    "Token validation failed",

                "error":
                    str(error)

            }), 401


        return f(
            current_user,
            *args,
            **kwargs
        )


    return decorated


# ----------------------------------------------------
# DEMO LOGIN
# ----------------------------------------------------

USER_DATA = {

    "username":
        "admin",

    "password":
        generate_password_hash(
            "password123"
        )
}


@app.route(
    "/api/login",
    methods=["POST"]
)
def login():

    data = (
        request.get_json(
            silent=True
        )
        or {}
    )


    username = data.get(
        "username"
    )

    password = data.get(
        "password"
    )


    if (
        not username
        or not password
    ):

        return jsonify({

            "message":
                "Username and password required"

        }), 400


    if (

        username
        != USER_DATA["username"]

        or

        not check_password_hash(

            USER_DATA[
                "password"
            ],

            password
        )
    ):

        return jsonify({

            "message":
                "Invalid credentials"

        }), 401


    token = jwt.encode(

        {

            "user":
                username,

            "exp":
                datetime.datetime.now(
                    datetime.timezone.utc
                )
                +
                datetime.timedelta(
                    hours=1
                )
        },

        app.config[
            "SECRET_KEY"
        ],

        algorithm="HS256"
    )


    return jsonify({

        "token":
            token

    }), 200


# ----------------------------------------------------
# STATIC FILES
# ----------------------------------------------------

@app.route(
    "/static/<path:filename>"
)
def serve_static(
    filename
):

    return send_from_directory(

        STATIC_DIR,

        filename
    )


# ----------------------------------------------------
# IMAGE URL HELPER
# ----------------------------------------------------

def make_absolute_image_url(
    image_url
):

    if not image_url:

        return ""


    image_url = str(
        image_url
    ).strip()


    if image_url.startswith(
        "https//"
    ):

        image_url = (
            image_url.replace(
                "https//",
                "https://",
                1
            )
        )


    elif image_url.startswith(
        "http//"
    ):

        image_url = (
            image_url.replace(
                "http//",
                "http://",
                1
            )
        )


    if (

        image_url.startswith(
            "http://"
        )

        or

        image_url.startswith(
            "https://"
        )

    ):

        return image_url


    if image_url.startswith(
        "photo-"
    ):

        return (
            "https://images.unsplash.com/"
            + image_url
        )


    return (

        request.host_url.rstrip(
            "/"
        )

        + "/static/"

        + image_url.lstrip(
            "/"
        )
    )


# ====================================================
# HOSPITAL ROUTES
# ====================================================


# ----------------------------------------------------
# GET ALL HOSPITALS
# ----------------------------------------------------

@app.route(
    "/api/hospitals",
    methods=["GET"]
)
def get_hospitals():

    hospitals = (
        Hospital.query.all()
    )

    result = []


    for hospital in hospitals:

        hospital_dict = (
            hospital.to_dict()
        )

        hospital_dict[
            "image_url"
        ] = (
            make_absolute_image_url(

                hospital_dict.get(
                    "image_url"
                )
            )
        )

        result.append(
            hospital_dict
        )


    return jsonify(
        result
    ), 200


# ----------------------------------------------------
# GET SINGLE HOSPITAL
# ----------------------------------------------------

@app.route(
    "/api/hospitals/<int:id>",
    methods=["GET"]
)
def get_hospital(id):

    hospital = (
        Hospital.query.get_or_404(
            id
        )
    )


    hospital_dict = (
        hospital.to_dict()
    )


    hospital_dict[
        "image_url"
    ] = (
        make_absolute_image_url(

            hospital_dict.get(
                "image_url"
            )
        )
    )


    return jsonify(

        hospital_dict

    ), 200


# ----------------------------------------------------
# CREATE HOSPITAL
# ----------------------------------------------------

@app.route(
    "/api/hospitals",
    methods=["POST"]
)

@token_required

def create_hospital(
    current_user
):

    data = (
        request.get_json(
            silent=True
        )
        or {}
    )


    required_fields = [

        "name",

        "location",

        "county"
    ]


    missing = [

        field

        for field
        in required_fields

        if not data.get(
            field
        )
    ]


    if missing:

        return jsonify({

            "error":

                "Missing required fields: "

                + ", ".join(
                    missing
                )

        }), 400


    new_hospital = Hospital(

        name=data[
            "name"
        ],

        location=data[
            "location"
        ],

        county=data[
            "county"
        ],

        description=data.get(
            "description"
        ),

        image_url=data.get(
            "image_url"
        ),

        phone=data.get(
            "phone"
        ),

        rating=data.get(
            "rating",
            0.0
        ),

        services=data.get(
            "services",
            []
        )
    )


    db.session.add(
        new_hospital
    )

    db.session.commit()


    hospital_dict = (
        new_hospital.to_dict()
    )


    hospital_dict[
        "image_url"
    ] = (
        make_absolute_image_url(

            hospital_dict.get(
                "image_url"
            )
        )
    )


    return jsonify(

        hospital_dict

    ), 201


# ----------------------------------------------------
# UPDATE HOSPITAL
# ----------------------------------------------------

@app.route(
    "/api/hospitals/<int:id>",
    methods=["PUT"]
)

@token_required

def update_hospital(
    current_user,
    id
):

    hospital = (
        Hospital.query.get_or_404(
            id
        )
    )


    data = (
        request.get_json(
            silent=True
        )
        or {}
    )


    hospital.name = data.get(

        "name",

        hospital.name
    )


    hospital.location = data.get(

        "location",

        hospital.location
    )


    hospital.county = data.get(

        "county",

        hospital.county
    )


    hospital.description = data.get(

        "description",

        hospital.description
    )


    hospital.image_url = data.get(

        "image_url",

        hospital.image_url
    )


    hospital.phone = data.get(

        "phone",

        hospital.phone
    )


    hospital.rating = data.get(

        "rating",

        hospital.rating
    )


    hospital.services = data.get(

        "services",

        hospital.services
    )


    db.session.commit()


    hospital_dict = (
        hospital.to_dict()
    )


    hospital_dict[
        "image_url"
    ] = (
        make_absolute_image_url(

            hospital_dict.get(
                "image_url"
            )
        )
    )


    return jsonify(

        hospital_dict

    ), 200


# ----------------------------------------------------
# DELETE HOSPITAL
# ----------------------------------------------------

@app.route(
    "/api/hospitals/<int:id>",
    methods=["DELETE"]
)

@token_required

def delete_hospital(
    current_user,
    id
):

    hospital = (
        Hospital.query.get_or_404(
            id
        )
    )


    db.session.delete(
        hospital
    )

    db.session.commit()


    return jsonify({

        "message":
            "Hospital deleted successfully"

    }), 200


# ====================================================
# APPOINTMENT ROUTES
# ====================================================


# ----------------------------------------------------
# CREATE APPOINTMENT
# ----------------------------------------------------

@app.route(
    "/api/appointments",
    methods=["POST"]
)
def create_appointment():

    data = (
        request.get_json(
            silent=True
        )
        or {}
    )


    required_fields = [

        "hospital_id",

        "name",

        "phone",

        "date",

        "time"
    ]


    missing = [

        field

        for field
        in required_fields

        if not data.get(
            field
        )
    ]


    if missing:

        return jsonify({

            "message":

                "Missing required fields: "

                + ", ".join(
                    missing
                )

        }), 400


    try:

        hospital_id = int(
            data[
                "hospital_id"
            ]
        )

    except (
        TypeError,
        ValueError
    ):

        return jsonify({

            "message":
                "Invalid hospital ID"

        }), 400


    hospital = db.session.get(

        Hospital,

        hospital_id
    )


    if not hospital:

        return jsonify({

            "message":
                "Hospital not found"

        }), 404


    # Always use backend amount
    # Never trust amount from frontend

    amount = app.config[
        "APPOINTMENT_FEE"
    ]


    appointment = Appointment(

        hospital_id=
            hospital_id,

        name=
            data["name"].strip(),

        phone=
            data["phone"].strip(),

        appointment_date=
            data["date"],

        appointment_time=
            data["time"],

        amount=
            amount,

        payment_status=
            "PENDING",

        appointment_status=
            "PENDING"
    )


    db.session.add(
        appointment
    )

    db.session.flush()


    appointment.payment_reference = (

        f"AFYALINK-"

        f"{appointment.id}"
    )


    db.session.commit()


    return jsonify({

        "message":
            "Appointment created successfully",

        "appointment":
            appointment.to_dict(),

        "appointment_id":
            appointment.id,

        "payment_status":
            appointment.payment_status,

        "appointment_status":
            appointment.appointment_status,

        "payment_reference":
            appointment.payment_reference,

        "till_number":
            app.config[
                "TILL_NUMBER"
            ],

        "amount":
            appointment.amount

    }), 201


# ----------------------------------------------------
# GET APPOINTMENT PAYMENT STATUS
# ----------------------------------------------------

@app.route(
    "/api/appointments/<int:appointment_id>/payment-status",
    methods=["GET"]
)
def get_payment_status(
    appointment_id
):

    appointment = db.session.get(

        Appointment,

        appointment_id
    )


    if not appointment:

        return jsonify({

            "message":
                "Appointment not found"

        }), 404


    return jsonify({

        "appointment_id":
            appointment.id,

        "payment_status":
            appointment.payment_status,

        "appointment_status":
            appointment.appointment_status,

        "payment_reference":
            appointment.payment_reference,

        "amount":
            appointment.amount,

        "mpesa_transaction_code":
            appointment.mpesa_transaction_code

    }), 200


# ----------------------------------------------------
# GET APPOINTMENT
# ----------------------------------------------------

@app.route(
    "/api/appointments/<int:appointment_id>",
    methods=["GET"]
)
def get_appointment(
    appointment_id
):

    appointment = db.session.get(

        Appointment,

        appointment_id
    )


    if not appointment:

        return jsonify({

            "message":
                "Appointment not found"

        }), 404


    return jsonify(

        appointment.to_dict()

    ), 200


# ====================================================
# M-PESA VALIDATION CALLBACK
# ====================================================

@app.route(
    "/api/payments/c2b/validation",
    methods=["POST"]
)
def mpesa_validation():

    data = (
        request.get_json(
            silent=True
        )
        or {}
    )


    print(
        "M-PESA VALIDATION:",
        data
    )


    # For production you can add
    # stricter validation here.

    return jsonify({

        "ResultCode":
            0,

        "ResultDesc":
            "Accepted"

    }), 200


# ====================================================
# M-PESA CONFIRMATION CALLBACK
# ====================================================

@app.route(
    "/api/payments/c2b/confirmation",
    methods=["POST"]
)
def mpesa_confirmation():

    data = (
        request.get_json(
            silent=True
        )
        or {}
    )


    print(
        "M-PESA CONFIRMATION:",
        data
    )


    # ------------------------------------------
    # COMMON C2B FIELDS
    # ------------------------------------------

    transaction_code = data.get(
        "TransID"
    )


    transaction_amount = data.get(
        "TransAmount"
    )


    phone = data.get(
        "MSISDN"
    )


    reference = data.get(
        "BillRefNumber"
    )


    # ------------------------------------------
    # BASIC VALIDATION
    # ------------------------------------------

    if not transaction_code:

        return jsonify({

            "ResultCode":
                1,

            "ResultDesc":
                "Missing transaction code"

        }), 400


    try:

        amount = float(
            transaction_amount
        )

    except (
        TypeError,
        ValueError
    ):

        return jsonify({

            "ResultCode":
                1,

            "ResultDesc":
                "Invalid amount"

        }), 400


    # ------------------------------------------
    # PREVENT DUPLICATE PAYMENT
    # ------------------------------------------

    existing_payment = (
        Appointment.query.filter_by(

            mpesa_transaction_code=
                transaction_code

        ).first()
    )


    if existing_payment:

        return jsonify({

            "ResultCode":
                0,

            "ResultDesc":
                "Payment already processed"

        }), 200


    appointment = None


    # ------------------------------------------
    # MATCH USING REFERENCE
    # ------------------------------------------

    if reference:

        appointment = (
            Appointment.query.filter_by(

                payment_reference=
                    reference,

                payment_status=
                    "PENDING"

            ).first()
        )


    # ------------------------------------------
    # FALLBACK:
    # MATCH PHONE + AMOUNT
    #
    # Useful for manual Till payments
    # when a reference is not returned.
    # ------------------------------------------

    if not appointment and phone:

        candidates = (

            Appointment.query.filter_by(

                phone=
                    phone,

                payment_status=
                    "PENDING",

                amount=
                    amount

            )

            .order_by(

                Appointment.created_at.desc()

            )

            .limit(
                2
            )

            .all()
        )


        # Only automatically match
        # when exactly one appointment exists.

        if len(candidates) == 1:

            appointment = (
                candidates[0]
            )


    # ------------------------------------------
    # NO SAFE MATCH
    # ------------------------------------------

    if not appointment:

        return jsonify({

            "ResultCode":
                0,

            "ResultDesc":

                "Payment received but no unique appointment match found"

        }), 200


    # ------------------------------------------
    # VERIFY AMOUNT
    # ------------------------------------------

    if amount != float(
        appointment.amount
    ):

        return jsonify({

            "ResultCode":
                0,

            "ResultDesc":

                "Payment received but amount does not match appointment"

        }), 200


    # ------------------------------------------
    # CONFIRM APPOINTMENT
    # ------------------------------------------

    appointment.payment_status = (
        "PAID"
    )


    appointment.appointment_status = (
        "CONFIRMED"
    )


    appointment.mpesa_transaction_code = (
        transaction_code
    )


    appointment.mpesa_phone = (
        phone
    )


    appointment.paid_amount = (
        amount
    )


    appointment.paid_at = (
        datetime.datetime.utcnow()
    )


    db.session.commit()


    print(

        "PAYMENT CONFIRMED:",

        appointment.id

    )


    return jsonify({

        "ResultCode":
            0,

        "ResultDesc":
            "Payment processed successfully"

    }), 200


# ====================================================
# ERROR HANDLERS
# ====================================================

@app.errorhandler(
    404
)
def not_found(
    error
):

    return jsonify({

        "error":
            "Endpoint not found",

        "path":
            request.path

    }), 404


@app.errorhandler(
    500
)
def internal_error(
    error
):

    db.session.rollback()


    return jsonify({

        "error":
            "Internal server error",

        "message":
            str(error)

    }), 500


# ====================================================
# CREATE DATABASE
# ====================================================

with app.app_context():

    db.create_all()


# ====================================================
# RUN SERVER
# ====================================================

if __name__ == "__main__":

    port = int(

        os.environ.get(

            "PORT",

            5000
        )
    )


    print(

        f"AfyaLink backend running on port {port}"

    )


    app.run(

        host="0.0.0.0",

        port=port,

        debug=False
    )