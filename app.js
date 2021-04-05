const express = require('express');
const cors = require('cors');
const session = require('express-session');
const MongoStore = require('connect-mongo');

const connection = require('./config/db');
const authRouter = require('./routes/auth');
const quoteRouter = require('./routes/quote');
const passport = require('passport');

const app = express();

app.use(cors());
app.use(express.json());
app.use(passport.initialize());
require('./config/passport')(passport);

//Mount Routes
app.get('/', function (req, res) {
    res.send('hello');
});
app.use('/api/v1/users', authRouter);
app.use('/api/v1/quotes', quoteRouter);

module.exports = app;
