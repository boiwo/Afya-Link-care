# Afya-Link-Care

Afya-Link-Care is a full-stack healthcare platform connecting users with trusted hospitals and clinics across Kenya. Users can browse hospitals, view services, and contact facilities directly.

---

## Features

- Browse hospitals and clinics with detailed information
- Hospital ratings and services overview
- Responsive design for mobile and desktop
- Error handling and loading states
- Full-stack implementation with React (frontend) and Flask (backend)

---

## Tech Stack

- **Frontend:** React, TypeScript, Tailwind CSS
- **Backend:** Python, Flask, Flask-RESTful
- **Database:** SQLite / PostgreSQL (depending on setup)
- **API:** RESTful endpoints

---

## Installation

1. **Clone the repository**

```bash
git clone git@github.com:boiwo/Afya-Link-care.git
cd Afya-Link-care

Backend setup

cd server
python -m venv venv
source venv/bin/activate   # On Windows: venv\Scripts\activate
pip install -r requirements.txt
flask run

Frontend setup

cd ../client
npm install
npm run dev

Open the frontend app in your browser (usually at http://localhost:5173)

Browse hospitals, view details, and explore services

The frontend fetches data from the backend API (http://127.0.0.1:5000/api/hospitals)


Folder Structure

Afya-Link-Care/
├─ client/        # React frontend
├─ server/        # Flask backend
├─ README.md
├─ .gitignore

License

This project is licensed under the MIT License.


✅ This `README.md` covers **project overview, features, tech stack, setup, usage, structure, and contributing instructions**.  

---

If you want, I can also **add badges for GitHub stars, issues, and npm version** to make it look more professional.  

Do you want me to do that?
