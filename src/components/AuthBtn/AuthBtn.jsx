import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

import { authModalShow } from "../../store/actions/authModalActions";
import Modal from "../UI/modal/Modal";
import Auth from "../../containers/Auth/Auth";
import navLiClasses from "../Nav/NavLi/NavLi.css";

class AuthBtn extends Component {
    state = {
        modalShow: false
    }
    render() {
        return (
            <Fragment>
                <li className={navLiClasses.NavLi} onClick={this.props.onAuthModalShow}>
                    <span>Sign In</span>
                </li>
                <Modal show={this.props.showAuth} showModalHandler={this.props.onAuthModalShow}>
                    <Auth modal showModalHandler={this.props.onAuthModalShow}/>
                </Modal>
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        showAuth: state.authModalReducer.showAuthModal
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onAuthModalShow: () => dispatch(authModalShow())
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(AuthBtn);