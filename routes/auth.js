const { Router } = require('express');
const {
    login,
    register,
    protect,
    authorizeUser,
} = require('../controllers/auth');

const router = Router();
// router.get('/', getUser);
router.post('/login', login);
router.post('/register', register);
router.post('/authorize-user', protect, authorizeUser);

module.exports = router;
