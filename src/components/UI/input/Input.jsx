import React from "react";

import classes from "./Input.css";


const input = (props) => {
    let inputElement = null;
    
    switch (props.switchType) {
        case ("input"):
        inputElement = <input className={classes.InputElement} value={props.value} onChange={props.changed} {...props.config}/>
        break;
        
        case ("textarea"):
        inputElement = <input className={classes.InputElement} value={props.value} onChange={props.changed} {...props.config}/>
        break;

        case ("select"):
        
        inputElement = <select className={classes.InputElement} defaultValue="" onChange={props.changed}>
            <option value="fastest">Fastest</option>
            <option value="cheapest">Cheapest</option>
        </select>
        break;

        default:
        
        inputElement = <input className={classes.InputElement} {...props.config}/>
    }

    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
        </div>
    )
}

export default input;