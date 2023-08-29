const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
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
            }
        }
    ],
    paymentIntent : {},
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

const Order = mongoose.model("Order",orderSchema)
module.exports = Order;