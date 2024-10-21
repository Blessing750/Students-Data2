const User = require("../models/user")
const bcryptjs = require('bcryptjs');
const jwt = require("jsonwebtoken")

const userSignup = async(req, res) => {
    console.log(req.body)
    const {fullname,email,age,password}=req.body

    if(!fullname || !email || !age || !password) {
        res.status(400).json({message:"Please fill all fields properly"})
    }

    const existingUser = await User.findOne({email})
    if (existingUser) {
        res.status(400).json({message:"User already exist"})
    }
    const hashPassword = await bcryptjs.hash(password, 10);
    const user = await User.create({
        fullname,
        email,
        age,
        password:hashPassword
    });
    const token=jwt.sign(
        {email:user.email,fullname:user.fullname,id:user. id},
        process.env.SECRET_KEY
    );
    res.cookie("token",token)
    res.redirect("/")
};

const userLogin = async (req,res) => {
    const {email,password}=req.body
    const user = await User.findOne({email});

    if(!user) {
        res.status("error","User not found")
        return res.redirect("/login")
       // res.status(404).json({message: "User not found"});
    }
    if(user && (await bcryptjs.compare(password,user.password))) {
        const token=jwt.sign(
            {email:user.email,fullname:user.fullname,id:user. id},
            process.env.SECRET_KEY
        );
        res.cookie("token",token)
        return res.redirect("/")
    }
    else{
        res.status("error","Invalid Details")
        return res.redirect("/login")
    }
};


module.exports = { userSignup,userLogin}; 