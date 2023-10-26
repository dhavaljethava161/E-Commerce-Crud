# E-Commerce CRUD Application

This is a Back-end(NodeJs) E-Commerce application built using Node.js, Express and MongoDB . It provides functionality for product management, user authentication, shopping cart, order processing, and more.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)

## Features

- **User Authentication**: Secure user sign-up and login with password hashing.
- **Product Management**: CRUD operations for product management.
- **Shopping Cart**: Add, update, and delete products in the shopping cart.
- **Order Processing**: Place and manage orders.
- **Wishlist**: Add, view, and manage favorite products.
- **Admin Panel**: Separate admin panel for product management.
- **OTP Verification**: Send OTPs for user actions.
- **Cron Jobs**: Schedule reminders and background tasks.
- **Database Integration**: MongoDB is used to store user and product data.
- **Responsive UI**: Frontend template with Bootstrap for easy usability.

## Prerequisites
- **Node.js**: Ensure Node.js is installed on your machine. Download it from [nodejs.org](https://nodejs.org/).
- **MongoDB**: Setup and run MongoDB locally or opt for a cloud-based solution.

## API Endpoints

- **User Authentication**:
  - `POST /user/signin`: Sign in with email and password.
  - `PUT /user/update`: Update user information.
  - `PUT /user/sendotp`: Send OTP for user actions.
  - `PUT /user/resetpassword`: Reset user password.
  - `DELETE /user/delete/:id`: Delete a user (admin only).

- **Product Management**:
  - `POST /product/create`: Create a new product (admin only).
  - `GET /product/filter`: Filter and search for products.
  - `POST /product/update/:id`: Update a product (admin only).
  - `POST /product/delete/:id`: Delete a product (admin only).

- **Shopping Cart**:
  - `POST /cart/create`: Create a new shopping cart.
  - `GET /cart/getall`: Get all shopping carts.
  - `PUT /cart/update/:id`: Update a shopping cart.
  - `DELETE /cart/delete/:id`: Delete a shopping cart.

- **Order Processing**:
  - `POST /order/create`: Create a new order.
  - `POST /order/place`: Place an order.
  - `POST /order/sendOtp`: Send OTP for order verification.
  - `PUT /order/cancel`: Cancel an order.
  - `GET /order/getallorders`: Get all orders.
  - `PUT /order/update/:id`: Update an order (admin only).
  - `POST /order/delete/:id`: Delete an order (admin only).

- **Wishlist**:
  - `POST /wishlist/create`: Create a new wishlist.
  - `GET /wishlist/getwishlist/:id`: Get a user's wishlist.
  - `PUT /wishlist/update/:id`: Update a wishlist.
  - `POST /wishlist/delete:id`: Delete a wishlist.

- **Admin Panel**:
  - `POST /auth/create`: Create a new admin user.
