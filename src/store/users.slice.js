import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from "axios";
import { asyncThunkReducerBuilder } from '../util';
export const fetchUsers = createAsyncThunk(
    "users",
    async () => {
        try {
            const response = await axios.get(
                "https://jsonplaceholder.typicode.com/users"
            );
            return response.data;
        } catch (error) {
            console.error(error);
        }
    });
export const userSplice = createSlice({
    name: 'users',
    initialState: {
        value: [],
        isLoading: false,
        hasError: false
    },
    reducers: {},
    extraReducers: asyncThunkReducerBuilder(fetchUsers)
})

// Action creators are generated for each case reducer function
// export const { } = userSplice.actions

export default userSplice.reducer