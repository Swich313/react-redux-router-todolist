import { v4 as uuidv4 } from "uuid";

import TodoList from "../component/TodoList/TodoList.jsx";
import PageContent from "../component/UI/PageContent/PageContent.jsx";
import TodoAddForm from "../component/TodoAddForm/TodoAddForm.jsx";
import store from '../store/index.js';
import {addFilter} from "../store/filterSlice.js";
import {addTodo} from "../store/todoSlice.js";
import {redirect} from "react-router-dom";

const HomePage = () => {
    return (
        <PageContent>
            <div>
                <TodoList />
            </div>
            <div>
                <TodoAddForm />
            </div>
        </PageContent>
    );
};

export default HomePage;

export const action = async ({request}) => {
    const state = store.getState();
    const isAddNewFilterMode = state.filters.isAddNewFilterMode;
    const data = await request.formData();
    const todoData = {
        _id: uuidv4(),
        title: data.get('title'),
        description: data.get('description'),
        todoType: data.get('type') === 'AddNewType' ? data.get('newTodoType') : data.get('type'),
        deadline: Date.now(),
        isCompleted: false,
        isArchived: false
    };
    if(isAddNewFilterMode){
        const filterData = {
            _id: uuidv4(),
            name: todoData.todoType,
            className: 'bg_other',
            type: 'user_filter'
        };
        store.dispatch(addFilter(filterData));
    }

    store.dispatch(addTodo(todoData));

    return {ok: true}
};