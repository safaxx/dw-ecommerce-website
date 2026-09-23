# Always Modest — E-commerce Website

A full-stack e-commerce web app built with Express + MongoDB on the backend and React + Vite + Redux on the frontend. The app includes product browsing, cart management, checkout, order tracking, account management, Razorpay integration, and an admin dashboard.

## Tech Stack

- Backend: Node.js, Express, MongoDB, Mongoose
- Frontend: React 19, Vite, React Router, Redux Toolkit
- Auth: JWT stored in an HTTP-only cookie
- Payments: Razorpay integration for online payments
- Email: Nodemailer for password reset flow
- Image hosting: Cloudinary support for product images

## Project Structure

```bash
.
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── app.js
│   └── server.js
├── frontend/
│   ├── app/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.js
├── package.json
├── readme.md
├── CLAUDE.md
└── to-do.md
```

## Prerequisites

- Node.js 18+
- MongoDB instance
- Razorpay account and API keys
- SMTP email service credentials (Gmail app password recommended)

## Environment Setup

Create `backend/config/config.env` with the following values:

```env
PORT=3002
DB_URI=mongodb://127.0.0.1:27017/always-modest
JWT_SECRET=your_jwt_secret_here
COOKIE_EXPIRES=1
FRONTEND_URL=http://localhost:5173
SMTP_SERVICE=gmail
SMTP_MAIL=your-email@gmail.com
SMTP_PASSWORD=your-app-password
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
```

## Run the App

Install root dependencies:

```bash
npm install
```

Start the backend:

```bash
npm run dev
```

Start the frontend in a separate terminal:

```bash
cd frontend
npm install
npm run dev
```

The API will run on `http://localhost:3002` and the frontend dev server is typically on `http://localhost:5173`.

## Current Features

### Customer Features

- Product catalog with search, category filtering, stock filtering, and pagination
- Product detail pages with reviews and ratings
- Add products to cart with size selection and quantity updates
- Save cart to backend for authenticated users
- Checkout flow with shipping details and order confirmation
- Payment options:
  - Cash on Delivery (COD)
  - Razorpay online payment
- Order creation and order history for logged-in users
- User profile management and shipping address updates
- Password reset via email flow
- User account layout with profile, orders, and wishlist section

### Admin Features

- Admin dashboard shell and navigation
- Product creation and update workflows
- Product image upload support
- Product delete actions
- Admin order management and order status updates
- Admin user management
- Admin review management

### Security / Backend Features

- JWT-based authentication with HTTP-only cookie storage
- Role-based access control for admin routes
- Protected routes for authenticated and authorized users
- Error handling middleware and async error wrappers
- Payment signature verification for Razorpay to prevent forged payment confirmations

## API Overview

Base URL: `/api/v1`

### Auth & Users

- `POST /user/register` — Register a new account
- `POST /user/login` — Login
- `GET /user/logout` — Logout current user
- `POST /user/forgot-password` — Send password reset email
- `PUT /user/reset-password/:token` — Reset password with token
- `PUT /user/update-password` — Update password for logged-in user
- `GET /user/my-account` — Get current user details
- `PUT /user/my-account/update` — Update current user profile
- `GET /user/admin/all-users` — Get all users (admin)
- `GET /user/admin/:id` — Get user by ID (admin)
- `PUT /user/admin/:id` — Update user by ID (admin)
- `DELETE /user/admin/:id` — Delete user by ID (admin)

### Products

- `GET /products/all` — Get all products with filtering/search/pagination
- `GET /products/categories` — Get all available categories
- `GET /products/:id` — Get product details
- `POST /products/create` — Create a product (admin)
- `PUT /products/:id` — Update a product (admin)
- `DELETE /products/:id` — Delete a product (admin)
- `PUT /products/review` — Create or update a review for a product
- `GET /products/reviews?prodId=<id>` — Get reviews for a product
- `DELETE /products/reviews?prodId=<id>&reviewId=<id>` — Delete a user's review
- `POST /products/upload-image` — Upload product image (admin)

### Cart

- `GET /cart` — Get current user cart
- `PUT /cart` — Save cart contents for current user

### Orders

- `POST /orders/create` — Create a new order
- `GET /orders/:id` — Get a specific order for the user
- `GET /orders/my-orders` — Get all orders for the logged-in user
- `GET /orders/admin/all` — Get all orders (admin)
- `GET /orders/admin/:id` — Get order details by ID (admin)
- `PUT /orders/admin/:id` — Update order status (admin)
- `DELETE /orders/admin/:id` — Delete an order (admin)

### Razorpay

- `POST /payment/razorpay/order` — Create Razorpay order
- `POST /payment/razorpay/verify` — Verify payment signature

## Frontend Routes

- `/` — Home page
- `/products` — Product listing page
- `/products/:id` — Product details
- `/login` — Login/register page
- `/cart` — Cart page
- `/checkout` — Checkout page
- `/my-account` — User profile/account dashboard
- `/my-account/orders` — Order list
- `/my-account/orders/:id` — Order details
- `/my-account/wishlist` — Wishlist placeholder section
- `/admin` — Admin dashboard area
- `/admin/products` — Manage products
- `/admin/orders` — Manage orders
- `/admin/users` — Manage users
- `/admin/reviews` — Manage reviews
- `/password/reset/:token` — Password reset page

## Notes

- This app is currently designed as a learning project and follows a modular structure with Redux action/reducer files organized by feature.
- Some sections such as the wishlist are implemented as placeholders and may be expanded later.
- The app expects a valid MongoDB connection and a working Razorpay setup for payment features to function end-to-end.

## Suggested Next Enhancements

- Wishlist persistence for users
- Product stock decrement on order creation for COD flows
- Better admin analytics and charts
- Product image gallery enhancements
- More robust form validation and UX improvements
