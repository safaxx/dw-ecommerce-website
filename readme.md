# E-commerce Website

## Setup

```bash
npm install
npm run dev
```

Frontend:

```bash
cd frontend
npm install
npm run dev
```

Create `backend/config/config.env` with:

```env
PORT=3002
DB_URI=<mongodb-uri>
JWT_SECRET=<jwt-secret>
COOKIE_EXPIRES=1
SMTP_SERVICE=gmail
SMTP_MAIL=<gmail-address>
SMTP_PASSWORD=<gmail-app-password>
```

The API runs at `http://localhost:3002`.

## Routes

Base: `/api/v1`

### Users

- `POST /user/register` - Register
- `POST /user/login` - Login
- `GET /user/logout` - Logout
- `POST /user/forgot-password` - Send reset email
- `PUT /user/reset-password/:token` - Reset password
- `PUT /user/update-password` - Update password (authenticated)
- `GET /user/me` - Current user (authenticated)
- `PUT /user/me/update` - Update profile (authenticated)
- `GET /user/admin/all-users` - List users (admin)
- `GET /user/admin/:id` - Get user (admin)
- `PUT /user/admin/:id` - Update user (admin)
- `DELETE /user/admin/:id` - Delete user (admin)

### Products

- `GET /products/all` - List products
- `GET /products/:id` - Product details
- `POST /products/create` - Create product (admin)
- `PUT /products/:id` - Update product (admin)
- `DELETE /products/:id` - Delete product (admin)
- `PUT /products/review` - Create or update review (authenticated)
- `GET /products/reviews?prodId=<id>` - Get product reviews
- `DELETE /products/reviews?prodId=<id>&reviewId=<id>` - Delete own review (authenticated)

### Orders

- `POST /orders/create` - Create order (authenticated)
- `GET /orders/:id` - Get own order (authenticated)
- `GET /orders/my-orders` - Get own orders (authenticated)
- `GET /orders/admin/all` - List all orders (admin)
- `PUT /orders/admin/:id` - Update order status (admin)
- `DELETE /orders/admin/:id` - Delete order (admin)

The frontend uses React, React Router, Redux, and Headless UI.
