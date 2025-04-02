const express=require("express");
const User = require("../models/user");
const {v4:uuidv4}=require("uuid");
const {setUser}=require("../service/authen");  

async function handleUserSignUp(req,res){
   const body=req.body;
   await User.create({
      name:body.name,
      email:body.email,
      password:body.password,
   });
   return res.render("home");
}

async function handleUserLogin(req,res){
   const body=req.body;
   const email=body.email;
   const password=body.password;
   const user=await User.findOne({email,password});
   if(!user){
      return res.render("login",{
         error:"Invalid Username or Password",
      });
   }

   // --> if all is correct and matches the session id is built
   const sessionID= uuidv4();
   setUser(sessionID, user);
   res.cookie("uid",sessionID);
   return res.redirect("/");
}

module.exports={
  handleUserSignUp,
  handleUserLogin,
}