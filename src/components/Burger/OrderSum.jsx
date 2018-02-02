import React, {Fragment} from "react";
import Button from "../UI/Button/Button";


const OrderSum = (props) => {
    let arr = Object.keys(props.ingredients).map( item => <li key={item} style={{textTransform: "uppercase"}}>{item}: {props.ingredients[item]} </li>)

    return (
        <Fragment>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {arr}
            </ul>
            <p>Total price: {props.totalPrice.toFixed(2)}</p>
            <Button btnType="Danger" orderHandler={() => props.orderHandler("Danger")}>Cancel</Button>
            <Button btnType="Success" orderHandler={() => props.orderHandler("Success")}>Continue</Button>
        </Fragment>
        
    )
}

export default OrderSum;