import React, {Component} from "react";
import {Route} from "react-router-dom";
import { connect } from "react-redux";

import CheckoutSummary from "../components/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData";

class Checkout extends Component {
    
    checkoutContinueHandler = () => {
        this.props.history.push("/checkout/contact");
    }

    checkoutCancelHandler = () => {
        this.props.history.goBack();
    }
   
    render() {
        return (
            <div>
                <CheckoutSummary ingredients={this.props.ings} checkoutCancel={this.checkoutCancelHandler}  checkoutContinue={this.checkoutContinueHandler}/>
                <Route path="/checkout/contact" component={ContactData} />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    }
}

export default connect(mapStateToProps)(Checkout);