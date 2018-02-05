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
            name: this.inputCreator("input", "text", "Your Name"),
            email: this.inputCreator("input", "text", "Your E-Mail"),
            street: this.inputCreator("input", "text", "Your Address"),
            postCode: this.inputCreator("input", "text", "Your Post Code"),
            deliveryMethod: this.inputCreator("select", "select", "Fastest"),
            }
        }

    inputCreator (switchType, elType, placeHolder) {
       
       let formBody = {
            elementType: switchType,
            elementConfig: {
                type: elType,
                placeholder: placeHolder
            },
            value: ""
        }
        if (placeHolder === "Fastest") {
            formBody.value = placeHolder
       }
        return formBody
    }
        
    
    orderHandler = (e, select) =>{
        e.preventDefault();
        this.setState({loading: true})
        let contactData = {}
        for (let key in  this.state.orderForm) {
           contactData[key] = this.state.orderForm[key].value;
            
            
        }
        
        let order = {
            ...this.props.ingredients,
            price: this.props.price,
            contactData: contactData
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
                <form action="post" onSubmit={this.orderHandler}>
                    {inputsArr}
                    <Button btnType="Success">Send Order</Button>
                </form>
                }
                
            </div>
        )
    }
}

export default withRouter(ContactData);