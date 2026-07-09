import mongoose from "mongoose";

export async function connectDB(){
    try{
        await mongoose.connect(process.env.MONGOD_URL as string);
        console.log("database connected");
    }
    catch(error : any){
        console.error("Connection failed");
        process.exit(1);
    }
};

