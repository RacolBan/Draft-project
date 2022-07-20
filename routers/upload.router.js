const router = require("express").Router();
const upload = require('../middlewares/upload')
const { postUploadFile } = require('../controllers/upload.controller')

router.post("/upload/:id", upload.single('file'), postUploadFile)



module.exports = router;