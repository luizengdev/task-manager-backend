import express from "express";
import TaskController from "../controllers/task.controller.js";
import TaskModel from "../models/task.model.js";

const router = express.Router();

router.get("/", async (req, res) => {
    return new TaskController(req, res).getTasks();
});

router.get("/:id", async (req, res) => {
    const task = await TaskModel.findById(req.params.id);
    if (!task) {
        return res.status(404).send("Task not found");
    }
    res.status(200).send(task);
});

router.post("/", async (req, res) => {
    const task = await TaskModel.create(req.body);
    res.status(201).send(task);
});

router.patch("/:id", async (req, res) => {
    try {
        const allowedUpdates = ["isCompleted"];
        const updates = Object.keys(req.body);
        const isValidOperation = updates.every((update) =>
            allowedUpdates.includes(update)
        );
        if (!isValidOperation) {
            return res.status(400).send({ error: "Invalid updates!" });
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

router.delete("/:id", async (req, res) => {
    const taskId = await TaskModel.findById(req.params.id);
    if (!taskId) {
        return res.status(404).send("Task not found");
    }

    const task = await TaskModel.findByIdAndDelete(req.params.id);
    res.status(200).send(task);
});

export default router;
