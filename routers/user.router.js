const router = require('express').Router();
const { getInfor, updateInfor, createNewInfor, removeInfor, uploadAvatar } = require('../controllers/user.controller');
const { verifyTok } = require('../middlewares/auth');
const { checkEmail, checkPhone } = require('../middlewares/checkData');
const upload = require('../middlewares/upload')

router.put("/upload/:id/users", upload.single('file'), uploadAvatar)
router.post('/accounts/creatProfile', checkEmail, checkPhone, createNewInfor)
router.get('/:accountId/getInfor', verifyTok, getInfor)
router.put('/:accountId/updateInfor', verifyTok, updateInfor)

router.delete('/:accountId/deleteInfor', verifyTok, removeInfor)




module.exports = router;
