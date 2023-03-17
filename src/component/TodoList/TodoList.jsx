import {useSelector, useDispatch} from "react-redux";
import {useTranslation} from "react-i18next";

import {changeTodo} from '../../store/todoSlice.js';
import Spinner from '../UI/Spinner/Spinner.jsx';
import TodoItem from '../TodoItem/TodoItem.jsx';

import classes from './TodoList.module.scss';

const TodoList = () => {
    const {todos, testField} = useSelector(state => state.todos);
    const dispatch = useDispatch();
    const {t} = useTranslation();
    const style = {textAlign: 'center', marginTop: '5px'};

    console.log({todos, testField})

    const onChangeTodoHandle = (id, changeType) => {
        dispatch(changeTodo({id, changeType}));
        // const updatedTodo = todos.find(item => item._id === id);
        // const params = {id, updatedField: {[changeType]: !updatedTodo[changeType]}};
        // dispatch(updateTodo(params)).then(res => console.log(res))
    };

    const renderTodoList = arr => {
        if (arr.length === 0
            // && filter !== 'done'
        ) {
            return <h5 style={style}>{t('no_todo_yet')}</h5>
        } else if (arr.length === 0){
            return <h5 style={style}>{t('no_completed_todo_yet')}</h5>
        }
        return arr.map(({_id, ...props}) => {
            return (<TodoItem key={_id} {...props}
                             onCompleteTodo={() => onChangeTodoHandle(_id, 'isCompleted')}
                             onArchiveTodo={() => onChangeTodoHandle(_id, 'isArchived')}
                             onDeleteTodo={() => onDeleteTodoHandle(_id)}
            />)
        });
    };

    return (<ul>
        {renderTodoList(todos)}
    </ul>);
};

export default TodoList;