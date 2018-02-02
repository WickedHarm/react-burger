import React from "react";
import classes from "./MenuBtn.css";
import menu from "./menu.png";

const MenuBtn = (props) => {
    return (
        <div className={classes.Menu} onClick={props.clickHandler}>
            <img src={menu} width="80px" height="auto" alt="puk"/>
        </div>
    )
}

export default MenuBtn;