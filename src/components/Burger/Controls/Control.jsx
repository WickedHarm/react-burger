import React from "react";
import classes from "./Control.css";

const Control = (props) => (
   <div className={classes.BuildControl}>
        <div className={classes.Label}>{props.label}</div>
        <button onClick={props.deleteIng} className={classes.Less} disabled={props.disabled}>Less</button>
        <button onClick={props.addIng} className={classes.More}>Moar</button>
    </div>
)

export default Control;