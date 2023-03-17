import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

import $api from '../utils/axiosFetcher.js';

const DUMMY_TODOS = [
    {_id: 't1', title: 'Step 1 - Find with app', description: 'You have finally found with app which definitely help you not forget your todos!',
        todoType: 'hobby', deadline: '03-16-2023', isCompleted: true, isArchived: false},
    {_id: 't2', title: 'Step 2 - Sign in', description: 'You have finally found with app which definitely help you not forget your todos!',
        todoType: 'work', deadline: Date.now(), isCompleted: false, isArchived: false},
    {_id: 't3', title: 'Step 3 - Log in', description: 'You have finally found with app which definitely help you not forget your todos!',
        todoType: 'home', deadline: Date.now(), isCompleted: false, isArchived: false},
    {_id: 't4', title: 'Step 4 - Use this app every day', description: 'You have finally found with app which definitely help you not forget your todos!',
        todoType: 'other', deadline: '03-18-2023', isCompleted: false, isArchived: false},
];

const initialState = {
    todos: DUMMY_TODOS,
    perPage: 4,
    sort: -1,
    todosTotalQuantity: 0,
    filteredTodosQuantity: 0,
    currentPage: 1,
    todosLoadingStatus: 'idle',
    testField: null,
    error: ''
};

export const fetchTodos = createAsyncThunk(
    'todos/fetchTodos',
    async (arg, {getState, rejectWithValue }) => {
        const state = getState().todos;
        try {
            const todoTypeFilter = arg === 'all' || arg === 'done' ? '' : `&filter=${arg}`;
            const archivedFilter = arg === 'done' ? `&archived=1` : `&archived=-1`;
            const response = await $api.get(`/todos?page=${state.currentPage}&limit=${state.perPage}&sort=${state.sort}${todoTypeFilter}${archivedFilter}`);
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response)
        }
    }
);

export const createTodo = createAsyncThunk(
    'todos/createTodo',
    async (params) => {
        return await $api.post('/todos/todo', params.newTodo);
    }
);

export const updateTodo = createAsyncThunk(
    'todos/updateTodo',
    async (params) => {
        const {id, updatedField} = params;
        return await $api.patch(`/todos/todo/${id}`, updatedField);
    }
);

export const deleteTodo = createAsyncThunk(
    'todos/deleteTodo',
    async (id) => {
        return await $api.delete(`/todos/todo/${id}`);
    }
);

const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        setCurrentPage: (state, action) => {state.currentPage = action.payload},
        incrementCurrentPage: (state, action) => {state.currentPage += 1},
        decrementCurrentPage: (state, action) => {state.currentPage = state.currentPage - 1},
        setTodosTotalQuantity: (state, action) => {state.todosTotalQuantity = action.payload},
        setFilteredTodosQuantity: (state, action) => {state.filteredTodosQuantity = action.payload},
        setTodos: (state, action) => {state.todos = action.payload},
        changeTodo: (state, action) => {
            const {id, changeType} = action.payload;
            const changeStatus =  state.todos.find(item => item._id === id)[action.payload.changeType];
            state.todos.find(item => item._id === action.payload.id)[action.payload.changeType] = !changeStatus;

        }

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTodos.fulfilled, (state, {payload}) => {
                state.todosLoadingStatus = 'idle';
                state.todos = payload.todos;
                state.filteredTodosQuantity = payload.totalItems;
                // state.todos = action.payload.data.todos;
                // state.filteredTodosQuantity = action.payload.data.totalItems;
            })
            .addCase(fetchTodos.pending, state => {state.todosLoadingStatus = 'pending'})
            .addCase(fetchTodos.rejected, (state, action) => {
                state.todosLoadingStatus = 'error'
                state.testField = action.payload;
                // if(action.payload.status === 401){
                //     state.todos = DUMMY_TODOS;
                //     state.todosLoadingStatus = 'idle'
                // }
            })
            .addCase(deleteTodo.fulfilled, (state, action) => {
                state.todos = state.todos.filter(item => item._id !== action.payload.data.deletedTodoId)
            })
            // .addCase(createTodo.fulfilled, (state, action) => null)
            .addCase(updateTodo.fulfilled, (state, action) => {
                const updatedTodo = state.todos.find(item => item._id === action.payload.data.todo._id);
                const updateType = Object.keys(JSON.parse(action.payload.config.data))[0];
                updatedTodo[updateType] = action.payload.data.todo[updateType];
            })
            .addDefaultCase(() => {})
    }
});

export const {
    setCurrentPage,
    incrementCurrentPage,
    decrementCurrentPage,
    changeTodo,
    setTodosTotalQuantity,
    setFilteredTodosQuantity,
    setTodos,
    todosFetching,
    todosFetched,
    todosFetchingError,
    todoDeleted,
    todoCreated,
    todoUpdated,
    } = todoSlice.actions;

export default todoSlice.reducer;