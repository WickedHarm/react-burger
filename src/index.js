import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import registerServiceWorker from './registerServiceWorker';


import './index.css';
import App from './App';
import reducer from "./store/reducer/index";


const store = createStore(reducer, applyMiddleware(thunk));
console.log(store);
ReactDOM.render( <Provider store={store}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();
