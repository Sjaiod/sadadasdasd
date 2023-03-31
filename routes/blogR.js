const express=require('express')
const router=express.Router()
const {getAllBlogs,getById,getByUserId,updateBlog,SearchBlog,addBlog,deleteBlog}=require('../middleware/blogMi')

router.route('/').get(getAllBlogs)
router.route('/').post(addBlog)
router.put("/update/:id", updateBlog);
router.get("/:id", getById);
router.delete("/:id", deleteBlog);
router.get("/user/:id", getByUserId)
router.get("/search/:id",SearchBlog)

module.exports=router