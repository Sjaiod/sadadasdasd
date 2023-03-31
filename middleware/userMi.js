const User=require('../model/userM')
const eah=require('express-async-handler')

const SignUp=eah(async (req, res) => {
   const { name, email, password, pic } = req.body;
 
   if (!name || !email || !password) {
     res.status(400);
     throw new Error("Please Enter all the Feilds");
   }
 
   const userExists = await User.findOne({ email });
 
   if (userExists) {
     res.status(400);
     throw new Error("User already exists");
   }
 
   const user = await User.create({
     name,
     email,
     password,
     pic,
   });
 
   if (user) {
     res.status(201).json(user);
   } else {
     res.status(400);
     throw new Error("User not found");
   }
 });
 const Login=eah(async(req,res)=>{
   const { email, password } = req.body;

   const user = await User.findOne({ email });
 
   if (user && (await user.matchPassword(password))) {
     res.json(user);
   } else {
     res.status(401);
     throw new Error("Invalid Email or Password");
   }
 })
 const getAllUser = async (req, res, next) => {
  let users;
  try {
    users = await User.find();
  } catch (err) {
    console.log(err);
  }
  if (!users) {
    return res.status(404).json({ message: "No Users Found" });
  }
  return res.status(200).json({ users });
};
module.exports={SignUp,Login,getAllUser}