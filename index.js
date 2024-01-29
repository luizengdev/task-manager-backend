import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import router from "./src/routes/task.routes.js";
import connectToDatabase from "./src/database/mongoose.database.js";

dotenv.config();

const app = express();

// app.use(cors());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://127.0.0.1:5173"); // Substitua pela origem do seu frontend
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");

    // Permitir que o navegador envie cookies com a solicitação
    res.header("Access-Control-Allow-Credentials", true);

    // Continue para as rotas
    next();
});

app.use(express.json());

connectToDatabase();

app.use("/tasks", router);

app.listen(process.env.PORT, () =>
    console.log(`Listening on port ${process.env.PORT}!`)
);
