import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import useInput from '../../hooks/use-input.js';
import {useTranslation} from "react-i18next";
import {Form, useNavigation, useActionData} from "react-router-dom";

import {closeAddNewFilterMode, addNewFilterMode, notResetInputs} from "../../../../new todoList/src/store/filterSlice.js";


import classes from './TodoAddForm.module.scss';
import Card from "../UI/Card/Card.jsx";

const TodoAddForm = () => {
    const [todoType, setTodoType] = useState('');
    const {filtersLoadingStatus, isAddNewFilterMode, isResetInputs, filters} = useSelector(state => state.filters);
    const navigation = useNavigation();
    const isSubmitting = navigation.state === 'submitting';
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const data = useActionData();
    console.log(data);

    useEffect(() => {
        if(data?.ok){
            resetInputs()
        }
    }, [data])

    const {
        value: enteredTitle,
        hasError: titleHasError,
        isValid: titleIsValid,
        valueChangeHandler: titleChangeHandler,
        inputBlurHandler: titleBlurHandler,
        reset: titleReset,
    } = useInput(value => value.length >= 5 && value.length <= 100);

    const {
        value: enteredDescription,
        hasError: descriptionHasError,
        isValid: descriptionIsValid,
        valueChangeHandler: descriptionChangeHandler,
        inputBlurHandler: descriptionBlurHandler,
        reset: descriptionReset,
    } = useInput(value => value.length >= 10 && value.length <= 256);

    const {
        value: enteredTodoType,
        hasError: todoTypeHasError,
        isValid: todoTypeIsValid,
        valueChangeHandler: todoTypeChangeHandler,
        inputBlurHandler: todoTypeBlurHandler,
        reset: todoTypeReset,
    } = useInput(value => value.length >= 2 && value.length <= 20);

    let formIsValid = titleIsValid && descriptionIsValid && (!isAddNewFilterMode || todoTypeIsValid);

    const renderFilters = (filters, status) => {
        if (status === 'loading'){
            return <option>{t('loading_message')}</option>
        } else if (status === 'error'){
            return <option>Downloading Error</option>
        }
        if (filters && filters.length > 0) {
            return filters.map(({_id, name}) => {
                if (name === 'all' || name === 'done') return;
                if(name === 'work' ||
                    name === 'home' ||
                    name === 'hobby' ||
                    name === 'other'){
                    return <option key={_id} value={name}>{t(`filter_${name}`)}</option>
                } else {
                    return <option key={_id} value={name}>{name}</option>
                }
            })
        }
    }

    const titleClassNames = titleHasError ? classes.invalid : undefined;
    const descriptionClassNames = descriptionHasError ? classes.invalid : undefined;
    const todoTypeClassNames = todoTypeHasError ? classes.invalid : undefined;

    const resetInputs = () => {
        descriptionReset();
        titleReset();
        todoTypeReset();
        dispatch(closeAddNewFilterMode());
        setTodoType('');
    };

    const onTodoTypeChangeHandler = e => {
        setTodoType(e.target.value);
        if(e.target.value === 'AddNewType'){
            dispatch(addNewFilterMode());
        } else {
            dispatch(closeAddNewFilterMode());
        }
    };

    return (
        <Card styles={{'padding': '150px'}}>
            <Form method="post" className={classes.form}>
                {/*{data && data.errors && (<ul>*/}
                {/*        {Object.values(data.errors).map((err) => (*/}
                {/*            <li key={err}>{err}</li>*/}
                {/*        ))}*/}
                {/*    </ul>*/}
                {/*)}*/}
                {/*{data && data.message && <p>{data.message}</p>}*/}
                <div className={titleClassNames} data-error={titleHasError}>
                    <label htmlFor="title" >{t('addForm_title')}</label>
                    <input type="text"
                           name="title"
                           id="title"
                           required
                           placeholder={t('addForm_title_placeholder')}
                           value={enteredTitle}
                           onChange={titleChangeHandler}
                           onBlur={titleBlurHandler}
                           data-error={titleHasError}/>
                    {/*{titleHasError && <p className={classes.error_text}>{enteredTitle.length >= 100 ? 'Maximum length is 100 characters!' : 'Minimal length is 5 characters!'}</p>}*/}
                </div>

                <div className={descriptionClassNames}>
                    <label htmlFor="description">{t('addForm_description')}</label>
                    <textarea
                        name="description"
                        id="description"
                        required
                        value={enteredDescription}
                        onChange={descriptionChangeHandler}
                        onBlur={descriptionBlurHandler}
                        placeholder={t('addForm_description_placeholder')}
                        style={{"height": '130px'}}/>
                    {descriptionHasError && <p className={classes.error_text}>{enteredDescription.length >= 256 ? 'Maximum length is 256 characters!' : 'Minimal length is 10 characters!'}</p>}
                </div>

                <div className={todoTypeClassNames}>
                    <label htmlFor="type">{t('addFrom_type')}</label>
                    <select
                        required
                        id="type"
                        name="type"
                        value={todoType}
                        onChange={onTodoTypeChangeHandler}>
                        <option>{t('addForm_type_default')}</option>
                        <option value='AddNewType'>{t('filters_add_new_filter')}</option>
                        {renderFilters(filters, filtersLoadingStatus)}
                    </select>
                    {todoType === 'AddNewType' && <input name="newTodoType"
                                                         placeholder={t('filters_add_new_filter_placeholder')}
                                                         value={enteredTodoType}
                                                         onChange={todoTypeChangeHandler}
                                                         onBlur={todoTypeBlurHandler}
                    />}
                    {todoTypeHasError && <p className={classes.error_text}>{enteredTodoType.length >= 20 ? 'Maximum length is 20 characters!' : 'Minimal length is 2 characters!'}</p>}
                </div>

                <button disabled={!formIsValid || isSubmitting} className={classes.btn}>{t('addForm_button')}</button>
            </Form>
        </Card>

    )
};

export default TodoAddForm;