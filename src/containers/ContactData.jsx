import React, {Component} from "react";
import {withRouter} from "react-router-dom";
import { connect } from "react-redux";
import { axiosContactData } from "../axiosInstance";

import Button from "../components/UI/Button/Button";
import Spinner from "../components/UI/modal/Spinner/Spinner";
import Input from "../components/UI/input/Input";
import classes from "./contactData.css";
import Error from "../components/UI/modal/Error";

import {validation, inputCreator} from "../utilities/utility";

class ContactData extends Component {
    state={
        formIsValid: false,
        loading: false,
        orderForm: {
            name: inputCreator("input", "text", "Your Name", {minLength: 3, maxLength: 15}),
            email: inputCreator("input", "email", "Your E-Mail", {reg: /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i}, this.props.userEmail),
            street: inputCreator("input", "text", "Your Address", {minLength: 3, maxLength: 20}),
            postCode: inputCreator("input", "text", "Your Post Code", {minLength: 5, maxLength: 5}),
            deliveryMethod: inputCreator("select", "select", "Fastest"),
            }
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
        let price = parseFloat(this.props.price).toFixed(2);
        let order = {
            ingredients: {...this.props.ings},
            ingredientsOrder: [...this.props.ingsOrder],
            price: price,
            contactData: contactData,
            date: this.getDate()
        }

        const token = this.props.token;

        axiosContactData.post("/orders.json?auth=" + token, order)
            .then( () => {
                this.setState({loading:false})
                this.props.history.replace("/success");
            } )
            .catch( (error)=>{ 
                console.log("eto order error")
                this.setState({loading:false})
            } )
    }

    changeHandler = (e, key) => {
        
        let obj = Object.assign(this.state.orderForm);
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


const mapStateToProps = (state) => {
    return {
        ings: state.ingrsReducer.ingredients,
        ingsOrder: state.ingrsReducer.ingsOrder,
        price: state.ingrsReducer.totalPrice,
        token: state.authReducer.token,
        userEmail: state.authReducer.userEmail
    }
} 

export default connect(mapStateToProps)(withRouter(Error(ContactData, axiosContactData)));