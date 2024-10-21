const express = require("express");
const router=express.Router()
const validateToken = require("../middleware/auth")

router.get("/",validateToken,(req,res)=> {
    res.render("home", {user: req.userData});
})

router.get("/signup",(req,res)=> {
    res.render("signup")
})

router.get("/login",(req,res)=> {
    res.render("login", { messages: req.flash("error") });
})

module.exports=router