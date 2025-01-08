import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },    
    department: {
        type: String,
        required: false // Optional field for department
    },
    role: {
        type: String,
        enum: ['admin', 'manager', 'user'], 
        default: "user" // Default role is 'user'
    },
   
}, { timestamps: true });




const UserModel= mongoose.model('users',userSchema)


export default UserModel