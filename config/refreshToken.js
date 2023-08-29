const jwt = require("jsonwebtoken")
require("dotenv").config()

const generateRefreshToken = (userId,isAdmin)=>{
    return jwt.sign({
                        id : userId,
                        isAdmin : isAdmin
                    }, 
                    process.env.JWT_REFRESH_SEC,
                    {
                         expiresIn : "7d"
                    })
}

module.exports = generateRefreshToken