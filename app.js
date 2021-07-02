const express = require('express');
const cors = require('cors');
const authRouter = require('./routes/auth');
const quoteRouter = require('./routes/quote');
const userRouter = require('./routes/user');
const chatRouter = require('./routes/chat');
const messageRouter = require('./routes/message');

const globalErrorHandler = require('./controllers/errorController');
const AppError = require('./utils/appError');

const app = express();

// Implement Cors and bodyParser
app.use(cors());
app.use(express.json());

//Mount Routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/quotes', quoteRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/chats', chatRouter);
app.use('/api/v1/messages', messageRouter);

app.all('*', (req, res, next) => {
    next(new AppError(`Cannot find ${req.originalUrl} on this server`, 404));
});

// Mount global error handler
app.use(globalErrorHandler);

module.exports = app;
