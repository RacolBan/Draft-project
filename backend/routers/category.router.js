const router = require('express').Router();
const { getCategory, initCategory, updateCategory, removeCategory, getCategoryByManufactureId, getCategoryByCategoryId } = require('../controllers/category.controller.js');
const { verifyTok } = require('../middlewares/auth.js');
const { isAdmin } = require('../middlewares/permission.js');


router.get("/categories/", getCategory);
router.get("/manufacture/:manufactureId/categories", getCategoryByManufactureId);
router.get("/categories/:categoryId", getCategoryByCategoryId);


router.post("/manufacture/categories", verifyTok, isAdmin, initCategory)
router.put("/category/:categoryId", verifyTok, isAdmin, updateCategory)
router.delete("/categories/:categoryId", verifyTok, isAdmin, removeCategory)


module.exports = router;
