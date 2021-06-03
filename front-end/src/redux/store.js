import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';

import userReducer from './reducers/user';
import quotesReducer from './reducers/quotes';
import modalReducer from './reducers/modal';

const store = configureStore({
    reducer: {
        user: userReducer,
        quotes: quotesReducer,
        modal: modalReducer,
    },
});

export default store;
