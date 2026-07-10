import { BrowseSchemeDTO,SearchSchemeDTO,EligibilityDTO } from "../dto/scheme.dto";
import { SchemeService } from "../services/scheme.service";
import {Response,Request} from "express";


const schemeservice=new SchemeService();

export const BrowseCategory=async(req : Request,res:Response)=>{
    const filter: BrowseSchemeDTO = {
        category: req.query.category as string
    };
    const result=await schemeservice.getSchemes(filter);
    res.status(200).json(result);
}

export const checkEligibilty=async(req : Request,res:  Response)=>{
    const filter : EligibilityDTO={
        occupation: req.query.occupation as string,
        age: Number(req.query.age as string),
        income: Number(req.query.income as string),
        state: req.query.state as string
    };
    const result=await schemeservice.checkEligibility(filter);
    res.status(200).json(result);

}

export const searchSchemes=async(req : Request,res:Response)=>{
    const filter : SearchSchemeDTO={
        search : req.query.search as string
    }
    const result =await schemeservice.searchSchemes(filter);
    res.status(200).json(result);
}

export const getSchemeById = async (req: Request, res: Response) => {
    const id = req.params.id as string;
    const result = await schemeservice.getSchemeById(id);
    if (!result) {
        return res.status(404).json({
            message: "Scheme not found"
        });
    }

    return res.status(200).json(result);
};


