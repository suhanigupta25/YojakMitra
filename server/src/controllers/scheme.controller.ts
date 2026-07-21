import { isValidObjectId } from "mongoose";
import { BrowseSchemeDTO,SearchSchemeDTO,EligibilityDTO } from "../dto/scheme.dto";
import { SchemeService } from "../services/scheme.service";
import {Response,Request} from "express";


const schemeservice=new SchemeService();

export const BrowseCategory=async(req : Request,res:Response)=>{
    const filter: BrowseSchemeDTO = {
        category: req.query.category as string
    };
    console.log(req.query.category);
    const result=await schemeservice.getSchemes(filter);
    res.status(200).json(result);
}

export const checkEligibilty=async(req : Request,res:  Response)=>{
    const filter : EligibilityDTO={
        occupation: req.body.occupation as string,
        age: req.body.age as string,
        gender: req.body.gender as string,
        state: req.body.state as string
    };
    const result=await schemeservice.checkEligibility(filter);
    res.status(200).json(result);

}

export const searchSchemes=async(req : Request,res:Response)=>{
    const filter : SearchSchemeDTO={
        search : req.query.search as string
    }
    console.log(req.query.search);
    const result =await schemeservice.searchSchemes(filter);
    res.status(200).json(result);
}


export const getSchemeById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (typeof id !== 'string' || !isValidObjectId(id)) {
      return res.status(400).json({ 
        message: 'Invalid Scheme ID provided.' 
      });
    }

    const scheme = await schemeservice.getSchemeById(id);
    
    if (!scheme) {
      return res.status(404).json({ message: 'Scheme not found.' });
    }

    return res.status(200).json(scheme);
  } catch (error) {
    console.error('Error fetching scheme by ID:', error);
    return res.status(500).json({ 
      message: 'Server error while fetching scheme details.' 
    });
  }
};
