const { Router } = require('express');
const { protect } = require('../controllers/auth');
const { createComment } = require('../controllers/comment');
const {
    getQuotes,
    createQuote,
    likeQuote,
    requote,
    getQuote,
} = require('../controllers/quotes');

const router = Router();

router.use(protect);
router.route('/').get(getQuotes).post(getQuotes).post(createQuote);
router.route('/:id/like').patch(likeQuote);
router.route('/:id/requote').post(requote);
router.route('/:id/comment').post(createComment);

module.exports = router;
