const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true,
        unique : true
    },
    email : {   
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        require : true,
    },
    isAdmin : {
        type : Boolean,
        default : false
    },
    cart : {
        type : Array,
        default : []
    },
    address : {
        type : String,
        required : true
    },
    wishList : {
        type : Array,
        default : []
    },
    refreshToken : {
        type : String
    }
},{
    timestamps : true
})

const User = mongoose.model("User",userSchema)
module.exports = User;