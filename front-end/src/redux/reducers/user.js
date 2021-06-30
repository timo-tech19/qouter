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

export const followUser = (id) => async (dispatch) => {
    try {
        const { data } = await Axios.patch(`/users/${id}/follow`);
        dispatch(follow(data.data.following));
    } catch (error) {
        if (error.response) {
            alert(error.response.data.message);
            console.log(error.response);
        } else {
            console.log(error);
        }
    }
};

export const updateUserPhoto = (id, image) => async (dispatch) => {
    const formData = new FormData();
    // formData.append('name', 'photo');
    formData.append('userPhoto', image);
    try {
        const { data } = await Axios({
            url: `/users/${id}/upload-photo`,
            method: 'patch',
            data: formData,
            headers: {
                'content-type': 'multipart/form-data',
            },
        });
        dispatch(updatePhoto(data.data.photoUrl));
    } catch (error) {
        if (error.response) {
            alert(error.response.data.message);
            console.log(error.response);
        } else {
            console.log(error);
        }
    }
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
        follow(state, { payload }) {
            state.data.following = payload;
        },
        updatePhoto(state, { payload }) {
            state.data.photoUrl = payload;
        },
    },
});

export const { login, logout, loginError, userRequote, follow, updatePhoto } =
    userSlice.actions;

export default userSlice.reducer;
