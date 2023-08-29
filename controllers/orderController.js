const Order = require("../models/orderModel")
const asyncHandler = require("express-async-handler")
const validateMongodbId = require("../utils/validateId")
const User = require("../models/userModel")
const Cart = require("../models/cartModel")
const uniqid = require('uniqid')
const Product = require("../models/productModel")

const createOrderHandler = asyncHandler(async(req, res)=>{
   const {id} = req.params
   validateMongodbId(id)
   try{
        const user = await User.findById(id)
        const userCart = await Cart.findOne({orderBy : user._id})
        const newOrder = new Order({
          products : userCart.products,
          paymentIntent : {
            id : uniqid(),
            method : "COD",
            amount : userCart.totalAmount,
            status : "Cash on delivery",
            created : new Date(Date.now()).toISOString(),
            currency : "usd"
          },
          status : "Cash on delivery",
          orderBy : user._id,
        })
        const saveOrder = await newOrder.save()
        res.status(201).json(saveOrder)
        // for (const element of cart) {
        //   console.log(element.productId)
        //   await Product.updateOne(element.productId,{

        //   })
        // };
    }catch(err){
        throw new Error(err)
    }
})

const updateOrderStatusHandler = async (req,res)=>{
    
    try{
      const updatedOrder = await Order.findByIdAndUpdate(id,{
        $set : req.body
      },{new : true});
  
      res.status(200).send(updatedOrder)
    }catch(err){
      res.status(500).send(err)
    }
  }

  const deleteOrderHandler = async(req, res)=>{
    const {id} = req.params
      try{
          await Order.findByIdAndDelete(id)
          res.status(200).send("Order is successfully deleted")
      }catch(err){
          res.status(500).send(err)
      }
  }

  const getOrdersHandler = async(req, res)=>{
    const {id} = req.params
      try{
          const orders = await Order.findOne({orderBy : id}).populate("products.product").exec()
          res.status(200).send(orders)
      }catch(err){ 
          res.status(500).send(err)
      }
  }

  const getAllOrderHandler = async(req, res)=>{
      try{
          const orders  = await Cart.find()
          res.status(200).send(orders)
      }catch(err){
          res.status(500).send(err)
      }
  }

  module.exports = {
    createOrderHandler,
    updateOrderStatusHandler,
    deleteOrderHandler,
    getOrdersHandler,
    getAllOrderHandler
  }