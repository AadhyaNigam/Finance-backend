# Finance Data Processing & Access Control Backend

A robust, cloud-connected REST API built for financial data management. This system features comprehensive Role-Based Access Control (RBAC), secure data persistence, and dedicated analytics endpoints serving a real-time frontend dashboard.

Built as a screening assignment demonstrating scalable backend architecture and clear authorization logic.

---

## 🚀 Live Demo & Dashboard
Once the server is running locally, navigate to `http://localhost:3000` to view the **Interactive Finance Dashboard**. The dashboard automatically fetches aggregated summaries (Total Income, Expenses, Net Balance) directly from the cloud database.

---

## 🛠️ Tech Stack
* **Runtime:** Node.js
* **Framework:** Express.js
* **Database:** MongoDB Atlas (Cloud Persistence)
* **ODM / Validation:** Mongoose
* **Security:** Custom Auth Middleware, CORS

---

## 🎯 Core Requirements Fulfilled

### 1. User & Role Management
Implemented a flexible schema with a strict `enum` for user roles. The system distinguishes between:
* **Viewer:** Read-only access to high-level dashboard summaries.
* **Analyst:** Can view detailed records and access deeper insights.
* **Admin:** Full CRUD authority over financial records and user states.

### 2. Financial Records Management
A complete CRUD suite for financial transactions. Records include `amount`, `type` (income/expense), `category`, and timestamp tracking.

### 3. Dashboard Summary APIs
Instead of relying on the frontend to calculate totals, the backend does the heavy lifting. The `/api/dashboard/summary` endpoint uses server-side data filtering and reduction to calculate Total Income, Total Expenses, and Net Balance efficiently before serving it to the client.

### 4. Access Control Logic (RBAC)
Implemented a custom `authorize()` middleware factory. Routes are protected declaratively by passing required roles (e.g., `app.get('/api/records', authorize(['Admin', 'Analyst']), ...)`). If a user lacks the required clearance, the server instantly rejects the request with a `403 Forbidden` status.

### 5. Validation and Error Handling
Input is strictly validated at the schema level using Mongoose. Required fields and data types are enforced. The API returns standardized JSON error messages with appropriate HTTP status codes (`400`, `403`, `500`) to prevent system crashes on bad input.

### 6. Cloud Data Persistence
Migrated from local storage to **MongoDB Atlas**. This ensures the data is highly available, geographically distributed, and persists safely across server restarts.

---

## 💻 Local Setup Instructions

**1. Clone the repository**
```bash
git clone [https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git](https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git)
cd finance-backend
```

**2. Install dependencies**

```bash
npm install
```

**3. Configure Environment Variables**

Create a .env file in the root directory and add your MongoDB Atlas connection string:

```Plaintext
MONGODB_URL=mongodb://<your_user>:<your_password>@cluster_address...
PORT=3000
```

**4. Seed the Database**

To instantly populate the cloud database with sample financial records for testing:

```bash
node seed.js
```

**5. Start the Server**

```bash
npm start
```
