const Cart = require("../models/cartModel")
const Product = require("../models/productModel")
const User = require("../models/userModel")
const asyncHandler = require('express-async-handler')
const validateMongodbId = require("../utils/validateId")


const createCartHandler = asyncHandler(async(req, res)=>{
  const {id} = req.user
  validateMongodbId(id)
  const {cart} = req.body
    try{
        const user = await User.findById(id)

        //check if cart exist and remove if it is
        await Cart.findOneAndRemove({orderBy : user._id})

        let products = []
        let totalAmount = 0

        for (const element of cart) {
       
          let getPrice = await Product.findById(element.productId).select("price").exec()
        
          let cartObj = {
            product : element.productId,
            count : element.count,
            color : element.color,
            price : getPrice.price
          }
         
          products.push(cartObj)
         
          totalAmount += getPrice.price * element.count
        
        };

        let newCart = await new Cart({
          products,
          totalAmount,
          orderBy : id
        }).save()
        
        res.status(201).json(newCart)
    }catch(err){
        throw new Error(err)
    }
} )

const updateCartHandler = asyncHandler(async (req,res)=>{
    const {id} = req.params
    const {count, color} = req.body
    try{
      const user = await User.findById(id)
      console.log(user)
      const updatedCart = await Cart.findOneAndUpdate(
        {orderBy : user._id},
        { $set: { 'items.$.count': count, 'items.$.color': color } },
        {new : true});
        
      res.json(updatedCart)
    }catch(err){
      res.status(500).send(err)
    }
  })

  const deleteCartHandler = asyncHandler(async(req, res)=>{
    const {id} = req.params
      try{
        const user = await User.findById(id)
        const deleteCart = await Cart.findOneAndRemove({orderBy : user._id})
        res.json(deleteCart)
      }catch(err){
         throw new Error(err)
  }
})

  const getCartHandler = asyncHandler(async(req, res)=>{
    const {id} = req.params
      try{
          const user = await User.findById(id)
          const cart = await Cart.findOne({orderBy : user._id}).populate("products.product")
          res.json(cart)
      }catch(err){ 
          throw new Error(err)
      }
  })

  const getAllCartHandler = async(req, res)=>{
      try{
          const carts  = await Cart.find()
          res.status(200).send(carts)
      }catch(err){
          res.status(500).send(err)
      }
  }

  module.exports = {
    createCartHandler,
    updateCartHandler,
    deleteCartHandler,
    getCartHandler,
    getAllCartHandler
  }