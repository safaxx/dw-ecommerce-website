import path from "node:path";
import app from "./app.js";
import dotenv from "dotenv";
import { connectToDB } from "./config/db.js";

//to handle uncaught exceptions
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down server : Unhandled Uncaught Exception`);

  process.exit(1);
});

//config
dotenv.config({ path: "backend/config/config.env" });

connectToDB();

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

//for unhandled promise rejection error
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down server : Unhandled Promise Rejection`);

  server.close(() => {
    process.exit(1);
  });
});
