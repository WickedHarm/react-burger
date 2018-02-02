import React from "react";
import {NavLink} from "react-router-dom";

import classes from "./NavLi.css";

const NavLi = (props) => {
    return (
        <li className={classes.NavLi}>
            <NavLink exact activeClassName={classes.active} to={props.link}>{props.children}</NavLink>
        </li>
    )
}

export default NavLi;