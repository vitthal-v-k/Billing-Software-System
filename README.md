# 🧾 Billing Software

A full-stack **Billing & Invoice Management System** built with **React.js** on the frontend and **Java Spring Boot** on the backend. It supports role-based access control (Admin & User), JWT authentication, category & item management, order processing, payment integration via Razorpay, and image storage via AWS S3.

---

## 🌟 Features

### 🔐 Authentication & Role-Based Access
- **JWT Authentication** — Secure login/logout with token-based auth
- **Role-Based Access Control (RBAC)** — Two roles: `ROLE_ADMIN` and `ROLE_USER`
- **Admin** (`vitthal@admin.com`) — Full control: manage items, categories, users, view all orders
- **Users** — Can browse and purchase items only; no access to management pages

### 👑 Admin Capabilities
- ➕ **Add/Delete Categories** with image upload to AWS S3
- ➕ **Add/Delete Items** with image upload, pricing & stock management
- 👥 **Manage Users** — Create/delete user accounts and assign roles
- 📊 **All Users Transaction History** — View every order across all users with **Placed By** (user name + email)
- 🗑️ **Delete items directly from Explore page** — Admin sees a delete button instead of add-to-cart

### 🛒 User Capabilities
- 🔍 **Explore & Browse** — Browse items by category
- 🛒 **Add to Cart & Place Orders** — Cash or UPI via Razorpay
- 📜 **Order History** — View their own past orders and payment status

### ⚙️ Core Features
- 📦 **Stock Management** — Auto-deduct stock on order; auto-delete item when stock reaches 0
- 💳 **Razorpay Payment Integration** — Online UPI payment processing
- ☁️ **AWS S3 Image Storage** — Upload and serve product/category images from the cloud
- 📊 **Dashboard** — Overview of business metrics
- 🔍 **Search & Filter** — Search orders by user name, customer, phone number or order ID

---

## 👤 Default Admin Account

| Field    | Value                  |
|----------|------------------------|
| Email    | `vitthal@admin.com`    |
| Password | `admin123`             |
| Role     | `ROLE_ADMIN`           |

> ⚠️ Change the admin password after first login for security.

---

## 📁 Project Structure

```
Billing Software/
├── frontend/                   → React + Vite (UI)
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Dashboard/      → Business overview & stats
│   │   │   ├── Login/          → Authentication page
│   │   │   ├── Explore/        → Browse items (admin: delete | user: add to cart)
│   │   │   ├── ManageCategory/ → Category CRUD (admin only)
│   │   │   ├── ManageItems/    → Item CRUD with image upload (admin only)
│   │   │   ├── ManageUsers/    → User management (admin only)
│   │   │   └── OrderHistory/   → Admin: all users' orders | User: own orders
│   │   ├── components/
│   │   │   ├── AdminRoute/     → Route guard for admin-only pages
│   │   │   ├── ProtectedRoute/ → Route guard for authenticated pages
│   │   │   └── ...             → Other reusable UI components
│   │   ├── context/            → React context (global state + role)
│   │   ├── Service/            → Axios API service calls
│   │   └── util/               → Helper utilities
│   └── package.json
│
└── backend/                    → Spring Boot + Maven (REST API)
    └── src/main/java/in/vittalkumar/billingsoftware/
        ├── controller/         → REST API endpoints
        │   ├── AuthController
        │   ├── CategoryController
        │   ├── ItemController
        │   ├── OrderController  → /orders/latest (user) | /orders/admin/all (admin)
        │   ├── PaymentController
        │   └── UserController
        ├── entity/             → JPA database models
        │   ├── UserEntity       → Stores role: ROLE_ADMIN | ROLE_USER
        │   ├── CategoryEntity
        │   ├── ItemEntity
        │   ├── OrderEntity      → Has userId to track who placed the order
        │   └── OrderItemEntity
        ├── service/            → Business logic layer
        ├── repository/         → Spring Data JPA repositories
        ├── config/             → Security & RBAC configuration
        ├── filter/             → JWT authentication filter
        ├── io/                 → Request/Response DTOs
        └── util/               → Utility classes
```

---

## 🛠 Tech Stack

| Layer        | Technology                               |
|--------------|------------------------------------------|
| **Frontend** | React 19, Vite, React Router DOM, Axios  |
| **Styling**  | Bootstrap 5, Bootstrap Icons, Custom CSS |
| **Backend**  | Java 21, Spring Boot 4, Maven            |
| **Database** | MySQL                                    |
| **ORM**      | Spring Data JPA / Hibernate              |
| **Auth**     | JWT (JSON Web Tokens) + Spring Security  |
| **RBAC**     | `ROLE_ADMIN` / `ROLE_USER`               |
| **Payments** | Razorpay (UPI & Cash)                    |
| **Storage**  | AWS S3 (ap-south-1)                      |
| **Lombok**   | Boilerplate reduction                    |

---

## ⚙️ Prerequisites

Make sure the following are installed on your machine:

