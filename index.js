import express from "express";
import dotenv from "dotenv";
import connectToDatabase from "./src/database/mongoose.database.js";
import TaskModel from "./src/models/task.model.js";

dotenv.config();
const app = express();

app.use(express.json());

connectToDatabase();

app.get("/tasks", async (req, res) => {
    const tasks = await TaskModel.find({});
    res.status(200).send(tasks);
});

app.get("/tasks/:id", async (req, res) => {
    const task = await TaskModel.findById(req.params.id);
    if (!task) {
        return res.status(404).send("Task not found");
    }
    res.status(200).send(task);
});

app.post("/tasks", async (req, res) => {
    const task = await TaskModel.create(req.body);
    res.status(201).send(task);
});

app.patch("/tasks/:id", async (req, res) => {
    try {
        const taskId = await TaskModel.findById(req.params.id);
        if (!taskId) {
            return res.status(404).send("Task not found");
        }

        const task = await TaskModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
            }
        );
        res.status(200).send(task);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.delete("/tasks/:id", async (req, res) => {
    const taskId = await TaskModel.findById(req.params.id);
    if (!taskId) {
        return res.status(404).send("Task not found");
    }

    const task = await TaskModel.findByIdAndDelete(req.params.id);
    res.status(200).send(task);
});

app.listen(process.env.PORT, () =>
    console.log(`Listening on port ${process.env.PORT}!`)
);
