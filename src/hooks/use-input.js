import {useReducer} from 'react';

const initialState = {
  value: '',
  isTouched: false,
};

const inputStateReducer = (state, action) => {
    switch (action.type) {
        case 'CHANGE_VALUE':
            return {value: action.payload, isTouched: state.isTouched};
        case 'BLUR_CHANGE':
            return {value: state.value, isTouched: true};
        case 'RESET': return initialState;
        default: return initialState;
    }
};

const useInput = validationRule => {
    const [state, dispatch] = useReducer(inputStateReducer, initialState)

    const valueIsValid = validationRule(state.value);
    const hasError = !valueIsValid && state.isTouched;

    const valueChangeHandler = e => {
        dispatch({type: 'CHANGE_VALUE', payload: e.target.value});
    };

    const inputBlurHandler = () => {
        dispatch({type: 'BLUR_CHANGE'});
    };

    const reset = () => {
        dispatch({type: 'RESET'})
    };

    return {
        value: state.value,
        hasError,
        isValid: valueIsValid,
        valueChangeHandler,
        inputBlurHandler,
        reset
    };
};

export default useInput;