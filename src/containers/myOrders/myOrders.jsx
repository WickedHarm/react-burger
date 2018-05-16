import React, { Component } from "react";
import axiosOrder from "../../axios-order";

import Order from "./Order/Order";
import Spinner from "../../components/UI/modal/Spinner/Spinner";
import Error from "../../components/UI/modal/Error";

import classes from "./myOrders.css";

class myOrders extends Component {
    state = {
        loading: false,
        orders: []
    }

    clearAll = () => {
        
        axiosOrder.delete("/orders.json")
            .then( res => {
                this.setState({
                    orders: []
                })
            })
            .catch( e => console.log(e))
        
        
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
                <span className={classes.DeleteBtn} onClick={this.clearAll}>DELETE ALL ORDERS</span>
                {this.state.orders.length === 0 ? <h2>You have no orders yet</h2> : null}
                {this.state.loading ? <Spinner /> : null}
                {this.state.orders.map( (order) => <Order deleteHandler={this.deleteHandler} key={order.id} order={order}/>)}
            </div>
        );
    }
}

export default Error(myOrders, axiosOrder);