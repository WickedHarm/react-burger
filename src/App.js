import React, { Component } from 'react';
import {BrowserRouter} from "react-router-dom";
import {Route} from "react-router-dom";


import Layout from "./components/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder";
import './App.css';
import Checkout from './containers/Checkout';
import myOrders from "./containers/myOrders/myOrders";
import Success from './components/Success/Success';
import Auth from "./containers/Auth/Auth";

import classes from "./App.css";


class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className={classes.App}>
          <Layout>
            <Route path="/" exact component={BurgerBuilder} />
            <Route path="/checkout" component={Checkout} />
            <Route path="/orders" component={myOrders} />
            <Route path="/success" component={Success}/>
            <Route path="/auth" component={Auth}/>
          </Layout>
        </div>
      </BrowserRouter>  
    );
  }
}

export default App;
