import React from "react";


import Control from "../Control"
import classes from "./ControlPanel.css";

const menu = [
    {label: "Salad", type: "salad"},
    {label: "Bacon", type: "bacon"},
    {label: "Cheese", type: "cheese"},
    {label: "Meat", type: "meat"}
]

const ControlPanel = (props) => (
    <div className={classes.BuildControls}>
    
        <p>Current Price: {props.price} USD</p>
        {menu.map( item => (
            <Control addIng={() => props.addIng(item.type)} deleteIng={ () => props.deleteIng(item.type)} key={item.label} label={item.label} disabled={props.disabled[item.type]}/>
        ) )}
        <div className={classes.btns}>
        <button disabled={props.orderBtn} onClick={props.clearOrder} className={classes.ClearButton}>CLEAR</button>
        <button disabled={props.orderBtn} onClick={props.showModal} className={classes.OrderButton}>ORDER NOW!</button>
        </div>
    </div>
)


export default ControlPanel;