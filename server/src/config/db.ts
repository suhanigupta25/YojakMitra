import mongoose from "mongoose";

export async function connectDB(){
    try{
        await mongoose.connect(process.env.MONGOD_URI as string);
        console.log("database connected");
    }
    catch(error : any){
        console.error(error.message);
        process.exit(1);
    }
};

