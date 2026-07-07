import bcrypt from "bcrypt";
import User from "../models/user.model";

export const registerUser= async(
    username: string,
    email: string,
    password: string
    )=>{
        const hashedPassword = await bcrypt.hash(password, 10);
        const user=await User.create({username,email,password:hashedPassword});
        console.log(user,"saved");
        return user;
};

export const loginUser={
};


//routes-> deciding whihc url pe konsa function chlega
//controlller -> client aur service ke btwn 
//        client se data lena and service ko dena
//service -> logic(password hash,ai call ,db operation)
//model->db repr user.create ,findone
//schema->doc ka structure(rules)
//midlleware->gatekeepr btwn user and controller
//view->react so no need here