import { createSlice } from '@reduxjs/toolkit';

const quotesSlice = createSlice({
    name: 'quotes',
    initialState: [],
    reducers: {
        loadQuotes(state, action) {
            // create quotes collection
            return action.payload;
        },
        validateQuote(state, { payload }) {
            // find quote in state.quotes
            const quote = state[1];

            console.log(quote);
            // update validates array
            // state.quotes[quoteIndex] = payload;
        },
    },
});

export const { loadQuotes, validateQuote } = quotesSlice.actions;

export default quotesSlice.reducer;
