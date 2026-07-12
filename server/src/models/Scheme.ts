import {Schema,model} from "mongoose";

export interface DisplaySchemes{
        name : string;
        description:string;
        category: string;
        eligibility :string;
        documentsRequired:string;
        state:string;
        occupation:string,
        age: string;
        gender:string ;
        incomeLimit:string; 
}
const schemeDetailSchema=new Schema<DisplaySchemes>(
    {
        name: {
           type: String,
            required: true 
        },
        description: {
            type: String,
            required: true
        },
        
        category: {
            type: String,
            required: true
        } 
        ,eligibility: {
            type: String,
            required: true,
        },
        documentsRequired: {
            type:String,
            required: true
            
        },
        state: {
            type:String                       
        },
        incomeLimit: {
           type: String,
            required: true 
        },
        occupation: {
           type: String,
            required: true 
        },
        gender: {
           type: String,
            required: true 
        },
        age: {
           type: String,
            required: true 
        },
    }
);


const scheme=model<DisplaySchemes>("scheme",schemeDetailSchema);



export default scheme;
