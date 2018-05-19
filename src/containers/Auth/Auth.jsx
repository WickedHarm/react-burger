import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import Input from "../../components/UI/input/Input";
import Button from "../../components/UI/Button/Button";
import Spinner from "../../components/UI/modal/Spinner/Spinner";
import {inputCreator, validation} from "../../utilities/utility";
import * as actions from "../../store/actions/authActions";
import { authModalShow } from "../../store/actions/authModalActions";
import classes from "./Auth.css";

class Auth extends Component {
    state={
        formIsValid: false,
        loading: false,
        form: {
            email: inputCreator("input", "email", "Your E-Mail", {reg: /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i}),
            password: inputCreator("input", "password", "Your Password", {minLength: 7})
        }
    }

    changeHandler = (e, key) => {
        
        let obj = Object.assign(this.state.form);
        obj[key].value = e.target.value;
        
        let rules = obj[key].validation.rules;
        let value = obj[key].value;
        
        if (rules) {
            obj[key].validation.isValid = validation(key, value, rules);
            
        }
        let arr = [];
        for (let i in obj) {
            
           arr.push(obj[i].validation.isValid);
           
        }
        if (arr.every( i => i === true )) {
            this.setState({
                formIsValid: true
            })
        }else {
            this.setState({
                formIsValid: false
            })
        }
        
        this.setState({
            orderForm: obj
        })
        
    }

    submitHandler = (e) => {
        e.preventDefault();
        const formState = this.state.form;
        this.props.onAuth(formState.email.value, formState.password.value, this.props.modal);
    }


    render () {

       const inputConfig = this.state.form;
       const inputsArr = [];
       
       for (let key in inputConfig) {
           
           inputsArr.push(<Input key={key} 
                    value={inputConfig[key].value} 
                    switchType={inputConfig[key].elementType} 
                    config={inputConfig[key].elementConfig} 
                    changed={(event) => this.changeHandler(event, key)} 
                    isValid={inputConfig[key].validation.isValid}/>)
       }
       let isModal = this.props.modal;
    
       let className = classes.Auth;
       let header = <h3>SIGN UP</h3>
       let btnText = "Sign Up";
       let signUpLink = null;

       if (isModal) {
        className = classes.AuthModal;
        header = <h3>SIGN IN</h3>;
        btnText = "Sign In";
        signUpLink = <Link to={"/auth"} onClick={this.props.onAuthModalShow}>or create new account</Link>
       }
        return (
            <div className={className}>
                {header}
                {this.props.loading ? 
                    <Spinner />
                :    
                <Fragment>
                    <form action="post" onSubmit={this.submitHandler}>
                        {inputsArr}
                        {this.state.formIsValid ? 
                        <Button btnType="Success">{btnText}</Button>
                        :
                        null
                        }
                    </form>
                    {signUpLink}
                </Fragment>
                }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        loading: state.authReducer.loading,
        error: state.authReducer.error
    }
}

const mapDispatchToProps = (dispatch) => {
   return {
        onAuth: (email,password, isSignIn) => dispatch(actions.auth(email,password, isSignIn)),
        onAuthModalShow: () => dispatch(authModalShow()) 
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);

