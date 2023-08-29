const { createProductHandler, 
        updateProductHandler, 
        deleteProductHandler, 
        getProductHandler, 
        getAllProductHandler, 
        addToWishListHandler,
        ratingHandler,
        uploadImageHandler} = require("../controllers/productController");
        
const { verifyAccessTokenAndisAdmin, verifyAccessTokenAndAuthorization } = require("../middleware/authMiddleware");
const upload = require("../middleware/multer");

const router = require("express").Router();

//create product
router.post('/create', verifyAccessTokenAndisAdmin, createProductHandler)

//update product
router.put("/edit/:id", verifyAccessTokenAndisAdmin, updateProductHandler)

//delete product
router.delete("/:id", verifyAccessTokenAndisAdmin, deleteProductHandler)

//get product
router.get("/:id", getProductHandler)

//get all products
router.get("/", getAllProductHandler)

//add to wishlist and delete if it's in whishlist
router.put("/wishlist", verifyAccessTokenAndAuthorization, addToWishListHandler)

//rating
router.put("/rating",verifyAccessTokenAndAuthorization, ratingHandler)

//upload image
router.put("/upload/:id", verifyAccessTokenAndisAdmin, upload.single('image'), uploadImageHandler)

module.exports = router