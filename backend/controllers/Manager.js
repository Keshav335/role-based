import UserModel from "../models/user.js"
const Getuser=async(req,res)=>{
    try {
        // Get the manager's department from req.user, which was set by isManager middleware
        const { department } = req.user;    
        if (!department) {
          return res.status(400).json({ message: "Manager's department is not specified" });
        }    
        // Fetch users in the same department
        const users = await UserModel.find({ department });    
        if (users.length === 0) {
          return res.status(404).json({ message: "No members found in this department" });
        }    
        res.status(200).json({ users });
      } catch (error) {
        res.status(500).json({ message: "Internal server error" });
        console.log(error);
      }
}

export {Getuser}

