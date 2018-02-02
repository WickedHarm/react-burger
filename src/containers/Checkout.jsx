import React, {Component} from "react";
import {Route} from "react-router-dom";

import CheckoutSummary from "../components/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData";

class Checkout extends Component {
   state = {
       ingredients: null,
       price: 0
   }
    
    checkoutContinueHandler = () => {
        this.props.history.push("/checkout/contact");
    }

    checkoutCancelHandler = () => {
        this.props.history.goBack();
    }
    componentWillMount = () => {
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        let price = 0;
        for (let param of query.entries()) {
            if(param[0] !== "price") {
                ingredients[param[0]] = +param[1];
            }else {
                price = param[1];
            }
            
        }
        this.setState({
            ingredients: ingredients,
            price: price
        })
        
    }
    render() {
        return (
            <div>
                <CheckoutSummary ingredients={this.state.ingredients} checkoutCancel={this.checkoutCancelHandler}  checkoutContinue={this.checkoutContinueHandler}/>
                <Route path="/checkout/contact" render={() => <ContactData price={this.state.price} ingredients={this.state.ingredients}/>}/>
            </div>
        )
    }
}

export default Checkout;