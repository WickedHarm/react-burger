import axiosOrder from "../../axios-order";


export const ADD_ING = "ADD_ING";
export const REMOVE_ING = "REMOVE_ING";
export const CLEAR_INGS = "CLEAR_INGS";
export const FETCH_INGS = "FETCH_INGS";
export const ERROR = "ERROR";



export const fetchIngredients = () => {
    return (dispatch) => {
        axiosOrder.get("/initIngr.json")
            .then( (resp) => dispatch({
                type: FETCH_INGS,
                ings: resp.data.ingrsAmount,
                ingsOrder: resp.data.ingrsOrder,
                loaded: true,
                initialFetchingError: false
            }))
            .catch( (e) => dispatch({
                type: ERROR,
                loaded: true
            }))
    }
}



