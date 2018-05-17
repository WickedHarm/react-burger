import React, { Component } from "react";

import Input from "../../components/UI/input/Input";
import Button from "../../components/UI/Button/Button";
import Spinner from "../../components/UI/modal/Spinner/Spinner";
import {inputCreator, validation} from "../../utilities/utility";
import classes from "./Auth.css";

class Auth extends Component {
    state={
        formIsValid: false,
        loading: false,
        form: {
            name: inputCreator("input", "text", "Your Name", {minLength: 3, maxLength: 15}),
            email: inputCreator("input", "email", "Your E-Mail", {reg: /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i})
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

    signInHandler (e) {
        e.preventDefault();
        
        console.log("eto Sign")
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


        return (
            <div className={classes.Auth}>

                {this.state.loading ? 
                    <Spinner />
                :    
                <form action="post" onSubmit={this.signInHandler}>
                    {inputsArr}
                    {this.state.formIsValid ? 
                    <Button btnType="Success">Sign In</Button>
                    :
                    null
                    }
                </form>
                }
            </div>
        );
    }
}

export default Auth;