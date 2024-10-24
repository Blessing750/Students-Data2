const mongoose=require("mongoose")

const userSchema = mongoose.Schema({
    fullname:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    age:{
        type: Number,
        required: true
    },
    password:{
        type: String,
        required: true
    },

},{timestamps:true})

module.exports=mongoose.model("User", userSchema)