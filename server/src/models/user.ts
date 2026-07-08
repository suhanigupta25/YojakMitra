//model-> structure
//schma is for mongoose

import {Schema,model} from "mongoose";

export interface RegisteredUser {
    name: string;
    age: number;
    gender: string;
    username: string;
    email: string;
    password: string;
}

export interface LoginUser {
    username: string;
    password: string;
}

const userSchema=new Schema<RegisteredUser>(
    {   
        name: {
           type: String,
            required: true 
        },
        age: {
            type: Number,
            required: true
        },
        
        gender: {
            type: String,
            required: true
        } 
        ,username: {
            type: String,
            required: true,
            unique:true
        },
        email: {
            type:String,
            required: true,
            unique:true
        },
        password: {
            type:String,
            required: true
            
        }       
    }
);

const User=model<RegisteredUser>('User',userSchema);
export default User;
