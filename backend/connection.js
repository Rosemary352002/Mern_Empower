const mongoose =require('mongoose');
//connect to mongodb
require('dotenv').config()
console.log(process.env)
mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("connected to db")
    })
    .catch((error)=>{
        console.log(error)
    })