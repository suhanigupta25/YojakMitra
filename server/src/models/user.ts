//model-> structure
//schma is for mongoose
import {Schema,model,InferSchemaType} from "mongoose";

interface RegisterUserDto {
    name: string;
    age: number;
    gender: string;
    username: string;
    email: string;
    password: string;
}

interface LoginUserDto {
    email: string;
    password: string;
}

const userSchema=new mongoose.Schema<MyUser>(
    {
        username: {
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
            
        },
        age: {
            type: Number,
            required: true
        },
        gender: {
            type: String,
            required: true
        },
        name: {
           type: String,
            required: true 
        }
    }
);

const User=mongoose.model<MyUser>('User',userSchema);
export default User;
