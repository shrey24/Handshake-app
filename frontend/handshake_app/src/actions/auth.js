import axios from 'axios';
import {setAlert} from './alert';
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
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

// LOAD user and check auth
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
        dispatch({
            type: AUTH_ERROR
        });
    }
};

// login user
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
        //login success
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        });

        dispatch(loadUser());

    } catch (err) {
        const error_msg = err.response.data;
        const status = err.response.status;
        console.log('actions/auth/loginUser', status, error_msg);
        dispatch(setAlert('Invalid username or password', 'danger'));
        dispatch({
            type: AUTH_ERROR
        });
    }
};


// register user
// export const register