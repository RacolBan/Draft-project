const router = require('express').Router();
const { initManufacturer, getManufacturer, updateManufacturer, removeManufacturer, getManufacturerById } = require('../controllers/manufacture.controller')
const { verifyTok } = require('../middlewares/auth.js');
const { isAdmin } = require('../middlewares/permission.js');


router.get("/manufacture", verifyTok, isAdmin, getManufacturer);
router.get("/:manufactureId/manufacture", getManufacturerById);
router.post("/manufacture", verifyTok, isAdmin, initManufacturer);
router.put("/:manufactureId/manufacture", verifyTok, isAdmin, updateManufacturer);
router.delete("/:manufactureId/manufacture", verifyTok, isAdmin, removeManufacturer);


module.exports = router;
