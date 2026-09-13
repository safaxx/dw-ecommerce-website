import express from "express";
import cookieParser from "cookie-parser";
import productRouter from "./routes/productRoutes.js"
import userRouter from "./routes/userRoutes.js";
import orderRouter from "./routes/orderRoutes.js";
import { error } from "./middleware/error.js";

const app = express();
app.use(express.json())
app.use(cookieParser());
app.use("/api/v1/products", productRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/orders", orderRouter);
app.use(error)




export default app;