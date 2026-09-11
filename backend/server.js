import path from "node:path";
import app from "./app.js";
import dotenv from "dotenv";
import { connectToDB } from "./config/db.js";

//config
dotenv.config({ path: "backend/config/config.env" });

connectToDB();

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});