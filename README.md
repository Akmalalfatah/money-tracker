# Expense Tracker API

Deskripsi singkat
Aplikasi backend sederhana untuk mencatat pengeluaran per user. Terstruktur modular (data, controllers, routes). Diimplementasikan dengan Node.js + Express.

Prasyarat
Node.js v16+ dan npm

Instalasi
1. clone repo
2. jalankan
   npm install

Menjalankan server
npm start
Server berjalan di http://localhost:3000

Struktur proyek
data/expenses.js
controllers/expensesController.js
routes/expensesRoutes.js
index.js

Endpoints
GET /expenses
Query contoh: /expenses?userId=101&month=2025-11&category=food
Response: array expenses

GET /expenses/:id
Contoh: /expenses/1
Response: object expense atau 404

POST /expenses
Body (application/json):
{
  "userId": 101,
  "amount": 50000,
  "category": "food",
  "note": "sarapan",
  "date": "2025-11-27"
}
Response: 201 created

PUT /expenses/:id
Body: fields yang ingin diupdate (amount/category/note/date)
Response: 200 updated atau 404

DELETE /expenses/:id
Response: 200 { message: "deleted" } atau 404

GET /expenses/users/:userId/summary?month=2025-11
Contoh: /expenses/users/101/summary?month=2025-11
Response:
{
  "userId": "101",
  "month": "2025-11",
  "total": 125000,
  "byCategory": { "food": 50000, "transport": 75000 },
  "count": 2
}

Error handling
API mengembalikan status kode yang sesuai: 200, 201, 400, 404, 500


Licensi
MIT
