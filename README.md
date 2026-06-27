# 🔐 Secure Notes API

A secure REST API built with **Java, Spring Boot, Spring Security, JWT, MySQL, and Gmail SMTP**. The application allows users to register, verify their email, securely log in, manage notes, upload files, and reset forgotten passwords.

---

## 🚀 Features

### Authentication

* User Registration
* Email Verification using OTP
* JWT Authentication
* Secure Login
* Password Encryption using BCrypt

### Password Recovery

* Forgot Password via Email
* OTP Verification
* Reset Password

### Notes Management

* Create Note
* View Notes
* Update Note
* Delete Note

### File Upload

* Upload files
* Store uploaded files securely

### Security

* Spring Security
* JWT Authorization
* Protected APIs
* Password Encryption
* Email Verification

---

## 🛠 Tech Stack

### Backend

* Java 22
* Spring Boot
* Spring Security
* Spring Data JPA
* Hibernate

### Database

* MySQL

### Authentication

* JWT (JSON Web Token)

### Email Service

* Gmail SMTP

### Build Tool

* Maven

---

## 📁 Project Structure

```
src
├── controller
├── service
├── repository
├── entity
├── dto
├── security
├── config
└── util
```

---

## 🔄 Authentication Flow

1. Register a new user.
2. OTP is sent to the registered email.
3. Verify OTP.
4. Login using email and password.
5. Receive JWT Token.
6. Access secured APIs using the JWT Token.

---

## 🔑 Forgot Password Flow

1. Click "Forgot Password".
2. Enter registered email.
3. Receive OTP on email.
4. Verify OTP.
5. Set a new password.
6. Login with the new password.

---

## 📧 Email Features

* Account Verification
* Forgot Password OTP
* Gmail SMTP Integration

---

## ⚙ Environment Variables

Create environment variables before running the project.

```
MAIL_USERNAME=your_email@gmail.com
MAIL_PASSWORD=your_app_password

DB_USERNAME=root
DB_PASSWORD=your_database_password

JWT_SECRET=your_secret_key
```

---

## ▶ Run the Project

Clone the repository

```
git clone https://github.com/AnishVerma-ux/secure-notes-api.git
```

Move inside the project

```
cd secure-notes-api
```

Run

```
mvn spring-boot:run
```

---

## 🔐 API Endpoints

### Authentication

* POST /api/auth/register
* POST /api/auth/verify
* POST /api/auth/login
* POST /api/auth/forgot-password
* POST /api/auth/verify-forgot-otp
* POST /api/auth/reset-password

### Notes

* POST /api/notes
* GET /api/notes
* PUT /api/notes/{id}
* DELETE /api/notes/{id}

---

## 📌 Future Improvements

* React Frontend
* Docker Support
* Refresh Token Authentication
* Role-Based Authorization
* Pagination & Sorting
* Swagger Documentation
* Unit Testing
* CI/CD Pipeline
* AWS Deployment

---

## 👨‍💻 Author

**Anish Verma**

GitHub: https://github.com/AnishVerma-ux
