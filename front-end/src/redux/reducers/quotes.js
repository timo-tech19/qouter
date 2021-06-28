import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Axios } from '../../helpers/Axios';

export const postQuote = createAsyncThunk(
    'quotes/createQuote',
    async (content) => {
        try {
            const { data } = await Axios({
                url: '/quotes',
                method: 'post',
                data: {
                    content,
                },
            });

            return data.data;
        } catch (error) {
            return error.response.data.message;
        }
    }
);

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
        posting: 'idle',
        error: '',
    },
    reducers: {
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
        [postQuote.pending]: (state) => {
            state.posting = 'loading';
        },
        [postQuote.fulfilled]: (state, { payload }) => {
            state.posting = 'complete';
            state.data = [payload, ...state.data];
        },
        [postQuote.rejected]: (state, { payload }) => {
            state.posting = 'failure';
            state.error = payload;
        },
        [fetchQuotes.pending]: (state) => {
            state.status = 'loading';
        },
        [fetchQuotes.fulfilled]: (state, { payload }) => {
            state.status = 'complete';
            state.data = payload;
        },
        [fetchQuotes.rejected]: (state, { payload }) => {
            state.status = 'failure';
            state.error = payload;
        },
    },
});

export const { loadQuotes, validateQuote, createQuote } = quotesSlice.actions;

export default quotesSlice.reducer;
