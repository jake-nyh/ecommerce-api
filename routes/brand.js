const { createBrandHandler,
    updateBrandHandler,
    deleteBrandHandler,
    getBrandHandler,
    getAllBrandHandler} = require("../controllers/brandController");
    
const { verifyAccessTokenAndisAdmin } = require("../middleware/authMiddleware");
const router = require("express").Router();

//create brand
router.post('/create', verifyAccessTokenAndisAdmin , createBrandHandler)

//update brand
router.put("/:id", verifyAccessTokenAndisAdmin, updateBrandHandler)

//delete brand
router.delete("/:id", verifyAccessTokenAndisAdmin, deleteBrandHandler)

//get brand
router.get("/:id", getBrandHandler)

//get all brands
router.get("/", getAllBrandHandler)

module.exports = router