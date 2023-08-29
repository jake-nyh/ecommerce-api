const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({
    products : [
        {
            product : {
                type : mongoose.Schema.Types.ObjectId,
                ref : 'Product'
            },
            count : {
                type : Number
            },
            color : {
                type : String
            },
            price : {
                type : Number
            }
        }
    ],
    totalAmount : {
        type : Number
    },
    status : {
        type : String,
        default : 'Not processed',
        enum : [
            'Not processed',
            'Cash on delivery',
            'Processing',
            'Dispatched',
            'Cancelled',
            'Delivered'
        ]
    },
    orderBy : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    }
},{
    timestamps : true
})

const Cart = mongoose.model("Cart",cartSchema)
module.exports = Cart;