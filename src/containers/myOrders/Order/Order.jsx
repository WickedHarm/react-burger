import React from "react";
import classes from "./Order.css"

const order = (props) => {
    const ingredients = [];

    for (let ingredientName in props.ingredients) {
        ingredients.push({
            name: ingredientName,
            amount: props.ingredients[ingredientName]
         })
    }
    const ingrArr = ingredients.filter((i)=> i.name !== "price" && i.name !== "id").map( (item) => {
            
                return <strong key={item.name}>{item.name} ({item.amount})</strong>
            
            
        } );
    
    return(
        <div className={classes.Order}>
            <p>Ingredients: {ingrArr}</p>
            <p>Price: <strong>USD {props.ingredients.price}</strong></p>
            <span onClick={() => props.deleteHandler(props.ingredients.id)}>[x]</span>
        </div>
    )
   
};

export default order;