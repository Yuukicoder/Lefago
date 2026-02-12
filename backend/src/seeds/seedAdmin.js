import dotenv from "dotenv"
import db from "../config/db.js"
import User from "../models/users.model.js"
import bcrypt from "bcryptjs"
dotenv.config({path:"C:/Users/Admin/Desktop/Lefago/backend/.env"});

const seedAdmin = async () =>{
    try {
        await db();
        const email = "admin@gmail.com";
        const existed = await User.findOne({email});
        if(existed) throw new Error("Email admin already existed!");
        const hash_password = await bcrypt.hash("admin123", 10);
        const newAdmin = new User({
            email: email,
            password: hash_password,
            role:  "admin",
            isActive: true,
        })
        await newAdmin.save();
        console.log("Create admin successfully!");
        process.exit(0);

    } catch (error) {
        console.log(error);
        process.exit(1);

        
    }
}
seedAdmin();
// run: node backend/src/seeds/seedAdmin.js