import axios from 'axios';

import { authModalShow } from "./authModalActions";

export const AUTH_START = "AUTH_START";
export const AUTH_SUCCESS = "AUTH_SUCCESS";
export const AUTH_FAIL = "AUTH_FAIL";
export const AUTH_LOGOUT = "AUTH_LOGOUT";

export const authStart = () => {
    return {
        type: AUTH_START,
    }
}

export const authSuccess = (authData) => {
    return {
        type: AUTH_SUCCESS,
        authData: authData   
     }
}


export const authFail = (error) => {
    return {
        type: AUTH_FAIL,
        error: error
    }
}

export const authLogout = (expiresIn) => {
    return dispatch => {
        setTimeout( () => {
            dispatch({
                type: AUTH_LOGOUT,
                token: null,
                userId: null
            })
        }, expiresIn * 1000 )
    }
    
}

export const auth = (email, password, isSignIn) => {
    return dispatch => {
        dispatch(authStart());
        const authPayload = {
            email: email,
            password: password,
            returnSecureToken: true
        }
        let url = "https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyBCPEezYoRRjs1M6pGjUT3or5OKWMpa9BY";
        if (isSignIn) {
            url = "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyBCPEezYoRRjs1M6pGjUT3or5OKWMpa9BY";
        }
        axios.post(url, authPayload)
            .then( resp => {
                dispatch(authSuccess(resp.data));
                dispatch(authModalShow())
                dispatch(authLogout(resp.data.expiresIn))
            })
            .catch( e => {
                console.log(e);
                dispatch(authFail(e))
                dispatch(authModalShow())
            })
    }
}