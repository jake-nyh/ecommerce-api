const { updateUserHandler, 
        deleteUserHandler, 
        getUserHandler, 
        getAllUsersHandler } = require("../controllers/userController");

const { verifyAccessTokenAndAuthorization, 
        verifyAccessTokenAndisAdmin } = require("../middleware/authMiddleware");


const router = require("express").Router();


//update user
router.put("/:id", verifyAccessTokenAndAuthorization, updateUserHandler)

//delete user
router.delete("/:id", verifyAccessTokenAndAuthorization, deleteUserHandler)

//get user
router.get("/:id", verifyAccessTokenAndisAdmin, getUserHandler)

//get all users
router.get("/", verifyAccessTokenAndisAdmin, getAllUsersHandler)

module.exports = router