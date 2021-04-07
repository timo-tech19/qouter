import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';

import userReducer from './reducers/user';
import quotesReducer from './reducers/quotes';

const store = configureStore({
    reducer: {
        user: userReducer,
        quotes: quotesReducer,
    },
    middleware: [logger],
});

export default store;
