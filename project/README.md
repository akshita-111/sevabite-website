# SevaBite Full-Stack Website

Production-ready multi-page frontend with an Express + MySQL backend for donation and contact form handling.

## Folder Structure

project/
├── frontend/
│   ├── index.html
│   ├── about.html
│   ├── services.html
│   ├── donate.html
│   ├── contact.html
│   ├── css/
│   │   └── styles.css
│   ├── js/
│   │   ├── main.js
│   │   └── forms.js
│   └── assets/
├── backend/
│   ├── server.js
│   ├── .env.example
│   ├── package.json
│   ├── routes/
│   │   ├── donations.js
│   │   └── contacts.js
│   └── models/
│       └── db.js
└── database/
    └── schema.sql

## Setup Instructions

### 1) Database setup (MySQL)
1. Open MySQL client and run `database/schema.sql`.
2. Confirm database name is `sevabite_db` (or update `.env`).

### 2) Backend setup
1. `cd backend`
2. `npm install`
3. Copy `.env.example` to `.env` and fill DB credentials.
4. `npm run dev` or `npm start`

### 3) Frontend setup
Use any static server:
- `cd frontend`
- `python -m http.server 5500`

Open `http://localhost:5500`.

## API Endpoints
- `POST /api/donations` body: `{ name, email, amount, message }`
- `POST /api/contacts` body: `{ name, email, message }`
- `GET /api/health`