- ✅ [Java 21](https://adoptium.net/)
- ✅ [Maven](https://maven.apache.org/) *(or use the included `mvnw` wrapper)*
- ✅ [Node.js & npm](https://nodejs.org/) *(v18+ recommended)*
- ✅ [MySQL](https://dev.mysql.com/downloads/) *(running locally)*

---

## 🗄️ Database Setup

1. Open MySQL and create the database:

```sql
CREATE DATABASE billing_app;
```

2. The tables will be **automatically created** by Spring Boot (JPA `ddl-auto=update`) on first run.

3. After running the backend, insert the default admin user:

```sql
INSERT INTO tbl_users (user_id, name, email, password, role, created_at, updated_at)
VALUES (
  UUID(),
  'Vitthal',
  'vitthal@admin.com',
  '$2a$10$TKAXtb6jJc3lWzLP9jFwre3urRvvhDpedmLbZQBSVEdEnxqPwLZmu',
  'ROLE_ADMIN',
  NOW(),
  NOW()
);
```

> 🔑 The above hash corresponds to the password `admin123`. Change it after first login.

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/vittal202/billing-software.git
cd billing-software
```

---

### 2. Configure the Backend

Open `backend/src/main/resources/application.properties` and update:

```properties
# Database
spring.datasource.url=jdbc:mysql://localhost:3306/billing_app
spring.datasource.username=root
spring.datasource.password=your_mysql_password

# AWS S3
aws.access.key=YOUR_AWS_ACCESS_KEY
aws.secret.key=YOUR_AWS_SECRET_KEY
aws.region=ap-south-1
aws.bucket.name=your-s3-bucket-name

# JWT
jwt.secret.key=your_jwt_secret_key

# Razorpay
razorpay.key.id=YOUR_RAZORPAY_KEY_ID
razorpay.key.secret=YOUR_RAZORPAY_KEY_SECRET
```

> ⚠️ **Never commit real credentials to GitHub!** Use environment variables or a `.env` file in production.

---

### 3. Run the Backend

```bash
cd backend
./mvnw spring-boot:run
```

> On Windows:
> ```powershell
> .\mvnw.cmd spring-boot:run
> ```

Backend starts at: **http://localhost:8080/api/v1.0**

---

### 4. Run the Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend starts at: **http://localhost:5173**

---

## 🔌 API Endpoints

### 🔓 Public (No Auth Required)
| Method | Endpoint               | Description            |
|--------|------------------------|------------------------|
| POST   | `/api/v1.0/login`      | User login             |
| POST   | `/api/v1.0/register`   | Register new user      |
| POST   | `/api/v1.0/encode`     | BCrypt encode password |

### 👤 User & Admin (JWT Required)
| Method | Endpoint                     | Description                         |
|--------|------------------------------|-------------------------------------|
| GET    | `/api/v1.0/categories`       | Get all categories                  |
| GET    | `/api/v1.0/items`            | Get all items                       |
| POST   | `/api/v1.0/orders`           | Place a new order                   |
| GET    | `/api/v1.0/orders/latest`    | Get current user's own orders       |
| POST   | `/api/v1.0/orders/verify`    | Verify Razorpay payment             |
| POST   | `/api/v1.0/payments`         | Initiate Razorpay payment           |

### 👑 Admin Only (JWT + ROLE_ADMIN Required)
| Method | Endpoint                          | Description                          |
|--------|-----------------------------------|--------------------------------------|
| POST   | `/api/v1.0/admin/categories`      | Add a new category                   |
| DELETE | `/api/v1.0/admin/categories/{id}` | Delete a category                    |
| POST   | `/api/v1.0/admin/items`           | Add a new item                       |
| DELETE | `/api/v1.0/admin/items/{id}`      | Delete an item                       |
| GET    | `/api/v1.0/users`                 | List all users                       |
| DELETE | `/api/v1.0/users/{id}`            | Delete a user                        |
| GET    | `/api/v1.0/orders/admin/all`      | Get ALL orders across all users      |

---

## 📸 Pages Overview

| Page                  | Admin View                              | User View                        |
|-----------------------|-----------------------------------------|----------------------------------|
| **Login**             | Sign in with admin credentials          | Sign in with user credentials    |
| **Dashboard**         | Business metrics overview               | Business metrics overview        |
| **Explore**           | Full-width view, 🗑️ delete button on items | Items grid with 🛒 add-to-cart |
| **Manage Items**      | ✅ Add/Delete items + image upload       | ❌ Access denied                 |
| **Manage Categories** | ✅ Add/Delete categories + image upload  | ❌ Access denied                 |
| **Manage Users**      | ✅ Create/Delete user accounts           | ❌ Access denied                 |
| **Order History**     | All users' orders with **Placed By** name | Own orders only                |

---

## 🔒 Security

- All API routes (except `/login`, `/register`, `/encode`) are protected with **JWT Bearer tokens**
- `/admin/**` endpoints require `ROLE_ADMIN` — returning `403 Forbidden` for regular users
- `/orders/admin/all` and user management endpoints require `ROLE_ADMIN`
- Tokens are stored in `localStorage` on the frontend
- Spring Security filters validate tokens on each request
- **Frontend route guards:**
  - `<ProtectedRoute>` — redirects unauthenticated users to `/login`
  - `<AdminRoute>` — redirects non-admin users to `/dashboard` with "Access denied" toast

---

## 📦 Build for Production

### Backend (JAR):
```bash
cd backend
./mvnw clean package -DskipTests
java -jar target/billingsoftware-0.0.1-SNAPSHOT.jar
```

### Frontend (Static Build):
```bash
cd frontend
npm run build
```

The output will be in `frontend/dist/`.

---

## 👨‍💻 Author

**Vittal Kumar**
- GitHub: [@vittal202](https://github.com/vittal202)

---

## 📄 License

This project is for educational and personal use.
