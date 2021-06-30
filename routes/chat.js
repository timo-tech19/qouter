const { Router } = require('express');
const { protect } = require('../controllers/auth');
const { createChat, getChats, getChat } = require('../controllers/chats');

const router = Router();

router.use(protect);

router.route('/').post(createChat);
router.route('/').get(getChats);
router.route('/:id').get(getChat);

module.exports = router;
