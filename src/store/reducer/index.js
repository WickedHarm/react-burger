import { combineReducers } from "redux";

import ingrsReducer from "./ingrsReducer";
import authReducer from "./authReducer";
import authModalreducer from "./authModalReducer";

const reducer = combineReducers({
    ingrsReducer: ingrsReducer,
    authReducer: authReducer,
    authModalReducer: authModalreducer
})

export default reducer;