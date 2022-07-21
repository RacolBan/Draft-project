const router = require('express').Router();
const { getInfor, updateInfor, createNewInfor, removeInfor } = require('../controllers/user.controller')
const { verifyTok } = require('../middlewares/auth')
const { checkEmail, checkPhone } = require('../middlewares/checkData')

router.post('/:accountId/creatProfile', checkEmail, checkPhone, createNewInfor)
router.get('/:accountId/getInfor', verifyTok, getInfor)
router.put('/:accountId/updateInfor', verifyTok, updateInfor)

router.delete('/:accountId/deleteInfor', verifyTok, removeInfor)




module.exports = router;
