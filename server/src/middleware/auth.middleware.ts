import { NextFunction } from "express";
import {AuthService} from "../services/auth.service"
import {Response,Request} from "express";

const authService= new AuthService();

async function restrictToAuth(
    req: Request,
    res: Response,
    next: NextFunction){
    try{
        const authHeader=req.headers.authorization;
        const token=authHeader?.split(" ")[1];
        if (!token) {
            return res.status(401).json({ message: "Token missing" });
        }
        const payload=authService.verifyAccessToken(token);
        req.user=payload;
        next();
    }
    catch(error){
        return res.status(401).json({
            message: "unauthorized"
        });
    }
}