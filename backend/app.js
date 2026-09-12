import express from "express";
import cookieParser from "cookie-parser";
import productRouter from "./routes/productRoutes.js"
import userRouter from "./routes/userRoutes.js";
import { error } from "./middleware/error.js";

const app = express();
app.use(express.json())
app.use(cookieParser());
app.use("/api/v1/products", productRouter);
app.use("/api/v1/user", userRouter);
app.use(error)




export default app;