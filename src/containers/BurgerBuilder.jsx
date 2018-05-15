import React, {Component, Fragment} from "react";
import { connect } from "react-redux";


import Burger from "../components/Burger/Burger";
import ControlPanel from "../components/Burger/Controls/ControlPanel/ControlPanel.jsx";
import OrderSum from "../components/Burger/OrderSum";
import Modal from "../components/UI/modal/Modal";
import Spinner from "../components/UI/modal/Spinner/Spinner";
import axiosOrder from "../axios-order";
import * as actions from "../store/actions";

import Error from "../components/UI/modal/Error";



class BurgerBuilder extends Component {
    state = {
        modalShow: false,
        loading: false,
        
    }
  
    orderBtnToggle(ingredients) {
        let arr = Object.keys(ingredients).map( item => ingredients[item]);
        let isDisabled = arr.some( num => num > 0 )
        

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
        console.log("eto mount")
        // this.setState({
            
        //     loading: true
        // })
        // axiosOrder.get("/initial ingr.json")
        // .then( resp=> {
        //     let ingr = {...this.state.ingredients};
        //     for (let key in ingr) {
        //         ingr[key] = resp.data[key]
        //         for (let i=0; i<resp.data[key]; i++) {
        //             this.addIng(key)
        //         }
        //    }
        //     this.setState({
        //         ingredients: resp.data,
        //         loading: false
        //     })
        //     this.orderBtnToggle(ingr);
        // } )
        // .catch( err => this.setState({loading: false}))

        this.props.loaded ? null : this.props.fetchIngredients();
    }
 

     render() {
        
        const disabled = {
            ...this.props.ings
        }

        

        for (let key in disabled) {
            disabled[key] = disabled[key] <= 0;
        }
        
        return (
            <Fragment>
                <Modal show={this.state.modalShow} showModalHandler={this.showModalHandler}>
                   {this.state.loading ? 
                   <Spinner /> 
                   : 
                   <OrderSum ingredients={this.props.ings} orderHandler={this.orderHandler} totalPrice={this.props.totalPrice}/> }     
                </Modal>
                {!this.props.loaded ? 
                <Spinner /> 
                :
                <Burger ingredients={this.props.ings}/>  
                }
                <ControlPanel
                     addIng={this.props.onIngAdd} 
                     deleteIng={this.props.onIngRemove} 
                     disabled={disabled} 
                     price={this.props.totalPrice} 
                     orderBtn={this.orderBtnToggle(this.props.ings)}
                     showModal={this.showModalHandler}
                     clearOrder={this.props.onClear}/>   
            </Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        totalPrice: state.totalPrice,
        loaded: state.loaded
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngAdd: (ingType) => dispatch({type: actions.ADD_ING, ingType: ingType}),
        onIngRemove: (ingType) => dispatch({type:actions.REMOVE_ING, ingType: ingType}),
        onClear: () => dispatch({type:actions.CLEAR_INGS}),
        fetchIngredients: () => dispatch(actions.fetchIngredients())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Error(BurgerBuilder, axiosOrder));