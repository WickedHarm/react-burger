import React from "react";
import Ingredient from "./Ingredients/Ingredient"
import classes from "./Burger.css";

const Burger = (props) => {
    let ingredientsArr = Object.keys(props.ingredients).map(igKey => {
        return [...Array(props.ingredients[igKey])].map((_, i) => { return <Ingredient key={igKey + i} type={igKey}/>})
    }).reduce( (prev, cur) =>{ return prev.concat(cur) },[]);
    
    if(ingredientsArr.length === 0) {
        ingredientsArr = <h3>please add some shit</h3>
    }
    
    return (
        <div className={classes.Burger}>
            <Ingredient type="bread-top" />
            {ingredientsArr}
            <Ingredient type="bread-bottom" />
        </div>
    )
}

export default Burger;