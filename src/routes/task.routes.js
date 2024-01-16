import express from "express";
import TaskController from "../controllers/task.controller.js";
import TaskModel from "../models/task.model.js";

const router = express.Router();

router.get("/", async (req, res) => {
    return new TaskController(req, res).getAll();
});

router.get("/:id", async (req, res) => {
    return new TaskController(req, res).getById();
});

router.post("/", async (req, res) => {
    return new TaskController(req, res).created();
});

router.patch("/:id", async (req, res) => {
    return new TaskController(req, res).updated();
});

router.delete("/:id", async (req, res) => {
    return new TaskController(req, res).deleted();
});

export default router;
