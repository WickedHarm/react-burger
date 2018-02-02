import React from "react";
import classes from "./Logo.css";
import burgerLogo from "./burger-logo.png";

const Logo = (props) => {
    return (
        <div className={classes.Logo} style={{height: props.sizeH}}>
            <img src={burgerLogo} alt="puk"/>
        </div>
        
    )
}

export default Logo;