import React, {Component, Fragment} from "react";
import { Route, Redirect} from "react-router-dom";
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
        let orderIsEmpty = Object.keys(this.props.ings).map( key => this.props.ings[key] ).every( item => item === 0 );
        
        return (
            <div>
                {orderIsEmpty 
                ? 
                 <Redirect to="/" />
                :
                <Fragment>
                    <CheckoutSummary ingredients={this.props.ings} checkoutCancel={this.checkoutCancelHandler}  checkoutContinue={this.checkoutContinueHandler}/>
                    <Route path="/checkout/contact" component={ContactData} />
                </Fragment>
            }
                
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