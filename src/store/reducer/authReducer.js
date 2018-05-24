import * as actions from "../actions/authActions";

const initialState = {
    token: null,
    userId: null,
    userEmail: null,
    error: null,
    loading: false,
    logged: false
}

const authReducer = (state=initialState, action) => {
    switch (action.type) {
        case actions.AUTH_START:
            return {
                error: false,
                loading: true
            }

        case actions.AUTH_SUCCESS: 
            return {
                token: action.authData.idToken,
                userId: action.authData.localId,
                userEmail: action.authData.email,
                loading: false,
                error: null,
                logged: true
            }

        case actions.AUTH_FAIL:
            return {
                error: action.error,
                loading: false,
                logged: false
            }

        case actions.AUTH_LOGOUT:
            return {
                token: action.token,
                userId: action.userId,
                userEmail: action.userEmail,
                logged: false
            }    

        default:
            return state    
    }
}

export default authReducer;