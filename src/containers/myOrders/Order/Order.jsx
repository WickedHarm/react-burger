import React from "react";
import classes from "./Order.css"

const order = (props) => {
    const ingredients = [];

    for (let ingredientName in props.order.ingredients) {
        
        ingredients.push({
            name: ingredientName,
            amount: props.order.ingredients[ingredientName]
         })
    }
    
    const ingrArr = ingredients.map( (item) => {
                
                return <strong key={item.name}>{item.name} ({item.amount})</strong>
            
            
        } );
    let price = parseFloat(props.order.price).toFixed(2);
    return(
        <div className={classes.Order}>
            <p>Ingredients: {ingrArr}</p>
            <p>Price: <strong>USD {price}</strong></p>
            <p>Delivery: <strong>{props.order.delivery}</strong></p>
            <p>Date: <i>{props.order.date}</i></p>
            <span onClick={() => props.deleteHandler(props.order.id)}>[x]</span>
        </div>
    )
   
};

export default order;