const router = require('express').Router();
const { getCategory, initCategory, updateCategory, removeCategory,  getCategoryByCategoryId } = require('../controllers/category.controller.js');
const { verifyTok } = require('../middlewares/auth.js');
const { isAdmin } = require('../middlewares/permission.js');


router.get("/", getCategory);
// router.get("/categories/:categoryId", getCategoryByCategoryId);


router.post("/",verifyTok,isAdmin, initCategory)
// router.put("/category/:categoryId", verifyTok, isAdmin, updateCategory)
// router.delete("/categories/:categoryId", verifyTok, isAdmin, removeCategory)


module.exports = router;
