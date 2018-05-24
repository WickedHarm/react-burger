import axios from 'axios';

import { authModalShow } from "./authModalActions";

export const AUTH_START = "AUTH_START";
export const AUTH_SUCCESS = "AUTH_SUCCESS";
export const AUTH_SIGNUP = "AUTH_SIGNUP";
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

export const authLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("expiresIn");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userId");
    return {
        type: AUTH_LOGOUT,
        token: null,
        userId: null,
        userEmail: null
    }
}

export const authTimeoutLogout = (expiresIn) => {
    return dispatch => {
        setTimeout( () => {
            dispatch(authLogout())
        }, expiresIn * 1000 )
    }
    
}

export const authSignUpRedirect = () => {
    return {
        type: AUTH_SIGNUP
    }
}

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem("token");
        if (!token) {
            dispatch(authLogout());
        }else {
            const expiresIn = localStorage.getItem("expiresIn");
            const email = localStorage.getItem("userEmail");
            const userId = localStorage.getItem("userId");
            if (expiresIn > Date.now()) {
                dispatch(authSuccess({
                    idToken: token,
                    email: email,
                    localId: userId
                    }));
                dispatch(authTimeoutLogout( (expiresIn - Date.now()) / 1000 ));
                
            }else {
                dispatch(authLogout())
            }
        }
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
        let url = "https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=" + process.env.REACT_APP_AUTH_API_KEY;
        if (isSignIn) {
            url = "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=" + process.env.REACT_APP_AUTH_API_KEY;
        }
        axios.post(url, authPayload)
            .then( resp => {
                dispatch(authSuccess(resp.data));
                if (isSignIn) {
                    dispatch(authModalShow());
                }
                
                localStorage.setItem("token", resp.data.idToken);
                const expiresTime = Date.now() + resp.data.expiresIn * 1000; 
                localStorage.setItem("expiresIn", expiresTime);
                localStorage.setItem("userEmail", resp.data.email);
                localStorage.setItem("userId", resp.data.localId);
                dispatch(authTimeoutLogout(resp.data.expiresIn));
            })
            .catch( e => {
                dispatch(authFail(e))
                if (isSignIn) {
                    dispatch(authModalShow())
                }
                
            })
    }
}


