# 🐾 Pet Counter API (Commission)

A simple **Node.js + Express** API for tracking and managing pet quantities using **MongoDB**.
It provides endpoints to increase, decrease, and fetch the quantity of a specific pet ID.

---

## 🚀 Features

* Increment or decrement a pet’s quantity
* Fetch current quantity by pet ID
* Auto-creates entries if they don’t exist (`upsert`)
* Uses MongoDB for persistent storage

---

## 🛠️ Tech Stack

* **Node.js**
* **Express**
* **MongoDB**
* **dotenv** for environment configuration

---

## ⚙️ Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/YOUR_USERNAME/pet-counter-api.git
   cd pet-counter-api
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the project root and add:

   ```bash
   MONGODB=your_mongodb_connection_string
   ```

4. Run the server:

   ```bash
   node index.js
   ```

Server will start at:
👉 `http://localhost:3000`

---

## 📡 API Endpoints

### `POST /api/counter/inc`

Increase quantity for a pet ID.

```json
{ "id": 1 }
```

### `POST /api/counter/dec`

Decrease quantity for a pet ID.

```json
{ "id": 1 }
```

### `POST /api/counter/get`

Get the current quantity.

```json
{ "id": 1 }
```

---

## 🧾 Example Response

```json
{
  "result": true,
  "quantity": 5
}
```

---

## 🐕 Notes

* Logs all requests with timestamps.
* Returns `0` if pet not found.
* Designed to be simple and easily extendable for small projects or games.

---

## 📄 License

MIT License © 2025 ReallAv0
