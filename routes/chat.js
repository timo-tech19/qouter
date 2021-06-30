const { Router } = require('express');
const { protect } = require('../controllers/auth');
const { createChat, getChats } = require('../controllers/chats');

const router = Router();

router.use(protect);

router.route('/').post(createChat);
router.route('/').get(getChats);

module.exports = router;
