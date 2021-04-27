const { Router } = require('express');
const { protect } = require('../controllers/auth');

const { getQuotes } = require('../controllers/quotes');
const { getUser } = require('../controllers/users');

const router = Router();

router.use(protect);
router.route('/:userName').get(getUser);
router.route('/:userId/quotes').get(getQuotes);

module.exports = router;
