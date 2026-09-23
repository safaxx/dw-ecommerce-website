import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import productRouter from "./routes/productRoutes.js"
import userRouter from "./routes/userRoutes.js";
import orderRouter from "./routes/orderRoutes.js";
import cartRouter from "./routes/cartRoutes.js";
import paymentRouter from "./routes/paymentRoutes.js";
import { error } from "./middleware/error.js";
import bodyParser from "body-parser";
// import fileUpload from 'express-fileupload';

const app = express();
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json({limit:"10mb"}))
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}))
//app.use(fileUpload());

app.use("/api/v1/products", productRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/orders", orderRouter);
app.use("/api/v1/cart", cartRouter);
app.use("/api/v1/payment/razorpay", paymentRouter);
app.use(error)




export default app;