# E-commerce Application

## Overview
This is a full-stack e-commerce application built using **React.js** for the frontend and **Django** for the backend. The backend uses **MongoDB** for product management and **MySQL** for user authentication. The project features user authentication, product management, shopping cart functionality, and payment processing.

## Features

### Frontend (React.js)
- **Authentication**
  - User registration and login/logout
  - JWT-based authentication
  - Password reset functionality
  - Protected routes for authorized users
- **Shopping**
  - Product catalog display
  - Search and filter products
  - Shopping cart management
- **User Features**
  - User profile management
  - Password change
- **Navigation & UI**
  - Responsive design using Bootstrap
  - Navigation menu with authentication state
  - Informational pages (About, Contact)

### Backend (Django, MongoDB, MySQL)
- **User Authentication**
  - JWT-based authentication
  - Secure password management with Django AllAuth
  - Profile management
- **Product Management**
  - CRUD operations for products
  - MongoDB integration via Djongo
  - Product filtering and search capabilities
- **API Endpoints**
  - RESTful API with Django REST Framework
  - Secure endpoints with JWT authentication

## Tech Stack
- **Frontend**: React.js, React Router, Bootstrap, Axios
- **Backend**: Django, Django REST Framework, Django AllAuth
- **Database**: MongoDB (for products), MySQL (for user authentication)
- **Authentication**: JWT-based authentication

## Installation & Setup

### Frontend
1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/ecommerce-frontend.git
   cd ecommerce-frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the development server:
   ```sh
   npm start
   ```

### Backend
1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/ecommerce-backend.git
   cd ecommerce-backend
   ```
2. Create a virtual environment:
   ```sh
   python -m venv venv
   source venv/bin/activate  # On Windows use: venv\Scripts\activate
   ```
3. Install dependencies:
   ```sh
   pip install -r requirements.txt
   ```
4. Configure database settings in `settings.py`:
   - Set up **MySQL** for user authentication
   - Configure **MongoDB** connection for product storage
5. Apply migrations:
   ```sh
   python manage.py migrate
   ```
6. Start the backend server:
   ```sh
   python manage.py runserver
   ```

## API Endpoints

### Products
- `GET /api/products/` - List all products
- `POST /api/products/` - Create a new product
- `GET /api/products/<id>/` - Retrieve a single product
- `PUT /api/products/<id>/` - Update a product
- `DELETE /api/products/<id>/` - Delete a product

### Authentication
- `POST /api/auth/register/` - Register a new user
- `POST /api/auth/login/` - Login user
- `POST /api/auth/logout/` - Logout user
- `GET /api/auth/user/` - Get user profile
- `PUT /api/auth/user/` - Update user profile
- `POST /api/auth/password/change/` - Change password
- `POST /api/auth/password-reset/` - Request password reset

## API Testing with Postman
- Import the provided Postman collection to test API endpoints
- Ensure the backend is running before making requests
- Use appropriate headers (e.g., `Authorization: Bearer <token>`) for protected endpoints

## Future Enhancements
- **Payment Integration**: Implement Stripe or Razorpay for secure transactions
- **Order Tracking**: Allow users to track their order status
- **Admin Dashboard**: Provide a web interface for managing products and users

---

This project was bootstrapped with **Create React App** for the frontend and **Django** for the backend.

