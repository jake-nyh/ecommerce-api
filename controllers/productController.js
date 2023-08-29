const { default: slugify } = require("slugify")
const Product = require("../models/productModel")
const asyncHandler = require("express-async-handler")
const User = require("../models/userModel")
const cloudinary = require("../utils/cloudinary")

const createProductHandler = asyncHandler(async(req, res)=>{
  try{
    const {title} = req.body
    if(title){
      req.body.slug = slugify(title)
    }
    const newProduct = await Product.create(req.body)
    res.json(newProduct)
  }catch(err){
    throw new Error(err)
  }
} )

const updateProductHandler = asyncHandler(async (req,res)=>{
    const {id} = req.params
    try{
      const {title} = req.body
      if(title){
        req.body.slug = slugify(title)
      }
      const updatedProduct = await Product.findByIdAndUpdate(id,{
        $set : req.body
      },{new : true});
      res.status(200).send(updatedProduct)
    }catch(err){
      throw new Error(err)
    }
  })

  const deleteProductHandler = asyncHandler(async(req, res)=>{
    const {id} = req.params
      try{
          await Product.findByIdAndDelete(id)
          res.status(200).send("user is successfully deleted")
      }catch(err){
         throw new Error(err)
      }
  })

  const getProductHandler = asyncHandler(async(req, res)=>{
    const {id} = req.params
      try{
          const product = await Product.findById(id)
          res.status(200).send(product)
      }catch(err){
          throw new Error(err)
      }
  })

  const getAllProductHandler = asyncHandler(async(req, res)=>{
      try{
          const users = await Product.find()
          res.status(200).send(users)
      }catch(err){
          throw new Error(err)
      }
  })

  const addToWishListHandler = asyncHandler(async(req, res)=>{
    try{
      const {id} = req.user
      const {productId} = req.body
      let user = await User.findById(id)
      const alreadyAdded = user.wishList.find((id)=> id.toString() === productId )
      console.log(alreadyAdded)
      if(alreadyAdded){
        let updatedUser = await User.findByIdAndUpdate(id,
          {
            $pull : { wishList : productId}
          },
          {
            new : true
          })
          return res.json(updatedUser)
      }else{
        let updatedUser = await User.findByIdAndUpdate(id,
          {
            $push : { wishList : productId}
          },
          {
            new : true
          })
          return res.json(updatedUser)
      }
    }catch(err){
      throw new Error(err)
    }
  })

  const ratingHandler = asyncHandler(async(req, res)=>{
    try{ 
      const {id} = req.user 
      const {star, comment, productId} = req.body
      const product = await Product.findById(productId)
      const alreadyrated = product.rating.find((userId)=> userId.postedBy.toString() === id)
      if(alreadyrated){
        let updatedRating = await Product.updateOne(
          {
            rating : { $elemMatch : alreadyrated}
          },
          {
            $set : { "rating.$.star" : star,
                      "rating.$.comment" : comment}
          },
          {
            new : true
          })
          return res.json(updatedRating)
      
      }else{
        let updatedProduct = await Product.findByIdAndUpdate(productId,
          {
            $push : { 
              rating : {
                star : star, 
                comment : comment,
                postedBy : id
              }}
          },
          {
            new : true
          })

          return res.json(updatedProduct)
      }
    }catch(err){
      throw new Error(err)
    }
  })

  const uploadImageHandler = asyncHandler(async(req,res)=>{
    const {id} = req.params
    try{
      const result = await cloudinary.uploader.upload(req.file.path)
      const product = await Product.findByIdAndUpdate(id,{
        img : {
          url : result.secure_url
        }
      },{
        new : true
      })
      res.json(product)

    }catch(err){
      throw new Error(err)
    }
  }) 

  module.exports = {
    createProductHandler,
    updateProductHandler,
    deleteProductHandler,
    getProductHandler,
    getAllProductHandler,
    addToWishListHandler,
    ratingHandler,
    uploadImageHandler
  }
  