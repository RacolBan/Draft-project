const router = require('express').Router();
const { getProfile, newProfile } = require('../controllers/user.controller')

router.put('/:accountId/creatProfile', newProfile)
router.get('/:accountId/profile', getProfile)






module.exports = router;
