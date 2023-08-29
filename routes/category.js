const { createCategoryHandler,
        updateCategoryHandler,
        deleteCategoryHandler,
        getCategoryHandler,
        getAllCategoryHandler} = require("../controllers/categoryController");
        
const { verifyAccessTokenAndisAdmin } = require("../middleware/authMiddleware");
const router = require("express").Router();

//create category
router.post('/create', verifyAccessTokenAndisAdmin , createCategoryHandler)

//update category
router.put("/:id", verifyAccessTokenAndisAdmin, updateCategoryHandler)

//delete category
router.delete("/:id", verifyAccessTokenAndisAdmin, deleteCategoryHandler)

//get category
router.get("/:id",  getCategoryHandler)

//get all categories
router.get("/",  getAllCategoryHandler)

module.exports = router