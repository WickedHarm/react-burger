import React, {Component} from "react";
import axiosOrder from "../axios-order";
import {withRouter} from "react-router-dom";

import Button from "../components/UI/Button/Button";
import Spinner from "../components/UI/modal/Spinner/Spinner";
import Input from "../components/UI/input/Input";
import classes from "./contactData.css";

class ContactData extends Component {
    state={
        formIsValid: false,
        loading: false,
        orderForm: {
            name: this.inputCreator("input", "text", "Your Name", {minLength: 3, maxLength: 15}),
            email: this.inputCreator("input", "email", "Your E-Mail", {index: "@"}),
            street: this.inputCreator("input", "text", "Your Address", {minLength: 3, maxLength: 20}),
            postCode: this.inputCreator("input", "text", "Your Post Code", {minLength: 5, maxLength: 5}),
            deliveryMethod: this.inputCreator("select", "select", "Fastest"),
            }
        }

    inputCreator (switchType, elType, placeHolder, validationRules) {
       
       let formBody = {
            elementType: switchType,
            elementConfig: {
                type: elType,
                placeholder: placeHolder
            },
            value: "",
            validation: {
                isValid: false,
                rules: validationRules,
                touched: false
            }
        }
        if (!validationRules) {
            formBody.validation.isValid = true;
        }
        if (placeHolder === "Fastest") {
            formBody.value = placeHolder
       }
        return formBody
    }
    
    validation(key, value, rules) {
        
        let isValid = true;
        if (value.length > rules.maxLength && isValid)  {
            isValid = false;
        }
        if (value.length < rules.minLength && isValid) {
            isValid = false;
        }
        if (key === "email") {
            if (value.indexOf(rules.index) === -1 && isValid) {
                isValid = false;
            }
        }
        if (key === "postCode") {
            if ( isNaN(+value) && isValid ) {
                isValid = false;
            }
        }
       
        
        return isValid
    }
    
    getDate() {
        let date = new Date().toLocaleString("ru-RU", {hour12: false});
        return date;
    }

    orderHandler = (e, select) =>{
        e.preventDefault();
        this.setState({loading: true})
        let contactData = {};
        
        for (let key in  this.state.orderForm) {
           contactData[key] = this.state.orderForm[key].value;
            
            
        }
        
        let order = {
            ingredients: {...this.props.ingredients},
            price: this.props.price,
            contactData: contactData,
            date: this.getDate()
        }

        axiosOrder.post("/orders.json", order)
            .then( () => {
                this.setState({loading:false})
                this.props.history.replace("/success");
            } )
            .catch( (error)=> this.setState({loading:false}) )
    }

    changeHandler = (e, key) => {
        
        let obj = {...Object.assign(this.state.orderForm)};
        obj[key].value = e.target.value;
        
        let rules = obj[key].validation.rules;
        let value = obj[key].value;
        
        if (rules) {
            obj[key].validation.isValid = this.validation(key, value, rules);
            
        }
        let arr = [];
        for (let i in obj) {
            
           arr.push(obj[i].validation.isValid);
           
        }
        if (arr.every( i => i === true )) {
            this.setState({
                formIsValid: true
            }, () => {window.scrollTo(0, this.refs.form.offsetTop)})
        }else {
            this.setState({
                formIsValid: false
            })
        }
        
        this.setState({
            orderForm: obj
        })
        
    }

    componentDidMount() {
        //this.refs.form
        window.scrollTo(0, this.refs.form.offsetTop)
    }

    render() {
        const inputConfig = this.state.orderForm;
       const inputsArr = [];
       
       for (let key in inputConfig) {
           
           inputsArr.push(<Input key={key} 
                    value={inputConfig[key].value} 
                    switchType={inputConfig[key].elementType} 
                    config={inputConfig[key].elementConfig} 
                    changed={(event) => this.changeHandler(event, key)} 
                    isValid={inputConfig[key].validation.isValid}/>)
       }
       
        return(
            <div ref="form" className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {this.state.loading ? 
                    <Spinner />
                :    
                <form action="post" onSubmit={this.orderHandler}>
                    {inputsArr}
                    {this.state.formIsValid ? 
                    <Button btnType="Success">Send Order</Button>
                    :
                    null
                    }
                    
                    
                </form>
                }
                
            </div>
        )
    }
}

export default withRouter(ContactData);