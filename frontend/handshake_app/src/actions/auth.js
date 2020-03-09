import axios from 'axios';
import {setAlert} from './alert';
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGOUT,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS
} from './types';

export async function setAuthTokenToHeaders(token) {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
};

// LOAD user and check auth using saved token
export const loadUser = () => async dispatch => {
    if(localStorage.token) {
        setAuthTokenToHeaders(localStorage.token);
    } 
    try {
        const res = await axios.get('/login');
        // ..user is authenticated, dispatch USER_LOADED action with user data
        console.log('GET /login', res);
        dispatch({
            type: USER_LOADED,
            payload: res.data
        });
    } catch (error) {   // user auth failed
        console.log('action loadUser failed');
        
        dispatch({
            type: AUTH_ERROR
        });
    }
};

// login user to get user object and token
export const loginUser = (email, password, user_type) => async dispatch => {
    const loginRoute = (user_type === 'student') ? '/login/student': '/login/company';

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    const body = JSON.stringify({ email, password });
    try {
        axios.defaults.withCredentials = true;
        const res = await axios.post(loginRoute, body, config);

        console.log('Login success: dispatching payload: ', res.data);
        //login success
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        });
        setAuthTokenToHeaders(res.data.token);
        console.log('call loadUser: ');
        dispatch(loadUser());

    } catch (err) {
        console.log(`/POST ${loginRoute} error:`);
        // const error_msg = err.response.data;
        // const status = err.response.status;
        console.log('actions/auth/loginUser', err);
        dispatch(setAlert('Invalid username or password', 'danger'));
        dispatch({
            type: AUTH_ERROR
        });
    }
};

// Register new user, and set redux user state if success
export const registerUser = (userFormData, user_type) => async dispatch => {
    const registerRoute = (user_type === 'student') ? '/register/student': '/register/company';

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    const body = JSON.stringify(userFormData);
    try {
        axios.defaults.withCredentials = true;
        const res = await axios.post(registerRoute, body, config);

        console.log('Register success: dispatching payload: ', res.data);
        //login success
        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        });
        dispatch(loadUser());

    } catch (err) {
        console.log(`/POST ${registerRoute} error:`);
        console.log('actions/auth/registerUser', err);
        dispatch(setAlert(err.body.error, 'danger'));
        dispatch({
            type: AUTH_ERROR
        });
    }
};

// logout
export const logout = () => dispatch => {
    dispatch({ type: LOGOUT });
}