🚗 Car Wash Service Backend API

This project is a Backend API for a Car Wash Service platform.
The API allows users to create accounts, book car wash services, and manage services through secure endpoints.

It is designed as a RESTful API and focuses on backend development concepts such as authentication, database management, and API routing.

📌 Features

User Registration

User Authentication (JWT)

Password Hashing using bcrypt

Create and manage car wash services

Book a car wash service

Secure routes using authentication middleware

RESTful API structure

🛠️ Technologies Used

Node.js

Express.js

MongoDB / Mongoose

JWT (JSON Web Token)

bcrypt

dotenv

📂 Project Structure
carwash-backend
│
├── controllers
│   ├── authController.js
│   ├── serviceController.js
│
├── models
│   ├── User.js
│   ├── Service.js
│
├── routes
│   ├── authRoutes.js
│   ├── serviceRoutes.js
│
├── middleware
│   ├── authMiddleware.js
│
├── config
│   ├── db.js
│
├── .env
├── server.js
└── package.json
⚙️ Installation

Clone the repository

git clone https://github.com/yourusername/carwash-backend.git

Navigate into the project folder

cd carwash-backend

Install dependencies

npm install

Create a .env file

Example:

PORT=5000
MONGO_URI=your_database_connection_string
JWT_SECRET=your_secret_key

Start the server

npm run dev

or

node server.js
🔑 Authentication

This API uses JWT Authentication.

Workflow:

User registers

Password is hashed using bcrypt

User logs in

Server generates a JWT token

Token is sent in the request header for protected routes

Example header:

Authorization: Bearer your_token_here
📡 API Endpoints
Authentication
Method	Endpoint	Description
POST	/api/auth/register	Register a user
POST	/api/auth/login	Login user
Services
Method	Endpoint	Description
GET	/api/services	Get all services
GET	/api/services/:id	Get service by ID
POST	/api/services	Create a service
PUT	/api/services/:id	Update a service
DELETE	/api/services/:id	Delete a service
🔒 Protected Routes

Some routes require authentication.

The auth middleware:

Extracts the JWT token from the request header

Verifies the token

Finds the user

Attaches the user to req.user

Example:

req.user

This allows controllers to know which user is making the request.

🧪 Testing the API

You can test the API using:

Postman

Insomnia

Thunder Client (VS Code)

🎯 Project Goal

The main goal of this project is to practice:

Backend API design

Authentication and authorization

Middleware implementation

Database integration

RESTful architecture
