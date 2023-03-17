import {useState} from "react";
import {useTranslation} from "react-i18next";

import Card from "../UI/Card/Card.jsx";
import classes from './TodoItem.module.scss';

const handleDate = date => {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return `${date.getDate()} ${months.at(date.getMonth())} ${date.getFullYear()}`;
}

const formattedDate = (date)=> {
    return date.toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });
};


const TodoItem = props => {
    const {
        title,
        description,
        todoType,
        deadline,
        _id,
        isCompleted,
        isArchived,
        onCompleteTodo,
        onArchiveTodo,
        onDeleteTodo
    } = props;
    const [visibility, setVisibility] = useState('tooltip_invisible');
    const currentDateString = formattedDate(new Date());
    const {t} = useTranslation();

    const formattedDeadline = formattedDate(new Date(deadline));

    let typeClassName;
    switch (todoType) {
        case 'home':
            typeClassName = `bg__${todoType}`;
            break;
        case 'work':
            typeClassName = `bg__${todoType}`;
            break;
        case 'hobby':
            typeClassName = `bg__${todoType}`;
            break;
        case 'other':
            typeClassName = `bg__${todoType}`;
            break;
        case 'done':
            typeClassName = `bg__${todoType}`;
            break;
        default:
            typeClassName = 'bg__other';
    }

    const closeBtnHandler = () => {
            if (isCompleted && !isArchived) {
                onArchiveTodo();
                return;
            } else if (isCompleted && isArchived) {
                onDeleteTodo();
                return;
            }
            setVisibility('tooltip_visible');
            // const timer = setTimeout(()=> {
            //     setVisibility('tooltip_invisible');
            //     }, 5000);
            // clearTimeout(timer);
            const timer = null;
            timer ? clearTimeout(timer) : setTimeout(() => {
                setVisibility('tooltip_invisible')
            }, 5000);
    };

    const deadlineElement = new Date(formattedDeadline).getTime() > new Date(currentDateString).getTime() ? `${formattedDeadline}` :
        new Date(formattedDeadline).getTime() === new Date(currentDateString).getTime() ? `${formattedDeadline} ${t('deadline_today')}` : `
        ${formattedDeadline} ${t('deadline_outdated')}`;

    return (

        <li className={classes.todo_item}>
            <Card styles={classes[typeClassName]}>
                <div className={classes["todo_item__checkbox-rect"]} onClick={onCompleteTodo}>
                    <input type="checkbox" id={_id} name="check" checked={isCompleted} onChange={onCompleteTodo}/>
                    <label htmlFor={_id} className={isCompleted ? classes.crossed : null}>
                        {title}
                    </label>
                </ div>
                <div className={`${classes.todo_item__text} ${isCompleted ? classes.crossed : null}`}>
                    {description}
                    <p className={deadline ? null : classes.time_hide}>
                        {t('deadline_text')} {deadlineElement}
                    </p>
                </div>
                <button type="button" className={classes.close_btn} aria-label="Close" onClick={closeBtnHandler} >x
                    <span className={`${classes.close_btn__tooltip} ${classes[visibility]}`}>{t('tooltip')}</span>
                </button>
            </Card>
        </li>
    )
}

export default TodoItem;