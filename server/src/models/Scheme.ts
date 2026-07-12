import {Schema,model} from "mongoose";

export interface DisplaySchemes{
    title : string;
    description:string;
    category: string;
    eligibility :string;
    documentsRequired:string;
    state:string;
}
const schemeDetailSchema=new Schema<DisplaySchemes>(
    {
        title: {
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
        }
    }
);

const scheme=model<DisplaySchemes>("scheme",schemeDetailSchema);



export default scheme;
