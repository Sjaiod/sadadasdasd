const express=require('express')
const cors =require('cors')
const dotenv=require('dotenv')
dotenv.config({path:"./config/config.env"})
const PORT=process.env.PORT
const app=express()
const userRoute=require('./routes/userR')
const blogRoutes=require('./routes/blogR')
require('./config/db')

app.use(express.json())
app.use(cors())

app.use('/user',userRoute)
app.use('/blog',blogRoutes)
app.listen(PORT,()=>{
    console.log(`Server Running on http://localhost:${PORT}`);
})