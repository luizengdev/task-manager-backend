import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
    },
    // isComplered sinalisa se a tarefa foi cpmpletada ou não
    isCompleted: {
        type: Boolean,
        default: false,
    },
});

const TaskModel = mongoose.model("Task", TaskSchema);

export default TaskModel;
