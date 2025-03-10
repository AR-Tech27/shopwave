import mongoose from "mongoose";


const connectDB = async () => {
    try {
        const con = await mongoose.connect(`${process.env.MONGO_URL}`);
        console.log(`connecting to MongoDB ${con.connection.host}`)

    } catch (error) {
        console.log(`MongoDB Connection Error: ${error}`)
    }
}


export default connectDB;