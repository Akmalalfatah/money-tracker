# Expense Tracker API

Aplikasi backend sederhana untuk mencatat pengeluaran pengguna. Dibangun dengan Node.js + Express dan dipisah modular (data, controllers, routes).

---

# 📌 1. Persiapan Project

## Install Dependencies
Jalankan perintah berikut di terminal:

```
npm install
```

---

# 📌 2. Start Server

Gunakan perintah berikut untuk menjalankan server:

```
npm start
```

Jika berhasil, terminal akan menampilkan:

```
Server running on port 3000
```

**Placeholder image:**
![server-start](./images/start-server.png)

---

# 📌 3. Endpoints API


## **GET /expenses/:id**
Mengambil 1 item berdasarkan ID.


**Placeholder:**
![get-by-id](./images/get-by-id.png)

---

## **POST /expenses**
Membuat data pengeluaran baru.

**Placeholder:**
![post-create](./images/post.png)

---

## **PUT /expenses/:id**
Mengupdate data pengeluaran.

**Placeholder:**
![put-update](./images/edit.png)

---

## **GET /expenses**
Melihat semua data setelah PUT

**Placeholder:**
![post-create](./images/get-by-id-after-edit.png)

---

## **DELETE /expenses/:id**
Menghapus data.

**Placeholder:**
![delete-expense](./images/delete.png)

---

## **GET /expenses**
Melihat semua data setelah DELETE

**Placeholder:**
![post-create](./images/get-by-id-after-delete.png)

---

# 📌 4. Features

## **Keamanan Data**
Request secara rate limiter

**Placeholder**
![post-create](./images/rate-limiter.png)

---

## **PUT Seluruh Data**
Mengedit/menambahkan dengan seluruh data

**Placeholder**
![post-create](./images/put-all.png)

---

## **Filter Mencari Data**
Filter data. Misal filter dengan keyword 'nasi'

**Placeholder**
![post-create](./images/filter-keyword.png)

---