import { createSlice } from '@reduxjs/toolkit';

const modalSlice = createSlice({
    name: 'modal',
    initialState: false,
    reducers: {
        toggleModal(state, { payload }) {
            // create quotes collection
            return payload;
        },
    },
});

export const { toggleModal } = modalSlice.actions;

export default modalSlice.reducer;
