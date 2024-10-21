const mongoose = require("mongoose")

const connectDb=async()=>{
    await mongoose.connect(process.env.CONNECTION_STRING)
    .then(()=>console.log("Database connected successfully"))
    .catch(err=>process.exit(1));
}

module.exports=connectDb
