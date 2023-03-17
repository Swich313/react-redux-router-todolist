import {json, redirect, useActionData, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

import AuthForm from "../component/AuthForm/AuthForm.jsx";
import {authBodyHandler} from "../utils/auth.js";
import $api from '../utils/axiosFetcher.js';
import {useEffect} from "react";

const AuthPage = () => {
    const data = useActionData();
    // const {token, isAuthenticated} = useSelector(state => state.auth)
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // useEffect(() => {
    //     const token = localStorage.getItem('token');
    //     dispatch(login(token))
    //     navigate('/')
    // }, [data?.ok])
    // if (data?.ok){
    //     const token = localStorage.getItem('token');
    //     dispatch(login(token))
    //     navigate('/')
    // }

    return <AuthForm />
};

export default AuthPage;

// export const action = async ({request}) => {
//     const url = new URL(request.url);
//     // const searchParams = new URL(request.url).searchParams;
//     const mode = url.searchParams.get('mode').split('/')[0] || 'login';
//     if(mode !== 'login' && mode !== 'signup' && mode !== 'reset' && mode !== 'change-password'){
//         return json({message: 'Unsupported mode!'}, {status: 422})
//     }
//
//     const data = await request.formData();
//     const authData = authBodyHandler(mode, data, url);
//     console.log(authData);
//
//     const requestMethod = mode === 'change-password' ? 'patch' : 'post';
//     const requestMode = mode === 'change-password' ? 'reset' : mode;
//
//     console.log({requestMethod, requestMode});
//
//     const response = await $api[requestMethod](`/auth/${requestMode}`, authData);
//
//
//     // const response = await fetch(`http://localhost:8000/auth/${requestMode}`, {
//     //     method: requestMethod,
//     //     headers: {
//     //         'Content-Type': 'application/json',
//     //
//     //     },
//     //     body: JSON.stringify(authData),
//     //     withCredentials: true,
//     //     // credentials: "include"
//     // });
//     localStorage.setItem('token', response.data.accessToken);
//
//     if (response.status === 401){
//         return json({message: 'Invalid email or password!'}, {status: 401});
//     }
//
//     if (response.status === 422 ){
//         return json({message: 'Invalid data!'}, {response});
//     }
//
//     if(response.statusText !== 'OK'){
//         return json({message: 'Could not authenticate user!'}, {status: 500});
//     }
//
//     // const res = await response.json();
//     // return redirect('/');
//     return {ok: true, response}
// };