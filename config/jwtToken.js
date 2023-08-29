const jwt = require("jsonwebtoken")
require("dotenv").config()

const generateAccessToken = (userId, userIsAdmin)=>{
    return jwt.sign({
                        id : userId,
                        isAdmin : userIsAdmin
                    }, 
                    process.env.JWT_ACCESS_SEC,
                    {
                         expiresIn : "1d"
                    })
}

module.exports = generateAccessToken