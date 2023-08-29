const Category = require("../models/categoryModel")
const asyncHandler = require("express-async-handler")
const validateMongodbId = require("../utils/validateId")

const createCategoryHandler = asyncHandler(async(req, res)=>{
    try{
        const newCategory = await Category.create(req.body)
        res.status(201).json(newCategory)
    }catch(err){
        throw new Error(err)
    }
})

const updateCategoryHandler = asyncHandler(async (req,res)=>{
    try{
        const {id} = req.params
        validateMongodbId(id)
        const updatedCategory = await Category.findByIdAndUpdate(id,{
        $set : req.body
      },{new : true});
  
      res.status(200).send(updatedCategory)
    }catch(err){
      throw new Error(err)
    }
  })

  const deleteCategoryHandler = asyncHandler(async(req, res)=>{
   try{
        const {id} = req.params
        validateMongodbId(id)
        await Category.findByIdAndDelete(id)
        res.status(200).send("Category is successfully deleted")
    }catch(err){
        throw new Error(err)
    }
  })

  const getCategoryHandler = asyncHandler(async(req, res)=>{
      try{
          const {id} = req.params
          validateMongodbId(id)
          const category = await Category.findById(id)
          res.status(200).send(category)
        }catch(err){
            throw new Error(err)
        }
  })

  const getAllCategoryHandler = async(req, res)=>{
      try{
          const categories  = await Category.find()
          res.status(200).send(categories)
        }catch(err){
            throw new Error(err)
        }
  }

  module.exports = {
    createCategoryHandler,
    updateCategoryHandler,
    deleteCategoryHandler,
    getCategoryHandler,
    getAllCategoryHandler
  }