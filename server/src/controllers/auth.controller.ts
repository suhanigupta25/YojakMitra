import {AuthService} from "../services/auth.service";
import {Response,Request} from "express";

const authservice=new AuthService();

export async function login(req: Request,res :Response){
    try{
        const {username,password}=req.body;
        const tokens=await authservice.loginUser(username,password);
        return res.status(200).json(tokens);
    }catch(error : any){
        return res.status(400).json({message: error.message});
    }
}

export async function signup(req: Request,res :Response){
    try{
        const userData=req.body;
        const newUser=await authservice.registerUser(userData);
        return res.status(201).json(newUser);
    }
    catch(error : any){
        return res.status(400).json({message: error.message});
    }
}
export async function getProfile(req :Request,res:Response){
    try{
        const userId=req.user.userId;
        const profile = await authservice.getProfile(userId);
        if(!profile){
            return res.status(404).json({message: "Profile not found"});
        }
        return res.status(200).json(profile);
    }
    catch(error : any){
        return res.status(401).json({message: "Unauthorized"});
    }
}