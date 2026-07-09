import { SchemeService } from "../services/scheme.service";
import {Response,Request} from "express";


const schemeservice=new SchemeService();

export const getSchemes = async (req :Request, res:Response) => {

    const state = req.query.state;
    const category = req.query.category;
    const age = req.query.age;
    const occupation = req.query.occupation;
    const income = req.query.income;
    const search = req.query.search;


};