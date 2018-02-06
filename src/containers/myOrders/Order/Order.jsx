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
    console.log(props.order)
    const ingrArr = ingredients.map( (item) => {
                
                return <strong key={item.name}>{item.name} ({item.amount})</strong>
            
            
        } );
    
    return(
        <div className={classes.Order}>
            <p>Ingredients: {ingrArr}</p>
            <p>Price: <strong>USD {props.order.price}</strong></p>
            <p>Delivery: <strong>{props.order.delivery}</strong></p>
            <span onClick={() => props.deleteHandler(props.order.id)}>[x]</span>
        </div>
    )
   
};

export default order;