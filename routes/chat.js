const { Router } = require('express');
const { protect } = require('../controllers/auth');
const {
    createChat,
    getChats,
    getChat,
    updateChat,
} = require('../controllers/chats');

const router = Router();

router.use(protect);

router.route('/').post(createChat).get(getChats);
router.route('/:id').get(getChat).patch(updateChat);

module.exports = router;
