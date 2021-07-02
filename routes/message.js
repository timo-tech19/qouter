const { Router } = require('express');
const { protect } = require('../controllers/auth');
const {} = require('../controllers/messages');

const router = Router();

router.use(protect);

router.route('/').post(createMessage);

module.exports = router;
