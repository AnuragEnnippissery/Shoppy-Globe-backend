import UserModel from "../models/user.model.js";
import UserSchema from "../models/user.model.js";
import jwt from "jsonwebtoken";

export async function Register(req,res){
    try{
        let newUser=new UserSchema({
            username:req.body.username,
            password:req.body.password
        })
        await newUser.save()
        res.status(201).json({"message":"user registered"})
    }
    catch(err){
        res.status(500).json({"message":"user not registered"})
        console.log(err)
    }
}

export async function Login(req,res){
    let {username,password}=req.body;
    let user=await UserModel.findOne({username})
    if(!user){
        res.json({"message":"not registered"})
    }
    if (user.password !== password) {
      return res.status(401).json({ message: "Incorrect password" });
    }
    else{
        //res.status(200).json({"message":"welcome"})
        let accessToken=jwt.sign({ id: user._id, username: user.username },"secretKey",{expiresIn:"1d"});
        res.status(200).json({token:accessToken,"message":"welcome",id:user._id});
    }
}

export function AuthenticateUser(req,res,next){
    const authHeader=req.headers['authorization'];
    const token=authHeader && authHeader.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "Access token missing" });
    }
    jwt.verify(token,"secretKey",(err,decodeduser)=>{
        if(err){
            return res.status(403).json({"message":"invalid token"})
        }
        req.user=decodeduser;
        //res.json({"message":"token validated"})
        next()
    })
}