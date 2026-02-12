import mongoose from "mongoose";

const connectDB = async() =>{
    try {
        await mongoose.connect(process.env.MONGODB)
        console.log("Mongodb connected");
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}
export default connectDB;