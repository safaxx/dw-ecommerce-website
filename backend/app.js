import express from "express";
import productRouter from "./routes/productRoutes.js"
import { error } from "./middleware/error.js";

const app = express();
app.use(express.json())
app.use("/api/v1/products", productRouter);
app.use(error)




export default app;