import {configureStore} from '@reduxjs/toolkit';

import authSlice from "./authSlice.js";
import todoSlice from './todoSlice.js';
import filterSlice from "./filterSlice.js";

const store = configureStore({
    reducer: {auth: authSlice, todos: todoSlice, filters: filterSlice},
    middleware: getDefaultMiddleware => getDefaultMiddleware({
        serializableCheck: false
    })
});

export default store;

