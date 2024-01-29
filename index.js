import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import router from "./src/routes/task.routes.js";
import connectToDatabase from "./src/database/mongoose.database.js";

dotenv.config();

const app = express();

app.use(
    cors({
        origin: "*",
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        preflightContinue: false,
        optionsSuccessStatus: 204,
        credentials: true,
        accessControlAllowOrigin: "*",
        accessControlAllowHeaders: ["Content-Type", "Authorization"],
    })
);

app.use(express.json());

connectToDatabase();

app.use("/tasks", router);

app.listen(process.env.PORT, () =>
    console.log(`Listening on port ${process.env.PORT}!`)
);
