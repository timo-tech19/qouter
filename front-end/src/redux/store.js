import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';

import userReducer from './reducers/user';

const store = configureStore({
    reducer: {
        user: userReducer,
    },
    middleware: [logger],
});

export default store;
