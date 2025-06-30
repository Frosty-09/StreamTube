import dotenv from "dotenv";
import { connectToDatabase } from "./db/index.js";
import { app } from "./app.js";
dotenv.config({
  path: "./.env",
});

connectToDatabase()
  .then(() => {
    app.on("error", (err) => {
      console.error("MongoDB connection error on line num undefined :", err);
      throw err;
    });
    app.listen(process.env.PORT || 8000, () => {
      console.log(`app is listening on http://localhost:${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });
