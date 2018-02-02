import React, { Component } from 'react';
import {BrowserRouter} from "react-router-dom";
import {Route, Link} from "react-router-dom";

import Layout from "./components/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder";
import './App.css';
import Checkout from './containers/Checkout';
import myOrders from "./containers/myOrders/myOrders";


class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Layout>
            <Route path="/" exact component={BurgerBuilder} />
            <Route path="/checkout" component={Checkout} />
            <Route path="/orders" component={myOrders} />
            <Route path="/success" 
              render={() =>{
                return (
                    <div style={{textAlign:"center", marginTop: "150px"}}>
                      <h2>Your order has been accepted!</h2> 
                      <Link style={{color:" #8f5c2c"}} to="/">To Main Page</Link>
                     </div> 
                )
                }
              } />
          </Layout>
        </div>
      </BrowserRouter>  
    );
  }
}

export default App;
