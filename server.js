import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import { Routes } from "./routes/product.route.js"
import userRoute from "./routes/user.route.js"
import CartRoutes from "./routes/cart.route.js"


const app=express()
app.use(express.json())
app.use(cors())

Routes(app)
userRoute(app)
CartRoutes(app)

mongoose.connect("mongodb+srv://anuragramesh608:c8wnN0KZ1Zzh4PoJ@cluster0.pdtmc7s.mongodb.net/")
const db=mongoose.connection


db.on("open",()=>{
    console.log("successfull")
})
db.off("error",()=>{
    console.log("not successfull")
})
app.listen(3000,()=>{
    console.log("server is running")
})
