import React, { Component } from "react";
import axiosOrder from "../../axios-order";

import Order from "./Order/Order";
import Spinner from "../../components/UI/modal/Spinner/Spinner";
import Error from "../../components/UI/modal/Error";
import Modal from "../../components/UI/modal/Modal";
import Confirm from "../../components/UI/modal/Confirm";

import classes from "./myOrders.css";

class myOrders extends Component {
    state = {
        loading: false,
        orders: [],
        modalShow: false
    }

    showModalHandler = () => {
       
        this.setState({
            modalShow: !this.state.modalShow
        })
    }

    onClearHistory = () => {
        this.showModalHandler();
        
       
        
        
    }

    clearHistory = () => {
        axiosOrder.delete("/orders.json")
        .then( res => {
            this.setState({
                orders: [],
                modalShow: !this.state.modalShow
            })
        })
        .catch( e => {
            this.setState({
                modalShow: !this.state.modalShow
            })
            console.log(e)
        })
    }

    getOrders() {
        this.setState({
            loading:true
        })
        axiosOrder.get("/orders.json")
        .then( ord => {
            let ordersArr = []
            for (let key in ord.data) {
                //console.log(ord.data[key].ingredientsOrder)
                ordersArr.push({
                    ingredients: {...ord.data[key].ingredients},
                    ingsOrder: ord.data[key].ingredientsOrder,
                    id: key,
                    price: ord.data[key].price,
                    delivery: ord.data[key].contactData.deliveryMethod,
                    date: ord.data[key].date
                })
            }
            this.setState({
                orders: ordersArr,
                loading: false
            })
        } )
        .catch((err) => {this.setState({loading: false})})
    }

    deleteHandler = (id) => {
        axiosOrder.delete("/orders/" + id + ".json")
                .then((res)=> { this.getOrders()})
                .catch( err => {console.log(err)})
                
    }

    componentDidMount() {
       this.getOrders()
    }

    render() {
        
        return(
            <div className={classes.MyOrders}>
                <Modal show={this.state.modalShow} showModalHandler={this.showModalHandler}>
                    <Confirm onClear={this.clearHistory} showModalHandler={this.showModalHandler}/>
                </Modal>    
                {this.state.orders.length === 0 ? <h2>You have no orders yet</h2> : null}
                {this.state.loading ? <Spinner /> : null}
                {this.state.orders.map( (order) => <Order deleteHandler={this.deleteHandler} key={order.id} order={order}/>)}
                <div className={classes.HistoryMenu}>   
                    <span onClick={this.showModalHandler}>CLEAR HISTORY</span>
                </div> 
            </div>
        );
    }
}

export default Error(myOrders, axiosOrder);