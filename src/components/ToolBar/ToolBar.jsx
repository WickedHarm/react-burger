import React from "react";
import classes from "./ToolBar.css";
import Logo from "../Logo/Logo";

import Nav from "../Nav/Nav";
import MenuBtn from "../Nav/MenuBtn/MenuBtn";

const ToolBar = (props) => {
    return (
        <header className={classes.ToolBar}>
            <MenuBtn clickHandler={props.clickHandler}/>
            <Logo sizeH="80%"/>
            <Nav />
        </header>
    )
}



export default ToolBar;