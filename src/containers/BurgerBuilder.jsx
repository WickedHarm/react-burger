import React, {Component, Fragment} from "react";
import { connect } from "react-redux";


import Burger from "../components/Burger/Burger";
import ControlPanel from "../components/Burger/Controls/ControlPanel/ControlPanel.jsx";
import OrderSum from "../components/Burger/OrderSum";
import Modal from "../components/UI/modal/Modal";
import Spinner from "../components/UI/modal/Spinner/Spinner";
import { axiosOrder } from "../axiosInstance";
import * as actions from "../store/actions/ingrsActions";
import {authModalShow} from "../store/actions/authModalActions";

import Error from "../components/UI/modal/Error";



class BurgerBuilder extends Component {
    state = {
        modalShow: false
    }
  
    orderBtnToggle(ingredients) {
        const arr = Object.keys(ingredients).map( item => ingredients[item]);
        const isDisabled = arr.some( num => num > 0 )
        

        return !isDisabled
    }

    showModalHandler = () => {
       
        this.setState({
            modalShow: !this.state.modalShow
        })
        
    }

    orderHandler = (btnType) => {
       
        switch(btnType) {
            case "Danger":
                this.showModalHandler();
                    break;
            case "Success": 
                this.props.history.push("/checkout");
                break;
            default: return
        }
    }
    componentDidMount() {
       if (this.props.loaded !== true) {
            this.props.fetchIngredients();
       }
    }
 

     render() {
        
        const disabled = {
            ...this.props.ings
        }
        
        for (let key in disabled) {
            disabled[key] = disabled[key] <= 0;
        }
        
        let isLogged = this.props.isLogged;
        let orderNowMethod = this.props.onAuthModalShow;
        if(isLogged) {
            orderNowMethod = this.showModalHandler;
        }
        
        return (
            <Fragment>
                <Modal show={this.state.modalShow} showModalHandler={this.showModalHandler}>
                    <OrderSum ingredients={this.props.ings} orderHandler={this.orderHandler} totalPrice={this.props.totalPrice}/>
                </Modal>
                {!this.props.loaded ? 
                <Spinner /> 
                :
                <Burger ingredients={this.props.ings} ingsOrder={this.props.ingsOrder}/>  
                }
                <ControlPanel
                     addIng={this.props.onIngAdd} 
                     deleteIng={this.props.onIngRemove} 
                     disabled={disabled} 
                     price={this.props.totalPrice.toFixed(2)} 
                     orderBtn={this.orderBtnToggle(this.props.ings)}
                     showModal={orderNowMethod}
                     clearOrder={this.props.onClear}/>   
            </Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingrsReducer.ingredients,
        totalPrice: state.ingrsReducer.totalPrice,
        loaded: state.ingrsReducer.loaded,
        ingsOrder: state.ingrsReducer.ingsOrder,
        isLogged: state.authReducer.logged
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngAdd: (ingType) => dispatch({type: actions.ADD_ING, ingType: ingType}),
        onIngRemove: (ingType) => dispatch({type:actions.REMOVE_ING, ingType: ingType}),
        onClear: () => dispatch({type:actions.CLEAR_INGS}),
        fetchIngredients: () => dispatch(actions.fetchIngredients()),
        onAuthModalShow: () => dispatch(authModalShow())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Error(BurgerBuilder, axiosOrder));