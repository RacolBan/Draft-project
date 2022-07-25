const router = require('express').Router();
const { getInfor, updateInfor, createNewInfor, removeInfor, uploadAvatar, getAllInfor } = require('../controllers/user.controller');
const { verifyTok } = require('../middlewares/auth');
const { checkEmail, checkPhone } = require('../middlewares/checkData');
const { isAdmin } = require('../middlewares/permission');
const upload = require('../middlewares/upload')

router.get('/:accountId/getInfor', verifyTok, getInfor);
router.get('/getAll', getAllInfor);
router.post('/accounts/creatProfile', checkEmail, checkPhone, createNewInfor);
router.put("/upload/:id/users", upload.single('file'), uploadAvatar);
router.put('/:accountId/updateInfor', verifyTok, updateInfor);
router.delete('/:accountId/deleteInfor', verifyTok, removeInfor);




module.exports = router;
