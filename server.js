import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { Routes } from "./routes/product.route.js";
import userRoute from "./routes/user.route.js";
import CartRoutes from "./routes/cart.route.js";

const app = express();

// CORS (Allow all for now)
app.use(cors());
app.use(express.json());

// Routes
Routes(app);
userRoute(app);
CartRoutes(app);

// Fix MongoDB connection string (removed extra /)
mongoose.connect("mongodb+srv://anuragramesh608:c8wnN0KZ1Zzh4PoJ@cluster0.pdtmc7s.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");

// MongoDB events
mongoose.connection.on("open", () => console.log("MongoDB Connected"));
mongoose.connection.on("error", (err) => console.error("MongoDB Error:", err));

// FIX FOR RENDER !! (Use correct PORT)
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
