import React from "react";


import classes from "./Nav.css";
import NavLi from "./NavLi/NavLi";
import AuthBtn from "../../containers/Auth/AuthBtn/AuthBtn";
console.log(AuthBtn)

const Nav = () => {
    return (
        <nav className={classes.Nav}>
        <ul>
            <NavLi link="/" main>Burger Builder</NavLi>
            <NavLi link="/orders">My Orders</NavLi>
            <AuthBtn />
        </ul>
        </nav>
    )
}

export default Nav;