import  jwt from 'jsonwebtoken'
import UserModel from '../models/user.js'
import dotenv from 'dotenv';
dotenv.config();


const isAdmin=async(req,res,next)=>{
    try {
         const token=req.cookies.token
         if (!token) {
            return res.status(401).json({messsage:"'Unauthorized: No token provided'"})
         }
         const decoded= jwt.verify(token,process.env.JWT_SECRETE)
         const user=await UserModel.findById(decoded.userId)
         if (!user) {
            return res.status(401).json({messsage:"'user not found'"})
         }
         if (user.role !=='admin') {
            return res.status(403).json({messsage:'Unauthorized: User is not an admin'})
         }
       req.user=user
         next()      
    } catch (error) {
        console.log(error)
    }
}

const isManager = async (req, res, next) => {
  try {   
    const token = req.cookies?.token;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized: No token provided" });
    }
    if (!process.env.JWT_SECRETE) {
      throw new Error("JWT_SECRET is not defined in the environment variables");
    }    
    const decoded = jwt.verify(token, process.env.JWT_SECRETE);
    const user = await UserModel.findById(decoded.userId);
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }    
    if (user.role !== 'manager') {
      return res.status(403).json({ message: "Unauthorized: User is not a manager" });
    }
    req.user = user;
    next();
  } catch (error) {    
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Invalid token" });
    }
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token has expired" });
    }
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};


const IsUser=async(req,res,next)=>{
   try {
      const token=req.cookies.token
      if (!token) {
         return res.status(401).json({messsage:"'Unauthorized: No token provided'"})
      }
      const decoded= jwt.verify(token,process.env.JWT_SECRETE)
      const user=await UserModel.findById(decoded.userId)
      if (!user) {
         return res.status(401).json({messsage:"'user not found'"})
      }    
    req.user=user
      next()
   
 } catch (error) {
     console.log(error)
 }
}


export {isAdmin,isManager,IsUser}