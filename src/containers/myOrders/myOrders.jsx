import React, { Component } from "react";
import axiosOrder from "../../axios-order";

import Order from "./Order/Order";
import Spinner from "../../components/UI/modal/Spinner/Spinner";
import Error from "../../components/UI/modal/Error";

class myOrders extends Component {
    state = {
        loading: false,
        orders: []
    }

    getOrders() {
        this.setState({
            loading:true
        })
        axiosOrder.get("/orders.json")
        .then( ord => {
            let ordersArr = []
            for (let key in ord.data) {
                
                ordersArr.push({
                    ...ord.data[key],
                    id: key
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
            <div style={{textAlign: "center"}}>
                
                {this.state.orders.length === 0 ? <h2>You have no orders yet</h2> : null}
                {this.state.loading ? <Spinner /> : null}
                {this.state.orders.map( (order) => {
                
                    return <Order deleteHandler={this.deleteHandler} key={order.id} ingredients={order}/>
                } )}
            </div>
        );
    }
}

export default Error(myOrders, axiosOrder);