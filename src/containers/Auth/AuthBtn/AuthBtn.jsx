import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import axios from "axios";

import { authLogout } from "../../../store/actions/authActions";
import { authModalShow } from "../../../store/actions/authModalActions";
import Modal from "../../../components/UI/modal/Modal";
import Auth from "../../Auth/Auth";
import Error from "../../../components/UI/modal/Error";
import navLiClasses from "../../../components/Nav/NavLi/NavLi.css";
import classes from "./AuthBtn.css";

class AuthBtn extends Component {
    state = {
        modalShow: false
    }

    render() {

        let btn = (
            <li className={navLiClasses.NavLi} onClick={this.props.onAuthModalShow}>
                    <span>Sign In</span>
            </li>
        )

        if (this.props.isLogged) {
            const userblockClasses = [navLiClasses.NavLi, classes.AuthBtn].join(" ");
            const email = this.props.userEmail.slice(null, this.props.userEmail.indexOf('@'));
            btn = (
                <li className={userblockClasses} onClick={this.props.onLogout}>
                    <span><i>{email}</i> Logout</span>
                </li>
            )
        }

        return (
            <Fragment>
                {btn}
                <Modal show={this.props.showAuth} showModalHandler={this.props.onAuthModalShow}>
                    <Auth modal showModalHandler={this.props.onAuthModalShow}/>
                </Modal>
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        showAuth: state.authModalReducer.showAuthModal,
        userEmail: state.authReducer.userEmail,
        isLogged: state.authReducer.logged
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onAuthModalShow: () => dispatch(authModalShow()),
        onLogout: () => dispatch(authLogout())
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Error(AuthBtn, axios));
