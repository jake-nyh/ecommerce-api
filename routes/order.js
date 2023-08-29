const { createOrderHandler, 
        updateOrderStatusHandler, 
        deleteOrderHandler, 
        getOrdersHandler,
        getAllOrderHandler } = require("../controllers/orderController");
const { verifyAccessTokenAndAuthorization, verifyAccessTokenAndisAdmin } = require("../middleware/authMiddleware");


const router = require("express").Router();

//create order
router.post("/create/:id", verifyAccessTokenAndAuthorization, createOrderHandler)

//update order status
router.put("/:id", verifyAccessTokenAndisAdmin, updateOrderStatusHandler)

//delete user order 
router.delete("/:id",  deleteOrderHandler)

//get user order
router.get("/:id", verifyAccessTokenAndAuthorization, getOrdersHandler)

//get all order
router.get("/", verifyAccessTokenAndisAdmin, getAllOrderHandler)

module.exports = router