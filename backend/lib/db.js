import mongoose from "mongoose";

export const connectDatabase = async() => {
    try {
        const connect = await mongoose.connect(process.env.MONGO_URL);
        console.log(`MongoDB connected: ${connect.connection.host}`);
    } catch (e) {
        console.log(`Error connecting to MongoDB: ${e.message}`);
        process.exit(1);
    }
}