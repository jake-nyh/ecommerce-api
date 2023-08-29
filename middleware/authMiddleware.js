const jwt = require('jsonwebtoken')
require('dotenv').config()
 
const verifyAccessToken = async(req, res, next)=>{
    const {token}= req.headers
    if(token){
        const accessToken = token.split(" ")[1]
        jwt.verify(accessToken, process.env.JWT_ACCESS_SEC ,(err,decoded)=>{
            if(err){
                return res.status(403).json("token is not valid")
            }
            req.user = decoded
            next();
        })
    }else{
        return res.status(401).json("You are not authenticated!")
    }
}

const verifyAccessTokenAndAuthorization = async(req,res,next)=>{
    verifyAccessToken(req,res, ()=>{
        const {id,isAdmin} = req.user
        
            if(id === req.params.id || isAdmin){
                next()
            }else{
                res.status(403).json("You are not allowed to do that!")
            }
    })
}

const verifyAccessTokenAndisAdmin = async(req,res,next)=>{
    verifyAccessToken(req,res, ()=>{
        const {isAdmin} = req.user
            if(isAdmin){
                next()
            }else{
                res.status(403).json("You are not allowed to do that!")
            }
    })
}

module.exports = {
    verifyAccessToken,
    verifyAccessTokenAndAuthorization,
    verifyAccessTokenAndisAdmin
}