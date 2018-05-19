import * as actions from "../actions/authModalActions";

const initialState = {
    showAuthModal: false
}

const authModalReducer = (state=initialState, action) => {
    switch(action.type) {
        case actions.AUTH_MODAL_SHOW:
        
            return {
                showAuthModal: !state.showAuthModal
            }

        default:
         return state;    
    }
}

export default authModalReducer;