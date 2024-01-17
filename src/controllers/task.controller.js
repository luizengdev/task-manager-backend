import TaskModel from "../models/task.model.js";
import { notFoundError } from "../errors/mongodb.errors.js";
import { notAllowedFieldsToUpdateError } from "../errors/general.errors.js";

class TaskController {
    constructor(req, res) {
        this.req = req;
        this.res = res;
    }

    async getAll() {
        try {
            const tasks = await TaskModel.find({});
            this.res.status(200).send(tasks);
        } catch (error) {
            this.res.status(500).send(error.message);
        }
    }

    async getById() {
        try {
            const task = await TaskModel.findById(this.req.params.id);
            if (!task) {
                return notFoundError(this.res);
            }
            this.res.status(200).send(task);
        } catch (error) {
            this.res.status(500).send(error.message);
        }
    }

    async created() {
        try {
            const task = await TaskModel.create(this.req.body);
            this.res.status(201).send(task);
        } catch (error) {
            this.res.status(500).send(error.message);
        }
    }

    async updated() {
        try {
            const allowedUpdates = ["isCompleted"];
            const updates = Object.keys(this.req.body);
            const isValidOperation = updates.every((update) =>
                allowedUpdates.includes(update)
            );
            if (!isValidOperation) {
                return notAllowedFieldsToUpdateError(this.res);
            }
            const task = await TaskModel.findByIdAndUpdate(
                this.req.params.id,
                this.req.body,
                {
                    new: true,
                }
            );

            if (!task) {
                return notFoundError(this.res);
            }

            this.res.status(200).send(task);
        } catch (error) {
            this.res.status(500).send(error.message);
        }
    }

    async deleted() {
        try {
            const taskId = await TaskModel.findById(this.req.params.id);
            if (!taskId) {
                return notFoundError(this.res);
            }

            const task = await TaskModel.findByIdAndDelete(this.req.params.id);
            this.res.status(200).send(task);
        } catch (error) {
            this.res.status(500).send(error.message);
        }
    }
}

export default TaskController;
