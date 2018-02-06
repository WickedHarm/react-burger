import React, {Component, Fragment} from "react";


import Burger from "../components/Burger/Burger";
import ControlPanel from "../components/Burger/Controls/ControlPanel/ControlPanel.jsx";
import OrderSum from "../components/Burger/OrderSum";
import Modal from "../components/UI/modal/Modal";
import Spinner from "../components/UI/modal/Spinner/Spinner";
import axiosOrder from "../axios-order";

import Error from "../components/UI/modal/Error";

let prices = {
    salad: 0.4,
    bacon: 1.5,
    cheese: 1,
    meat: 2
}

class BurgerBuilder extends Component {
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4,
        orderBtnDisabled: true,
        modalShow: false,
        loading: false,
        
    }
  
    orderBtnToggle(ingredients) {
        let arr = Object.keys(ingredients).map( item => ingredients[item]);
        let isDisabled = arr.some( num => num > 0 )
        this.setState({
            orderBtnDisabled: !isDisabled
        })
    }

    addIng = (type) => {
        const oldCount = this.state.ingredients[type];
        let updatedCount = oldCount + 1;
        const updatedIngr = {
            ...this.state.ingredients
        }
        updatedIngr[type] = updatedCount;

        let priceAdd = prices[type];
        let oldPrice = this.state.totalPrice;
        let newPrice = oldPrice += priceAdd;
        
        this.setState({
            ingredients: updatedIngr,
            totalPrice: newPrice
        })
        this.orderBtnToggle(updatedIngr)
        
    }

    deleteIng = (type) => {
        const oldCount = this.state.ingredients[type];
        let updatedCount = oldCount - 1;
        if (updatedCount < 0) {
            updatedCount = 0;
        }
        const updatedIngr = {
            ...this.state.ingredients
        }
        updatedIngr[type] = updatedCount;

        let priceAdd = prices[type];
        let oldPrice = this.state.totalPrice;
        let newPrice = oldPrice -= priceAdd
        this.setState({
            ingredients: updatedIngr,
            totalPrice: newPrice
        })
        this.orderBtnToggle(updatedIngr)
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
            const queryParams = [];
            for(let i in this.state.ingredients) {
               queryParams.push(encodeURIComponent(i) + "=" + encodeURIComponent(this.state.ingredients[i]))
               
            }
            queryParams.push("price=" + this.state.totalPrice)
            const queryString = queryParams.join("&");
            
            this.props.history.push({
                pathname: "/checkout",
                search: queryString 
            })
                break;
            default: return
        }
    }
    componentDidMount() {
        
        this.setState({
            
            loading: true
        })
        axiosOrder.get("/initial ingr.json")
        .then( resp=> {
            let ingr = {...this.state.ingredients};
            for (let key in ingr) {
                ingr[key] = resp.data[key]
                for (let i=0; i<resp.data[key]; i++) {
                    this.addIng(key)
                }
           }
            this.setState({
                ingredients: resp.data,
                loading: false
            })
            this.orderBtnToggle(ingr);
        } )
        .catch( err => this.setState({loading: false}))
          
    }
    clearHandler = () => {
        
        this.setState({
            ingredients: {
                salad: 0,
                bacon: 0,
                cheese: 0,
                meat: 0
            },
            totalPrice: 4,
            orderBtnDisabled: true
        })
    }

     render() {
        
        const disabled = {
            ...this.state.ingredients
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
                   <OrderSum ingredients={this.state.ingredients} orderHandler={this.orderHandler} totalPrice={this.state.totalPrice}/> }     
                </Modal>
                {this.state.loading ? 
                <Spinner /> 
                :
                <Burger ingredients={this.state.ingredients}/>  
                }
                <ControlPanel
                     addIng={this.addIng} 
                     deleteIng={this.deleteIng} 
                     disabled={disabled} 
                     price={this.state.totalPrice} 
                     orderBtn={this.state.orderBtnDisabled}
                     showModal={this.showModalHandler}
                     clearOrder={this.clearHandler}/>   
            </Fragment>
        )
    }
}

export default Error(BurgerBuilder, axiosOrder);