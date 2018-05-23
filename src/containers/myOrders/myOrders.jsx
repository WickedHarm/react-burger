import React, { Component } from "react";
import { connect } from "react-redux";
import { axiosMyOrders } from "../../axiosInstance";

import Order from "./Order/Order";
import Spinner from "../../components/UI/modal/Spinner/Spinner";
import Error from "../../components/UI/modal/Error";
import Modal from "../../components/UI/modal/Modal";
import Confirm from "../../components/UI/modal/Confirm";
import {authModalShow} from "../../store/actions/authModalActions";

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

    clearHistory = () => {
        axiosMyOrders.delete("/orders.json?auth=" + this.props.token)
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
        console.log(this.props.token, this.props.userId)
        const queryParams = '?auth=' + this.props.token + '&orderBy="userId"&equalTo="' + this.props.userId + '"';
        axiosMyOrders.get("/orders.json" + queryParams)
        .then( ord => {
            let ordersArr = []
            for (let key in ord.data) {
                
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
        .catch((err) => {
            this.setState({loading: false})
        })
    }

    deleteHandler = (id) => {
        axiosMyOrders.delete("/orders/" + id + ".json?auth=" + this.props.token)
                .then((res)=> { this.getOrders()})
                .catch( err => {console.log(err)})
                
    }
    componentDidUpdate(prevProps) {
       if (this.props.token) {
            if (prevProps.token !== this.props.token && this.props.logged) {
               this.getOrders();
               
            }
       }
        
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

const mapStateToProps = (state) => {
    return {
        token: state.authReducer.token,
        logged: state.authReducer.logged,
        userId: state.authReducer.userId
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onAuthModalShow: () => dispatch(authModalShow())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Error(myOrders, axiosMyOrders));