import React, {Fragment, Component} from "react";
import { connect } from "react-redux";

import BackDrop from "../backdrop/BackDrop";
import { authModalShow } from "../../../store/actions/authModalActions";
import classes from "./Modal.css";

class Modal extends Component {
    
    render() {
        return (
            <Fragment>
                <BackDrop show={this.props.show} showModalHandler={this.props.showModalHandler} />
                <div className={classes.Modal} style={{transform: this.props.show ? "translateY(0)" : "translateY(-100vh)", opacity: this.props.show ? "1" : "0"}}>
                    {this.props.children}
                </div>
            </Fragment>
        )
    }
}


export default Modal;