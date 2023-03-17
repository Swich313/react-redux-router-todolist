import {Link, useSearchParams, useNavigate} from "react-router-dom";
import {setAuthError} from '../../store/authSlice.js';
import {useDispatch, useSelector} from "react-redux";
import Card from "../UI/Card/Card.jsx";
import useInput from "../../hooks/use-input.js";
import {authBodyHandler, authButtonNameHandler} from '../../utils/auth.js';
import {login, signup, resetPassword} from '../../store/authSlice.js';

import classes from "./AuthForm.module.css";
const AuthForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {authError, refreshToken} = useSelector(state => state.auth);
    const url = new URL(document.location);
    const [searchParams] = useSearchParams();
    const mode = searchParams.get('mode').split('/')[0] || 'login';
        if(mode !== 'login' && mode !== 'signup' && mode !== 'reset' && mode !== 'change-password'){
        dispatch(setAuthError('Unsupported mode!'));
    }

        const emailRegEx = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()\.,;\s@\"]+\.{0,1})+[^<>()\.,;:\s@\"]{2,})$/;
    //explanation for password regex
    //^                               start anchor
    // (?=(.*[a-z]){3,})               lowercase letters. {3,} indicates that you want 3 of this group
    // (?=(.*[A-Z]){2,})               uppercase letters. {2,} indicates that you want 2 of this group
    // (?=(.*[0-9]){2,})               numbers. {2,} indicates that you want 2 of this group
    // (?=(.*[!@#$%^&*()\-__+.]){1,})  all the special characters in the [] fields. The ones used by regex are escaped by using the \ or the character itself. {1,} is redundant, but good practice, in case you change that to more than 1 in the future. Also keeps all the groups consistent
    // {8,}                            indicates that you want 8 or more
    // $
    const passwordRegex = /^(\S)(?=(.*[0-9]){1,})(?=(.*[A-Z]){1,})(?=(.*[a-z]){1,})(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?\_₹])[a-zA-Z0-9~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?\_₹]{7,}$/;

    const {
        value: enteredEmail,
        hasError: emailHasError,
        isValid: emailIsValid,
        valueChangeHandler: emailChangeHandler,
        inputBlurHandler: emailBlurHandler,
        reset: emailReset,
    } = useInput(value => emailRegEx.test(value));
    const {
        value: enteredPassword,
        hasError: passwordHasError,
        isValid: passwordIsValid,
        valueChangeHandler: passwordChangeHandler,
        inputBlurHandler: passwordBlurHandler,
        reset: passwordReset,
    } = useInput(value => passwordRegex.test(value));
    const {
        value: enteredConfirmPassword,
        hasError: enteredConfirmHasError,
        isValid: enteredConfirmIsValid,
        valueChangeHandler: enteredConfirmChangeHandler,
        inputBlurHandler: enteredConfirmBlurHandler,
        reset: enteredConfirmReset,
    } = useInput(value => value === enteredPassword);


    let formIsValid = false;
    if(mode === 'signup'){
        formIsValid = emailIsValid && passwordIsValid && enteredConfirmIsValid;
    } else if (mode === 'login') {
        formIsValid = emailIsValid && passwordIsValid;
    } else if (mode === 'change-password') {
        formIsValid = passwordIsValid && enteredConfirmIsValid;
    } else {
        formIsValid = emailIsValid;
    }

    const onSubmitHandler = e => {
        e.preventDefault();
        const data = new FormData();
        data.append('email', enteredEmail);
        data.append('password', enteredPassword);
        data.append('confirmPassword', enteredConfirmPassword);
        const authData = authBodyHandler(mode, data, url);
        console.log(authData);
        const requestMethod = mode === 'change-password' ? 'patch' : 'post';
        const requestMode = mode === 'change-password' ? 'reset' : mode;
        console.log({requestMethod, requestMode});
        if(requestMode === 'signup'){
            dispatch(signup(authData)).then(res => console.log(res))
        } else if (requestMode === 'login'){
            // const params = {authData};
            dispatch(login(authData)).then(res => {
                console.log(res);
            if(res.payload.statusText === 'OK'){
                navigate('/')
            }
            })
        }
    };

    const emailClassNames = emailHasError ? classes.invalid : undefined;
    const passwordClassNames = passwordHasError ? classes.invalid : undefined;
    const confirmPasswordClassNames = enteredConfirmHasError ? classes.invalid : undefined;

    const email = (
        <div className={emailClassNames}>
            <label htmlFor="email">Email</label>
            <input type="email"
                   id="email"
                   name="email"
                   required
                   placeholder='Enter your email'
                   value={enteredEmail}
                   onChange={emailChangeHandler}
                   onBlur={emailBlurHandler}/>
            {emailHasError && <p className={classes.error_text}>Enter a valid email!</p>}
        </div>
    );
    const password = (
        <div className={passwordClassNames}>
           <label htmlFor="password">Password</label>
           <input type="password"
                  id="password"
                  name="password"
                  required
                  autoComplete='on'
                  placeholder='Password'
                  value={enteredPassword}
                  onChange={passwordChangeHandler}
                  onBlur={passwordBlurHandler}/>
            {passwordHasError && <p className={classes.error_text}>Password is too weak!</p>}
        </div>);
    const confirmPassword = (
        <div className={confirmPasswordClassNames}>
            <label htmlFor="confirmPassword">Confirm password</label>
            <input type="password"
                   id="confirmPassword"
                   name="confirmPassword"
                   required
                   placeholder='Confirm your password'
                   value={enteredConfirmPassword}
                   onChange={enteredConfirmChangeHandler}
                   onBlur={enteredConfirmBlurHandler}/>
            {enteredConfirmHasError && <p className={classes.error_text}>Passwords must be same!</p>}
        </div>
    );
    return (
        <Card>
            <form onSubmit={onSubmitHandler} className={classes.form}>
                {/*{data && data.errors && (<ul>*/}
                {/*        {Object.values(data.errors).map((err) => (*/}
                {/*            <li key={err}>{err}</li>*/}
                {/*        ))}*/}
                {/*    </ul>*/}
                {/*)}*/}
                {/*{data && data.message && <p>{data.message}</p>}*/}

                {mode !== 'change-password' && email}
                {mode !== 'reset' && password}
                {mode !== 'reset' && mode === 'signup' && confirmPassword}
                {mode !== 'reset' && mode === 'change-password' && confirmPassword}


                <div className={classes.actions}>
                    {mode === 'login' && <Link to={'?mode=reset'}>Forget password?</Link>}
                    <button disabled={!formIsValid}>{authButtonNameHandler(mode)}</button>
                </div>
            </form>
        </Card>
    );
};

export default AuthForm;