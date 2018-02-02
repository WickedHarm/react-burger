import React, {Fragment} from "react";
import Logo from "../../Logo/Logo";
import Nav from "../Nav";
import BackDrop from "../../UI/backdrop/BackDrop";
import classes from "./Side.css";

const Side = (props) => {
    let toggleClass = props.show ? classes.Open : classes.Close
    return (
        <Fragment>
            <BackDrop show={props.show} showModalHandler={props.hideBackdrop} />
            <div className={[classes.Side, toggleClass].join(" ")}>
                
                <Logo sizeH="11%"/>
                <Nav />
            </div>
        </Fragment>
    )
}

export default Side;