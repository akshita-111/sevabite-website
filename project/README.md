# SevaBite Full-Stack Website

Production-ready multi-page frontend with an Express + Oracle backend for donation and contact form handling.

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

### 1) Database setup (Oracle / SQL*Plus)
1. Open SQL*Plus.
2. Connect to the Oracle schema (user) you want to create tables in.
3. Run the SQL file `database/schema.sql`.

Example:
```sql
sqlplus your_user/your_password@localhost:1521/XEPDB1 @d:/sevabite-website/project/database/schema.sql
```

### 2) Backend setup
1. `cd backend`
2. `npm install`
3. Copy `.env.example` to `.env` and fill Oracle credentials.
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
