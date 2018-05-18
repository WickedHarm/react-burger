import * as actions from "../actions/authActions";

const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false
}

const authReducer = (state=initialState, action) => {
    switch (action.type) {
        case actions.AUTH_START:
        console.log("eto auth-start")
            return {
                error: false,
                loading: true
            }

        case actions.AUTH_SUCCESS:
        console.log("eto auth-success", action)   
            return {
                token: action.authData.idToken,
                userId: action.authData.userId,
                loading: false,
                error: null
            }

        case actions.AUTH_FAIL: 
        console.log("eto auth-fail")
            return {
                error: action.error,
                loading: false
            }

        case actions.AUTH_LOGOUT:
        console.log("eto logout", action)
            return {
                token: action.token,
                userId: action.userId
            }    

        default:
            return state    
    }
}

export default authReducer;