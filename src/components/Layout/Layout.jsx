import React, {Fragment, Component} from "react";

import classes from "./Layout.css"
import ToolBar from "../ToolBar/ToolBar";

class Layout extends Component {
    state = {
        showBackdrop: false
    }

    hideBackdrop = () => {
        
        this.setState({
            showBackdrop: false
        })
    }

    clickHandler = () => {
        this.setState( (prevState) => {
            return {showBackdrop: !prevState.showBackdrop}
        })
    }
    render() {
        return (
            <Fragment>
                <ToolBar clickHandler={this.clickHandler}/>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Fragment>
        )
    }
}


export default Layout;