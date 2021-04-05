const { Router } = require('express');
const { protect } = require('../controllers/auth');
const { getQuotes, createQuote } = require('../controllers/quotes');
// const passport = require('passport');

// const protect = passport.authenticate('jwt', { session: false });
const router = Router();

router.use(protect);
router.route('/').get(getQuotes).post(createQuote);

module.exports = router;
