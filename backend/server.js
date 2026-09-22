import dotenv from "dotenv";
import { connectToDB } from "./config/db.js";
import cloudinary from 'cloudinary';


//to handle uncaught exceptions
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down server : Unhandled Uncaught Exception`);

  process.exit(1);
});

//config
// dotenv.config({ path: "config/config.env" });
dotenv.config({ path: "backend/config/config.env" });

const { default: app } = await import("./app.js");

connectToDB();

const port = process.env.PORT || 3000;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET

})

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
