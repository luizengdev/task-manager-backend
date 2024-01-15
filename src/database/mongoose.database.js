import mongoose from "mongoose";

const connectToDatabase = async () => {
    try {
        await mongoose.connect(
            `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@taskmanagercluster.u8kzwln.mongodb.net/?retryWrites=true&w=majority`
        );
        return console.log("Connected to MongoDB");
    } catch (error) {
        console.log(error);
    }
};

export default connectToDatabase;
