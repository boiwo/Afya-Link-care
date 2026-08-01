# Afya-Link-Care

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)
[![Platform](https://img.shields.io/badge/Platform-Web-blue.svg)]()

Afya-Link-Care is a full-stack healthcare platform connecting users with trusted hospitals and clinics across Kenya. Users can browse facilities, view offered services, read reviews, and find contact details seamlessly.

---

## 🚀 Features

- 🏥 **Hospital Directory:** Browse registered hospitals and clinics with detailed profiles.
- 🩺 **Services Overview:** View specialized services (e.g., Maternity, Dental, Emergency) and estimated costs.
- ⭐ **Ratings & Reviews:** Check overall hospital ratings and read community feedback.
- 📱 **Responsive Design:** Optimized experience for mobile, tablet, and desktop viewports.
- 🛡️ **Robust API:** Powered by a lightweight Flask RESTful backend with proper error handling.

---

## 🛠️ Tech Stack

- **Frontend:** React, TypeScript, Tailwind CSS, Vite
- **Backend:** Python, Flask, Flask-RESTful
- **Database:** SQLite (Development) / PostgreSQL (Production)
- **API Styling:** RESTful APIs

---

## 📊 Database Schema

Below is the entity-relationship diagram representing the relational database design for Afya-Link-Care:

![Afya-Link-Care Database Schema](./assets/database-schema.png)

> 💡 **About the Schema:** This structure implements a clean many-to-many relationship between `hospitals` and `services` using the `hospital_services` join table, and links user `reviews` directly to each hospital.

---

## 📁 Folder Structure

```text
Afya-Link-Care/
├── assets/                 # Project assets (diagrams, images)
│   └── database-schema.png
├── client/                 # React Frontend
│   ├── public/
│   ├── src/
│   │   ├── components/     # Reusable UI Components
│   │   ├── pages/          # Page Views (Home, HospitalDetails)
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── package.json
│   └── vite.config.ts
├── server/                 # Flask Backend
│   ├── app.py              # Application Entry Point
│   ├── models.py           # Database Models (SQLAlchemy)
│   ├── requirements.txt    # Python Dependencies
│   └── instance/           # Local SQLite Database
├── README.md
└── .gitignore