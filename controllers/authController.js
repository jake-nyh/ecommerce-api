const User = require("../models/userModel");
const bcrypt = require('bcrypt');
const asyncHandler = require('express-async-handler');
const generateAccessToken = require("../config/jwtToken");
const generateRefreshToken = require("../config/refreshToken");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const resetPasswordToken = require("../config/resetPasswordToken");
const validateMongodbId = require("../utils/validateId");
const transporter = require("../utils/nodemailer");
require("dotenv").config();

//register
const authRegister = asyncHandler(async(req,res)=>{
    const {username, email, password} = req.body;
    const hash = bcrypt.hashSync(password, saltRounds);
    const newUser = new User({
      username ,
      email,
      password : hash
    })
    const findUser = await User.findOne({email})
    if(!findUser){
      const savedUser = await newUser.save();
      res.json(savedUser)

    transporter.sendMail({
        from : process.env.SENDER_MAIL,
        to : email,
        subject : "Register Successful",
        html : "<h1>Register account successful<h1><p>created an account using this email address<p>"
      },(err)=>{
        throw new Error(err)
      })

    }else{
      throw new Error("User already exists")
    }
  })

//login
const authLogin = asyncHandler(async (req,res)=>{
    const {username, password} = req.body;
    
        const user = await User.findOne({username})
        const isPassword = bcrypt.compareSync(password, user.password);
        if(user && isPassword){
          const {_id, isAdmin} = user;
          const refreshToken = generateRefreshToken(_id,isAdmin)
          const accessToken = generateAccessToken(_id,isAdmin)
          const updatedUser = await User.findByIdAndUpdate(
            _id,
            {
              "refreshToken" : refreshToken
            },
            {
              new : true
            }
          )

          res.cookie("refreshToken", refreshToken, {
            httpOnly : true,
            maxAge : 72 * 60 * 60 * 1000,
            secure : true
          })
          
          res.json({
            ...updatedUser._doc,
            "accessToken" : accessToken,
          })  
        } 
  })

  //Refresh token 
  const refreshToken = asyncHandler(async(req,res)=>{
    const {refreshToken} = req.cookies

    if(!refreshToken) {
      throw new Error("There is no refresh token in cookies")
    }

    const user = await User.findOne({"refreshToken" : refreshToken})
    const {_id,isAdmin} = user; 
    if(!user){
      throw new Error("No User is matched with refresh token")
    }

    jwt.verify(refreshToken , process.env.JWT_REFRESH_SEC,(err,decoded)=>{
    
      if(err ){
         throw new Error("something wrong with refresh token")
      }

    const accessToken = generateAccessToken(decoded._id, decoded.isAdmin)
    res.json({accessToken})

  })
})

//logout
const authLogout = asyncHandler( async(req, res)=>{
    const {refreshToken} = req.cookies

    if(!refreshToken) {
      throw new Error("There is no refresh token in cookies")
    }

    const user = await User.findOne({"refreshToken" : refreshToken})
    const {_id} = user;
    
    if(!user){
      res.clearCookie("refreshToken",{
        httpOnly : true,
        secure : true
      })
      return res.sendStatus(204)
    }
    
    await User.findOneAndUpdate({"refreshToken" : refreshToken},{
      "refreshToken" : ""
    })
    res.clearCookie("refreshToken",{
      httpOnly : true,
      secure : true
    })
    res.sendStatus(204)
  })

  //forgot-password
  const forgotPassword = asyncHandler(async(req,res)=>{
    try{
      const {email } = req.body
      const user = await User.findOne({"email" : email})
      if(!user){
        throw new Error("this email is not found")
      }
      const token = resetPasswordToken(user._id, user.isAdmin)
      transporter.sendMail({
        from : process.env.SENDER_MAIL,
        to : email,
        subject : "Reset Password",
        text : `http://localhost:3000/api/auth/reset-password/${user._id}/${token}`
      },(err)=>{
        throw new Error(err)
      })
      res.json("successfully sent email")
    }catch(err){
      throw new Error(err)
    }
  })

//
const resetPassword = asyncHandler(async(req, res)=>{
    try{
      const {id, token} = req.params
    const {password} = req.body
    validateMongodbId(id)
    jwt.verify(token, process.env.JWT_RESETPASSWORD_SEC, async (err,decoded)=>{
      if(err){
        throw new Error("Token is invalid")
      }

      const hash = bcrypt.hashSync(password, saltRounds);
      const updatedUser = await User.findByIdAndUpdate(id,{
        "password" : hash
      },{new : true});
      console.log(updatedUser)
      res.json({
        "status" : "successfully changed your password",
        updatedUser})

    })
    }catch(err){
      throw new Error(err)
    }
  })

  module.exports = {
    authRegister,
    authLogin,
    refreshToken,
    authLogout,
    forgotPassword,
    resetPassword
  }