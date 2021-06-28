import { createSlice } from '@reduxjs/toolkit';
import { Axios } from '../../helpers/Axios';

export const postQuote = (quote) => async (dispatch) => {
    try {
        const { data } = await Axios({
            url: '/quotes',
            method: 'post',
            data: {
                content: quote,
            },
        });

        dispatch(createQuote(data.data));
    } catch (error) {
        console.log(error.response.data.message);
    }
};

const quotesSlice = createSlice({
    name: 'quotes',
    initialState: [],
    reducers: {
        createQuote(state, action) {
            state = [action.payload, ...state];
        },
        loadQuotes(state, action) {
            // create quotes collection
            state = action.payload;
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

export const { loadQuotes, validateQuote, createQuote } = quotesSlice.actions;

export default quotesSlice.reducer;
