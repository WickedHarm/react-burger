import React from "react";


import classes from "./Nav.css";
import NavLi from "./NavLi/NavLi";

const Nav = () => {
    return (
        <nav className={classes.Nav}>
        <ul>
            <NavLi link="/" >Burger Builder</NavLi>
            <NavLi link="/orders">My Orders</NavLi>
        </ul>
        </nav>
    )
}

export default Nav;