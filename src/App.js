import React, { Component } from 'react';
import { connect } from "react-redux";
import {BrowserRouter} from "react-router-dom";
import {Route} from "react-router-dom";


import Layout from "./components/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder";

import Checkout from './containers/Checkout';
import myOrders from "./containers/myOrders/myOrders";
import Success from './components/Success/Success';
import Auth from "./containers/Auth/Auth";
import { authCheckState } from "./store/actions/authActions";



class App extends Component {
  
  render() {
   
    this.props.onAutoLogin();
   
    return (
      <BrowserRouter>
        <div>
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

const mapDispatchToProps = (dispatch) => {
  return {
    onAutoLogin: () => dispatch(authCheckState())
  }
}

export default connect(null, mapDispatchToProps)(App);
