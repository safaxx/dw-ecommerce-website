# E-commerce Website

## Setup

```bash
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

### Products

- `GET /products/all` - List products
- `GET /products/:id` - Product details
- `POST /products/create` - Create product (admin)
- `PUT /products/:id` - Update product (admin)
- `DELETE /products/:id` - Delete product (admin)
