import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
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

export const fetchQuotes = createAsyncThunk('quotes/fetchQuotes', async () => {
    try {
        const { data } = await Axios({
            method: 'get',
            url: '/quotes',
        });
        return data.data;
    } catch (error) {
        return error.response.data.message;
    }
});

const quotesSlice = createSlice({
    name: 'quotes',
    initialState: {
        data: [],
        status: 'idle',
        error: '',
    },
    reducers: {
        createQuote(state, action) {
            state.data = [action.payload, ...state];
        },
        loadQuotes(state, action) {
            // create quotes collection
            state.data = action.payload;
        },
        validateQuote(state, { payload }) {
            // find quote in state.quotes
            const quote = state[1];

            console.log(quote);
            // update validates array
            // state.quotes[quoteIndex] = payload;
        },
    },
    extraReducers: {
        [fetchQuotes.pending]: (state, action) => {
            state.status = 'loading';
        },
        [fetchQuotes.fulfilled]: (state, { payload }) => {
            state.status = 'complete';
            state.data = payload;
        },
        [fetchQuotes.rejected]: (state, { payload }) => {
            state.status = 'complete';
            state.error = payload;
        },
    },
});

export const { loadQuotes, validateQuote, createQuote } = quotesSlice.actions;

export default quotesSlice.reducer;
