import React, { Component } from 'react';
import { connect } from "react-redux";
import {BrowserRouter} from "react-router-dom";
import {Route} from "react-router-dom";


import Layout from "./components/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder";
import './App.css';
import Checkout from './containers/Checkout';
import myOrders from "./containers/myOrders/myOrders";
import Success from './components/Success/Success';
import Auth from "./containers/Auth/Auth";
import { authCheckState } from "./store/actions/authActions";

import classes from "./App.css";


class App extends Component {

  componentDidMount() {
    this.props.onAutoLogin();
  }

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

const mapDispatchToProps = (dispatch) => {
  return {
    onAutoLogin: () => dispatch(authCheckState())
  }
}
console.log(process.env.REACT_APP_AUTH_API_KEY)
export default connect(null, mapDispatchToProps)(App);
