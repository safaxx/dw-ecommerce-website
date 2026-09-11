import mongoose from "mongoose";

export const connectToDB = () => {
  mongoose
    .connect(process.env.DB_URI,
    // {
    //   useNewUrlParser: true,
    //   useCreateIndex: true,
    //   useUnifiedTopology: true,
    // }
    )
    .then((data) => {
      console.log(`mongodb connected server: ${data.connection.host}`);
    })
    .catch((err) => {
      console.error(err);
    });
};
