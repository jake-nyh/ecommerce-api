const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true,
        unique : true
    },
    slug :{
        type : String,
        unique : true
    },
    desc : {
        type : String,
        required : true
    },
    img : {
        url : {
            type : String
        }
    },
    category : {
        type : String,
        reqluired : true
    },
    brand : {
        type : String,
        required : true
    },
    quantity : {
        type : Number,
        required : true
    },
    color : {
        type : String,
        required : true
    },
    price : {
        type : Number,
        required : true
    },
    rating : [{
        star : Number,
        comment : String,
        postedBy : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "User"
        }
        }]
},{
    timestamps : true
})

const Product = mongoose.model("Product",productSchema)
module.exports = Product;