const { createCartHandler, 
        updateCartHandler, 
        deleteCartHandler, 
        getCartHandler, 
        getAllCartHandler } = require("../controllers/cartController");
const { verifyAccessTokenAndAuthorization } = require("../middleware/authMiddleware");


const router = require("express").Router();

//create cart
router.post("/create/:id", verifyAccessTokenAndAuthorization, createCartHandler)

//update user
router.put("/:id",verifyAccessTokenAndAuthorization, updateCartHandler)

//delete user
router.delete("/:id", verifyAccessTokenAndAuthorization, deleteCartHandler)

//get user
router.get("/:id", verifyAccessTokenAndAuthorization, getCartHandler)

//get all users
router.get("/",  getAllCartHandler)

module.exports = router