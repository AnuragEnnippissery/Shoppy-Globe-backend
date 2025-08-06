import mongoose, { Schema } from "mongoose";

const UserSchema =new Schema({
    username:{
        type:String,
        required:true,

    },
    password:{
        type:String,
        required:true
    }
})

let UserModel=mongoose.model("User",UserSchema)
export default UserModel;
