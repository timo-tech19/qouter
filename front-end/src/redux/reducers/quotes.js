import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Axios } from '../../helpers/Axios';
import { userRequote } from './user';

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

export const likeQuote = (id) => async (dispatch) => {
    try {
        // Get updated Liked post on the server
        const { data } = await Axios({
            url: `/quotes/${id}/like`,
            method: 'patch',
        });

        dispatch(like({ id, likes: data.data }));
    } catch (error) {
        if (error.response) {
            alert(error.response.data.message);
            console.log(error.response.data);
        } else {
            console.log(error);
        }
    }
};

export const reQuote = (id) => async (dispatch) => {
    try {
        // Get updated requote post on the server
        const { data } = await Axios({
            method: 'post',
            url: `/quotes/${id}/requote`,
        });

        // console.log(data.data);
        data.data.requoteStatus === 'created'
            ? dispatch(createRequote(data.data.requote))
            : dispatch(deleteRequote(data.data.requote));

        dispatch(requote({ id, requoters: data.data.requoters }));
        dispatch(userRequote(data.data.userRequotes));
    } catch (error) {
        if (error.response) {
            alert(error.response.data.message);
            console.log(error.response.data);
        } else {
            console.log(error);
        }
    }
};

export const commentQuote = (id, content) => async (dispatch) => {
    try {
        const { data } = await Axios.post(`/quotes/${id}/comment`, {
            content,
        });
        console.log(data);
        dispatch(comment({ id, comments: data.data.comments }));
    } catch (error) {
        if (error.response) {
            alert(error.response.data.message);
            console.log(error.response.data);
        } else {
            console.log(error);
        }
    }
};

// export const getQuote = (id) => async (dispatch) => {
//     const { data } = await Axios.get(`/quotes/${id}`);
//     // setQuote(data.data);
// };

const quotesSlice = createSlice({
    name: 'quotes',
    initialState: {
        data: [],
        status: 'idle',
        posting: 'idle',
        error: '',
    },
    reducers: {
        createRequote(state, { payload }) {
            state.posting = 'complete';
            state.data = [payload, ...state.data];
        },
        deleteRequote(state, { payload }) {
            const i = state.data.findIndex((quote) => quote._id === payload);
            if (i > -1) state.data.splice(i, 1);
        },
        like(state, { payload }) {
            const quote = state.data.find((quote) => quote._id === payload.id);
            if (quote) quote.likes = payload.likes;
        },
        requote(state, { payload }) {
            const quote = state.data.find((quote) => quote._id === payload.id);
            if (quote) quote.requoters = payload.requoters;
        },
        comment(state, { payload }) {
            const quote = state.data.find((quote) => quote._id === payload.id);
            if (quote) quote.comments = payload.comments;
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

export const { like, requote, createRequote, deleteRequote, comment } =
    quotesSlice.actions;

export default quotesSlice.reducer;
