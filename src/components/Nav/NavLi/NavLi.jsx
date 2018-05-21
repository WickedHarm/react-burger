import React from "react";
import {NavLink} from "react-router-dom";

import classes from "./NavLi.css";

const NavLi = (props) => {
    let cls = classes.NavLi;
    if (props.main) {
        cls = [classes.NavLi, classes.Main].join(" ");
    }
    return (
        <li className={cls}>
            <NavLink exact activeClassName={classes.active} to={props.link}>{props.children}</NavLink>
        </li>
    )
}



export default NavLi;