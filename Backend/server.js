import express from "express";
import colors from "colors";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import morgan from "morgan"
import cors from "cors";

//importing routes 
import userRoutes from "./routes/userRoutes.js";

dotenv.config();

// MongoDB Connection
connectDB();

const app = express();

// middleware
app.use(morgan("dev"));
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", Credentials: true }));


// console.log("this is ecommerce web".bgGreen);

//http://localhost:8080/
//http://localhost:8080/api/v1/users

// importing Routes
app.use("/api/v1/users", userRoutes)

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => { console.log(`Server is listening at PORT ${PORT}`) });







