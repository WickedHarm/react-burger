import { combineReducers } from "redux";

import ingrsReducer from "./ingrsReducer";
import authReducer from "./authReducer";

const reducer = combineReducers({
    ingrsReducer: ingrsReducer,
    authReducer: authReducer
})

export default reducer;