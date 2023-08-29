const User = require("../models/userModel");
const bcrypt = require('bcrypt')
const asyncHandler = require('express-async-handler');
const validateMongodbId = require("../utils/validateId");
const saltRounds = 10

const updateUserHandler = asyncHandler(async (req,res)=>{
    let {password} = req.body
    const {id} = req.params
    validateMongodbId(id)

    if(password){
        req.body.password = bcrypt.hashSync(password, saltRounds);
    }
      const updatedUser = await User.findByIdAndUpdate(id,{
        $set : req.body
      },{new : true});
  
      res.json(updatedUser)
  })

  const deleteUserHandler = asyncHandler(async(req, res)=>{
    const {id} = req.params
    validateMongodbId(id)

    await User.findByIdAndDelete(id)
   res.json("user is successfully deleted")

  })

  const getUserHandler = asyncHandler(async(req, res)=>{
    const {id} = req.params
    validateMongodbId(id)

    const user = await User.findById(id)
    res.json(user)
  })

  const getAllUsersHandler = asyncHandler(async(req, res)=>{
    const users = await User.find()
    res.json(users)
  })

  module.exports = {
    updateUserHandler,
    deleteUserHandler,
    getUserHandler,
    getAllUsersHandler
  }