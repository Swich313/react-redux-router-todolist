import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import $api from '../utils/axiosFetcher.js';

const DUMMY_FILTERS = [
    {_id: 'f1', name: 'all', className: 'bg_all', type: 'default_filter'},
    {_id: 'f2', name: 'work', className: 'bg_work', type: 'default_filter'},
    {_id: 'f3', name: 'home', className: 'bg_home', type: 'default_filter'},
    {_id: 'f4', name: 'hobby', className: 'bg_hobby', type: 'default_filter'},
    {_id: 'f5', name: 'other', className: 'bg_other', type: 'default_filter'},
    {_id: 'f6', name: 'done', className: 'bg_done', type: 'default_filter'},

];

const initialState = {
    filters: DUMMY_FILTERS,
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
        addFilter: (state, action) => {state.filters.push(action.payload) },
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

export const {addFilter, setActiveFilter, addNewFilterMode, closeAddNewFilterMode, changeActiveFilter, resetInputs, notResetInputs} = filterSlice.actions;

export default filterSlice.reducer;