const { Router } = require('express');
const { protect } = require('../controllers/auth');
const {
    getQuotes,
    createQuote,
    agreeWithQuote,
} = require('../controllers/quotes');
// const passport = require('passport');

// const protect = passport.authenticate('jwt', { session: false });
const router = Router();

router.use(protect);
router.route('/').get(getQuotes).post(createQuote);
router.route('/:id/agree').patch(agreeWithQuote);

module.exports = router;
