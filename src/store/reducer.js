import * as actions from "./actions";

const initialState = {
    ingredients: {
        salad: 0,
        bacon: 0,
        cheese: 0,
        meat: 0
    },
    totalPrice: 4
};

const prices = {
    salad: 0.4,
    bacon: 1.5,
    cheese: 1,
    meat: 2
}


const reducer = ( state = initialState, action) => {
    switch (action.type) {
        case actions.ADD_ING:
            
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingType]: ++state.ingredients[action.ingType]
                },
                totalPrice: state.totalPrice + prices[action.ingType]
            };
         
        case actions.REMOVE_ING:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingType]: --state.ingredients[action.ingType]
                },
                totalPrice: state.totalPrice - prices[action.ingType]
            };

        case actions.CLEAR_INGS: 
            return {
                ingredients: {
                    salad: 0,
                    bacon: 0,
                    cheese: 0,
                    meat: 0
                },
                totalPrice: 4
            }
            
        default:
            return state;    
    }
}

export default reducer;