import express from "express";
import dotenv from "dotenv";
import connectToDatabase from "./src/database/mongoose.database.js";

dotenv.config();
const app = express();

connectToDatabase();

app.get("/", (req, res) => {
    res.status(200).send("Hello World!");
});

app.listen(process.env.PORT, () =>
    console.log(`Listening on port ${process.env.PORT}!`)
);
