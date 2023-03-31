const mongoose =require('mongoose')

mongoose.set(`strictPopulate`,false)
mongoose.set(`strictQuery`,false)

mongoose.connect(process.env.DB).then(()=>{
    console.log(`Connected`)
}).catch((e)=>{console.log(e);})