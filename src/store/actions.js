import axiosOrder from "../axios-order";


export const ADD_ING = "ADD_ING";
export const REMOVE_ING = "REMOVE_ING";
export const CLEAR_INGS = "CLEAR_INGS";
export const FETCH_INGS = "FETCH_INGS";
export const ERROR = "ERROR";


export const fetchIngredients = () => {
    return (dispatch) => {
        axiosOrder.get("/initial ingr.json")
            .then( (resp) => dispatch({
                type: FETCH_INGS,
                ings: resp.data,
                loaded: true
            }))
            .catch( (e) => dispatch({
                type: ERROR,
                loaded: true
            }))
    }
}

