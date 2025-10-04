import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { User } from "../models/user-model.js";

const login = async (req, res) => {
    try {
        const {email,password} = req.body;

        const user = await User.findOne({email:email})
        if(!user){
          return  res.status(404).json({success:false, message:"User Not Found"})
        }
        
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
          return  res.status(404).json({success:false, message:"Wrong Password"})   
        }
        const token = jwt.sign({_id:user._id, role:user.role},process.env.TOKEN_KEY,{expiresIn:"1d"} )
           return res.status(200).json({success:true, token ,user:{_id:user._id, name:user.name,role:user.role}})   
        


    } catch (error) {
        res.status(500).json({success:false, error: error.message});
    }

};

const verify =async (req,res)=>{
  return res.status(200).json({success:true,user: req.user})
}

export {login,verify}