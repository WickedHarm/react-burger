import * as actions from "../actions/ingrsActions";

const initialState = {
    ingredients: {
        salad: 0,
        bacon: 0,
        cheese: 0,
        meat: 0
    },
    ingsOrder: [],
    totalPrice: 4,
    loaded: false
};


const prices = {
    salad: 0.4,
    bacon: 1.5,
    cheese: 1,
    meat: 2
}




const ingrsReducer = ( state = initialState, action) => {
    switch (action.type) {

        case actions.FETCH_INGS:
        let price = state.totalPrice;
            for (let key in action.ings) {
                price += prices[key] * action.ings[key];
                
            }
         
            return {
                ...state,
                ingredients: {
                    ...action.ings
                },
                ingsOrder: action.ingsOrder,
                totalPrice: price,
                loaded: action.loaded
            };

        case actions.ERROR:
            return {
                ...state,
                loaded: action.loaded,

            }    

        case actions.ADD_ING:
            let newIngsOrder = [...state.ingsOrder];
            newIngsOrder.push(action.ingType);

            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingType]: ++state.ingredients[action.ingType]
                },
                ingsOrder: newIngsOrder,
                totalPrice: state.totalPrice + prices[action.ingType]
            };
         
        case actions.REMOVE_ING:
            let newIngsOrderRemove = [...state.ingsOrder];
            let removeIndex = newIngsOrderRemove.indexOf(action.ingType);
            
            if (removeIndex > -1) {
                newIngsOrderRemove.splice(removeIndex, 1);
            }
        
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingType]: --state.ingredients[action.ingType]
                },
                ingsOrder: newIngsOrderRemove,
                totalPrice: state.totalPrice - prices[action.ingType]
            };

        case actions.CLEAR_INGS: 
            return {
                ...state,
                ingredients: {
                    salad: 0,
                    bacon: 0,
                    cheese: 0,
                    meat: 0
                },
                ingsOrder: [],
                totalPrice: 4
            }
            
        default:
            return state;    
    }
}

export default ingrsReducer;