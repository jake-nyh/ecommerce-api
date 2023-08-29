const Brand = require("../models/brandModel")
const asyncHandler = require("express-async-handler")
const validateMongodbId = require("../utils/validateId")

const createBrandHandler = asyncHandler(async(req, res)=>{
    try{
        const newBrand = await Brand.create(req.body)
        res.status(201).json(newBrand)
    }catch(err){
        throw new Error(err)
    }
})

const updateBrandHandler = asyncHandler(async (req,res)=>{
    try{
        const {id} = req.params
        validateMongodbId(id)
        const updatedBrand = await Brand.findByIdAndUpdate(id,{
        $set : req.body
      },{new : true});
  
      res.status(200).send(updatedBrand)
    }catch(err){
      throw new Error(err)
    }
  })

  const deleteBrandHandler = asyncHandler(async(req, res)=>{
   try{
        const {id} = req.params
        validateMongodbId(id)
        await Brand.findByIdAndDelete(id)
        res.status(200).send("Category is successfully deleted")
    }catch(err){
        throw new Error(err)
    }
  })

  const getBrandHandler = asyncHandler(async(req, res)=>{
      try{
          const {id} = req.params
          validateMongodbId(id)
          const brand = await Brand.findById(id)
          res.status(200).send(brand)
        }catch(err){
            throw new Error(err)
        }
  })

  const getAllBrandHandler = async(req, res)=>{
      try{
          const brands  = await Category.find()
          res.status(200).send(brands)
        }catch(err){
            throw new Error(err)
        }
  }

  module.exports = {
    createBrandHandler,
    updateBrandHandler,
    deleteBrandHandler,
    getBrandHandler,
    getAllBrandHandler
  }