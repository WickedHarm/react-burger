import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

import { authLogout } from "../../store/actions/authActions";
import { authModalShow } from "../../store/actions/authModalActions";
import Modal from "../UI/modal/Modal";
import Auth from "../../containers/Auth/Auth";
import navLiClasses from "../Nav/NavLi/NavLi.css";

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
            btn = (
                <li className={navLiClasses.NavLi} onClick={this.props.onLogout}>
                    <span>Logout</span>
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
        isLogged: state.authReducer.logged
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onAuthModalShow: () => dispatch(authModalShow()),
        onLogout: () => dispatch(authLogout())
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(AuthBtn);
