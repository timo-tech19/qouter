import { createSlice } from '@reduxjs/toolkit';
import { Axios } from '../../helpers/Axios';

export const registerUser = (userData) => {
    return async (dispatch) => {
        try {
            const response = await Axios({
                method: 'post',
                url: '/auth/register',
                data: userData,
            });

            if (response.status !== 201) {
                throw new Error(response.data);
            }
            const { data } = response.data;
            localStorage.setItem('userToken', JSON.stringify(data.token));
            dispatch(login(data.user));
        } catch (error) {
            dispatch(loginError(error.response.data.message));
        }
    };
};

export const loginUser = (userData) => {
    return async (dispatch) => {
        try {
            const response = await Axios({
                method: 'post',
                url: '/auth/login',
                data: userData,
            });

            if (response.status !== 200) {
                throw new Error(response.data);
            }
            const { data } = response.data;
            localStorage.setItem('userToken', JSON.stringify(data.token));
            dispatch(login(data.user));
        } catch (error) {
            dispatch(loginError(error.response.data.message));
        }
    };
};

// const registerUser = createAsyncThunk(
//     '/auth/register',
//     async (userId, thunkAPI) => {
//       const response = await userAPI.fetchById(userId)
//       return response.data
//     }
//   )

const userSlice = createSlice({
    name: 'user',
    initialState: {
        error: '',
        data: null,
    },
    reducers: {
        login(state, action) {
            state.data = action.payload;
        },
        logout(state, action) {
            state.data = null;
        },
        loginError(state, { payload }) {
            state.error = payload;
        },
        userRequote(state, { payload }) {
            state.data.requotes = payload;
        },
    },
});

export const { login, logout, loginError, userRequote } = userSlice.actions;

export default userSlice.reducer;
