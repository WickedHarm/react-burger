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
        const orderIsEmpty = Object.keys(this.props.ings).map( key => this.props.ings[key] ).every( item => item === 0 );
        
        return (
            <div>
                {orderIsEmpty 
                ? 
                 <Redirect to="/" />
                :
                <Fragment>
                    <CheckoutSummary ingredients={this.props.ings} ingsOrder={this.props.ingsOrder} checkoutCancel={this.checkoutCancelHandler}  checkoutContinue={this.checkoutContinueHandler}/>
                    <Route path="/checkout/contact" component={ContactData} />
                </Fragment>
            }
                
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        ings: state.ingrsReducer.ingredients,
        ingsOrder: state.ingrsReducer.ingsOrder,
        price: state.ingrsReducer.totalPrice
    }
}

export default connect(mapStateToProps)(Checkout);