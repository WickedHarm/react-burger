import React, {Component} from "react";
import axiosOrder from "../axios-order";
import {withRouter} from "react-router-dom";

import Button from "../components/UI/Button/Button";
import Spinner from "../components/UI/modal/Spinner/Spinner";
import Input from "../components/UI/input/Input";
import classes from "./contactData.css";

class ContactData extends Component {
    state={
        loading: false,
        orderForm: {
            name: this.orderFormCreator("input", "text", "Your Name"),
            email: this.orderFormCreator("input", "text", "Your E-Mail"),
            street: this.orderFormCreator("input", "text", "Your Address"),
            postCode: this.orderFormCreator("input", "text", "Your Post Code"),
            deliveryMethod: this.orderFormCreator("select", "select", null),
            }
        }

    orderFormCreator (switchType, elType, placeHolder) {
       
        return {
                
                elementType: switchType,
                elementConfig: {
                    type: elType,
                    placeholder: placeHolder
                },
                value: ''
            }
        }
        
    
    clickHandler = (e) =>{
        e.preventDefault();
        this.setState({loading: true})

        let order = {
            ...this.props.ingredients,
            price: this.props.price
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
        
        obj[key].value = e.target.value
        
        this.setState({
            orderForm: obj
        })
        
    }

    render() {
        const inputConfig = this.state.orderForm;
       const inputsArr = [];
       for (let key in inputConfig) {
        
           inputsArr.push(<Input key={key} value={this.state.orderForm[key].value} switchType={inputConfig[key].elementType} 
                config={inputConfig[key].elementConfig} changed={(event) => this.changeHandler(event, key)} />)
       }
        return(
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {this.state.loading ? 
                    <Spinner />
                :    
                <form action="post">
                    {inputsArr}
                    <Button orderHandler={this.clickHandler} btnType="Success">Send Order</Button>
                </form>
                }
                
            </div>
        )
    }
}

export default withRouter(ContactData);