const express=require('express')
const router=express.Router()
const {SignUp,Login,getAllUser}=require('../middleware/userMi')

router.route('/').post(SignUp)
router.route('/').get(getAllUser)
router.route('/login').post(Login)

module.exports=router