const User=require('../model/userM')
const eah=require('express-async-handler')
const mongoose=require('mongoose')
const Blog=require('../model/BlogM')

const getAllBlogs =eah(async (req, res, next) => {
    let blogs;
    try {
      
      blogs = await Blog.find().limit().sort({$natural:-1}).populate("user")
    } catch (err) {
      return console.log(err);
    }
    if (!blogs) {
      return res.status(404).json({ message: "No Blogs Found" });
    }
    return res.status(200).json({ blogs });
  })

  const addBlog=eah(async(req,res,next)=>{
    const { title, description, image, user } = req.body;

    let existingUser;
    try {
      existingUser = await User.findById(user)
    } catch (err) {
      return console.log(err);
    }
    if (!existingUser) {
      return res.status(400).json({ message: "Unable TO FInd User By This ID" });
    }
    const blog = new Blog({
      title,
      description,
      image,
      user,
    });
    try {
      const session = await mongoose.startSession();
      session.startTransaction();
      await blog.save({ session });
      existingUser.blogs.push(blog);
      await existingUser.save({ session });
      await session.commitTransaction();
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: err });
    }
  
    return res.status(200).json({ blog });
  })


  
 const getById = eah(async (req, res, next) => {
  const id = req.params.id;
  let blog;
  try {
    blog = await Blog.findById(id).limit().sort({$natural:-1});
  } catch (err) {
    return console.log(err);
  }
  if (!blog) {
    return res.status(404).json({ message: "No Blog Found" });
  }
  return res.status(200).json({ blog });
  })

  const deleteBlog = eah(async (req, res, next) => {
    const id = req.params.id;
  
    let blog;
    try {
      blog = await Blog.findByIdAndRemove(id).populate("user");
      await blog.user.blogs.pull(blog);
      await blog.user.save();
    } catch (err) {
      console.log(err);
    }
    if (!blog) {
      return res.status(500).json({ message: "Unable To Delete" });
    }
    return res.status(200).json({ message: "Successfully Delete" });
  })

  const getByUserId = eah(async (req, res, next) => {
    const userId = req.params.id;
    let userBlogs;
    try {
      userBlogs = await User.findById(userId).populate("blogs")
    } catch (err) {
      return console.log(err);
    }
    if (!userBlogs) {
      return res.status(404).json({ message: "No Blog Found" });
    }
    return res.status(200).json({ user: userBlogs });
  })
  const updateBlog =eah( async (req, res, next) => {
    const { title, description,image } = req.body;
    const blogId = req.params.id;
    let blog;
    try {
      blog = await Blog.findByIdAndUpdate(blogId, {
        title,
        description,
        image
      });
    } catch (err) {
      return console.log(err);
    }
    if (!blog) {
      return res.status(500).json({ message: "Unable To Update The Blog" });
    }
    return res.status(200).json({ blog });
  })

  const SearchBlog=eah(async(req,res)=>{
    const key=req.params.id
let data
try {
  
  
 data=await Blog.find({"title":{$regex:".*"+key+".*",$options: 'i' }}).populate("user").sort({$natural:-1})
  res.status(200).json({key,data})
  
  
} catch (error) {
  
  if(!data){
    return res.status(500).json({ message: "Unable To Update The Blog" });
  }else{
res.status(200).json({key,data})
  }
}
  })


  module.exports={getAllBlogs,getById,getByUserId,updateBlog,addBlog,deleteBlog,SearchBlog}