import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import router from "./src/routes/task.routes.js";
import connectToDatabase from "./src/database/mongoose.database.js";

dotenv.config();

const app = express();

// app.use(
//     cors({
//         origin: "*",
//         methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//         preflightContinue: false,
//         optionsSuccessStatus: 204,
//         credentials: true,
//         allowedHeaders: ["Content-Type", "Authorization"],
//     })
// );

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});

app.use(express.json());

connectToDatabase();

app.use("/tasks", router);

app.listen(process.env.PORT, () =>
    console.log(`Listening on port ${process.env.PORT}!`)
);
