const jwt = require("jsonwebtoken")
require("dotenv").config()

const resetPasswordToken = (userId,isAdmin)=>{
    return jwt.sign({
                        id : userId,
                        isAdmin : isAdmin
                    }, 
                    process.env.JWT_RESETPASSWORD_SEC,
                    {
                         expiresIn : "3d"
                    })
}

module.exports = resetPasswordToken