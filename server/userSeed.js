import { User } from "./models/user-models.js"
import dbConnect from "./utils/db.js"
import bcrypt from "bcrypt"

const userRegister = async (req,res)=>{
    
    const hashPassword = await bcrypt.hash("admin",10);
    try {
       const newUser = await new User({
            name:"Admin",
            email:"admin@gmail.com",
            password:hashPassword,
            role: "admin"
        })
        await newUser.save()
        return "User Registerd successfully"
    } catch (error) {
        console.log(error)
        // res.status(500).json("Internal Server Error")
    }
}

dbConnect().then(()=>
    userRegister()
)
