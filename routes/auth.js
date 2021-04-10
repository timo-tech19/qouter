const { Router } = require('express');
const { login, register, getUser } = require('../controllers/auth');

const router = Router();
// router.get('/', getUser);
router.post('/login', login);
router.post('/register', register);

module.exports = router;
