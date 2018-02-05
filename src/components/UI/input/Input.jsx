import React, {Component} from "react";

import classes from "./Input.css";

class Input extends Component {
    state = {
        touched: false
    }
    componentWillReceiveProps(nextProps) {

        if(nextProps.value !== this.props.value) {
            this.setState({
                touched: true
            })
        }
        
    }


    render() {
        console.log("eto render")
        let inputElement = null;
    let inputClasses = [classes.InputElement];
    
    if(!this.props.isValid && this.state.touched) {
        
        inputClasses.push(classes.invalid)
    }
    switch (this.props.switchType) {
        case ("input"):
        inputElement = <input className={inputClasses.join(" ")} value={this.props.value} onChange={this.props.changed} {...this.props.config}/>
        break;
        
        case ("textarea"):
        inputElement = <input className={classes.InputElement} value={this.props.value} onChange={this.props.changed} {...this.props.config}/>
        break;

        case ("select"):
        
        inputElement = <select className={classes.InputElement} defaultValue="" onChange={this.props.changed}>
            <option value="fastest">Fastest</option>
            <option value="cheapest">Cheapest</option>
        </select>
        break;

        default:
        
        inputElement = <input className={classes.InputElement} {...this.props.config}/>
    }
        
        return(
            <div className={classes.Input}>
                <label className={classes.Label}>{this.props.label}</label>
                {inputElement}
            </div>
        )
    }
}

export default Input;