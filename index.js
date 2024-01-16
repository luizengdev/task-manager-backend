import express from "express";
import dotenv from "dotenv";
import router from "./src/routes/task.routes.js";
import connectToDatabase from "./src/database/mongoose.database.js";

dotenv.config();
const app = express();

app.use(express.json());

connectToDatabase();

app.use("/tasks", router);

app.listen(process.env.PORT, () =>
    console.log(`Listening on port ${process.env.PORT}!`)
);
