import React from "react";


import classes from "./Nav.css";
import NavLi from "./NavLi/NavLi";
import AuthBtn from "../AuthBtn/AuthBtn";

const Nav = () => {
    return (
        <nav className={classes.Nav}>
        <ul>
            <NavLi link="/" >Burger Builder</NavLi>
            <NavLi link="/orders">My Orders</NavLi>
            {/* <NavLi link="/auth">Sign In</NavLi> */}
            <AuthBtn />
        </ul>
        </nav>
    )
}

export default Nav;