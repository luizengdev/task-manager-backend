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

export default mongoose.model("Task", TaskSchema);
