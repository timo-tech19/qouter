const { Router } = require('express');
const { protect } = require('../controllers/auth');

const { getQuotes } = require('../controllers/quotes');
const { getUser, followUser } = require('../controllers/users');

const router = Router();

router.use(protect);
router.route('/:userName').get(getUser);
router.route('/:userId/quotes').get(getQuotes);
router.route('/:userId/follow').patch(followUser);

module.exports = router;
