import React from "react";
import { Link } from "react-router-dom";

import classes from "./Success.css";

const Success = (props) => {
    return (
        <div className={classes.Success}>
            <h2>Your order has been accepted!</h2> 
            <Link to="/">To Main Page</Link>
        </div> 
    )
}


export default Success;