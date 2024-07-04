import {User} from '../model/user.model.js'
import bcryptjs from "bcryptjs";

export const signup = async(req,res)=>{
  try {
    const {fullname, email, password} = req.body;
    const user = await User.findOne({email});
    if(user){
        return res.status(400).json({msg:"User already exists"});
    }

    const hashpassword = await bcryptjs.hash(password,10);

    const createdUser = new User({
        fullname:fullname,
         email:email,
          password:hashpassword,
        });
    await createdUser.save();
    res.status(201).json({msg:"User created successfully",user:{
        fullname: createdUser.fullname,
        email: createdUser.email,
        id: createdUser._id,  
    }});

  } catch (error) {
    console.log(error);
    res.status(500).json({msg:"Internal Server Error"});
  }   
};

export const login = async(req,res)=>{
    try {
        const {email,password} = req.body;
        const user = await User.findOne({email});
        const isMatch = await bcryptjs.compare(password, user.password);
        if(!user || !isMatch) {
            return res.status(400).json({msg:"Invalid username or password"});
        }

        else{
            res.status(200).json({msg:"Logged in successfully",user:{
                fullname: user.fullname,
                email: user.email,
                id: user._id,
            }});
        }
    } catch (error) {
        console.log("Error: " + error.message);
        res.status(500).json({msg:"Internal Server Error"});
    }
};
