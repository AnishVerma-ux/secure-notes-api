# Secure Notes API

A secure REST API built with Spring Boot that allows users to create, manage, and protect their personal notes using JWT Authentication. Users can also upload and download attachments such as images and PDF files.

## Features

- User Registration
- User Login with JWT Authentication
- Secure Password Encryption using BCrypt
- Create Notes
- View Personal Notes
- Update Notes
- Delete Notes
- Upload Image/PDF Attachments
- Download Attachments
- User Authorization (Users can access only their own notes and files)
- MySQL Database Integration
- Spring Security
- File Storage on Local Disk

---

## Tech Stack

- Java 22
- Spring Boot
- Spring Security
- Spring Data JPA (Hibernate)
- JWT Authentication
- MySQL
- Maven
- Multipart File Upload
- REST APIs

---

## Project Structure

```
src
 ├── config
 ├── controller
 ├── dto
 ├── entity
 ├── repository
 ├── security
 ├── service
 └── resources
```

---

## API Endpoints

### Authentication

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | /api/auth/register | Register User |
| POST | /api/auth/login | Login User |

---

### Notes

| Method | Endpoint |
|---------|----------|
| GET | /notes |
| POST | /notes |
| PUT | /notes/{id} |
| DELETE | /notes/{id} |

---

### Attachments

| Method | Endpoint |
|---------|----------|
| POST | /attachments/notes/{noteId} |
| GET | /attachments/{attachmentId} |

---

## Security

- JWT Authentication
- BCrypt Password Encryption
- Stateless Authentication
- User-level Authorization

---

## Database

MySQL is used as the database.

Example configuration:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/secure_notes_db
spring.datasource.username=YOUR_USERNAME
spring.datasource.password=YOUR_PASSWORD

jwt.secret=YOUR_SECRET_KEY
```

---

## Running the Project

### Clone Repository

```bash
git clone https://github.com/AnishVerma-ux/secure-notes-api.git
```

### Navigate

```bash
cd secure-notes-api
```

### Build

```bash
mvn clean install
```

### Run

```bash
mvn spring-boot:run
```

The application will start at:

```
http://localhost:8081
```

---

## Future Improvements

- Delete Attachments
- View Attachments by Note
- Swagger/OpenAPI Documentation
- Pagination
- Search Notes
- Cloud Storage (AWS S3 / Cloudinary)
- Docker Support

---

## Author

**Anish Verma**

GitHub:
https://github.com/AnishVerma-ux
