# 🧾 Billing Software

A full-stack **Billing & Invoice Management System** built with **React.js** on the frontend and **Java Spring Boot** on the backend. It supports user authentication, category & item management, order processing, payment integration via Razorpay, and image storage via AWS S3.

---

## 🌟 Features

- 🔐 **JWT Authentication** — Secure login/logout with token-based auth
- 👥 **User Management** — Admin can manage users and roles
- 📦 **Category & Item Management** — Add, update, delete categories and items with image upload
- 🛒 **Order Management** — Create and track customer orders
- 💳 **Razorpay Payment Integration** — Online payment processing
- ☁️ **AWS S3 Image Storage** — Upload and serve product images from the cloud
- 📊 **Dashboard** — Overview of business metrics
- 📜 **Order History** — View past orders and billing records

---

## 📁 Project Structure

```
Billing Software/
├── frontend/                   → React + Vite (UI)
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Dashboard/      → Business overview & stats
│   │   │   ├── Login/          → Authentication page
│   │   │   ├── Explore/        → Browse items
│   │   │   ├── ManageCategory/ → Category CRUD
│   │   │   ├── ManageItems/    → Item CRUD with image upload
│   │   │   ├── ManageUsers/    → User management (admin)
│   │   │   └── OrderHistory/   → Past orders & invoices
│   │   ├── components/         → Reusable UI components
│   │   ├── context/            → React context (global state)
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
        │   ├── OrderController
        │   ├── PaymentController
        │   └── UserController
        ├── entity/             → JPA database models
        │   ├── UserEntity
        │   ├── CategoryEntity
        │   ├── ItemEntity
        │   ├── OrderEntity
        │   └── OrderItemEntity
        ├── service/            → Business logic layer
        ├── repository/         → Spring Data JPA repositories
        ├── config/             → Security & app configuration
        ├── filter/             → JWT authentication filter
        ├── io/                 → Request/Response DTOs
        └── util/               → Utility classes
```

---

## 🛠 Tech Stack

| Layer        | Technology                               |
|--------------|------------------------------------------|
| **Frontend** | React 19, Vite, React Router DOM, Axios  |
| **Styling**  | Bootstrap 5, Bootstrap Icons             |
| **Backend**  | Java 21, Spring Boot 4, Maven            |
| **Database** | MySQL                                    |
| **ORM**      | Spring Data JPA / Hibernate              |
| **Auth**     | JWT (JSON Web Tokens)                    |
| **Payments** | Razorpay                                 |
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

| Method | Endpoint                     | Description               |
|--------|------------------------------|---------------------------|
| POST   | `/api/v1.0/auth/login`       | User login                |
| POST   | `/api/v1.0/auth/register`    | Register new user         |
| GET    | `/api/v1.0/category/list`    | Get all categories        |
| POST   | `/api/v1.0/category/create`  | Create a category         |
| GET    | `/api/v1.0/item/list`        | Get all items             |
| POST   | `/api/v1.0/item/create`      | Create an item            |
| GET    | `/api/v1.0/order/list`       | Get all orders            |
| POST   | `/api/v1.0/order/create`     | Place a new order         |
| POST   | `/api/v1.0/payment/create`   | Initiate Razorpay payment |
| GET    | `/api/v1.0/user/list`        | Get all users (admin)     |

---

## 📸 Pages Overview

| Page                  | Description                                    |
|-----------------------|------------------------------------------------|
| **Login**             | User authentication with JWT                   |
| **Dashboard**         | Summary cards with key business metrics        |
| **Explore**           | Browse available items by category             |
| **Manage Items**      | Add/Edit/Delete items with image upload to S3  |
| **Manage Categories** | CRUD operations for product categories         |
| **Manage Users**      | Admin panel to manage user accounts            |
| **Order History**     | View and track all past orders                 |

---

## 🔒 Security

- All API routes (except `/auth/*`) are protected with **JWT Bearer tokens**
- Tokens are stored in `localStorage` on the frontend
- Spring Security filters validate tokens on each request

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
