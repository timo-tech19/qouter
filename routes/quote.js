const { Router } = require('express');
const { protect } = require('../controllers/auth');
const { createComment } = require('../controllers/comment');
const {
    getQuotes,
    createQuote,
    agreeWithQuote,
    requote,
    getQuote,
} = require('../controllers/quotes');

const router = Router();

router.use(protect);
router.route('/').get(getQuotes).post(createQuote);
router.route('/:id').get(getQuote);
router.route('/:id/agree').patch(agreeWithQuote);
router.route('/:id/requote').post(requote);
router.route('/:id/comment').post(createComment);

module.exports = router;
