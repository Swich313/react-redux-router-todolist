import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

import $api from '../utils/axiosFetcher.js';

const initialState = {
    filters: [],
    activeFilter: 'all',
    filtersLoadingStatus: 'idle',
    isAddNewFilterMode: false,
    isResetInputs: false,
    testData: null
};

export const fetchFilters = createAsyncThunk(
    'filters/fetchFilters',
    async () => {
        return await $api.get('todos/filters');
    }
);

const filterSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setActiveFilter: (state, action) => {state.activeFilter = action.payload},
        addNewFilterMode: (state) => {state.isAddNewFilterMode = true},
        closeAddNewFilterMode: state => {state.isAddNewFilterMode = false},
        changeActiveFilter: (state, action) => {state.activeFilter = action.payload},
        resetInputs: state => {state.isResetInputs = true},
        notResetInputs: state => {state.isResetInputs = false},

    },
    extraReducers: builder => {
        builder
            .addCase(fetchFilters.pending, state => {state.filtersLoadingStatus = 'loading'})
            .addCase(fetchFilters.fulfilled, (state, action) => {
                state.filters = action.payload.data.filters;
                state.filtersLoadingStatus = 'idle';
            })
            .addCase(fetchFilters.rejected, state => {state.filtersLoadingStatus = 'error'})
    }
});

export const {setActiveFilter, addNewFilterMode, closeAddNewFilterMode, changeActiveFilter, resetInputs, notResetInputs} = filterSlice.actions;

export default filterSlice.reducer;