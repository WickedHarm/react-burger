import React, {Fragment, Component} from "react";
import { connect } from "react-redux";
import {compose} from "redux";
import Modal from "./Modal";
import { authModalShow } from "../../../store/actions/authModalActions";



const Error = (OriginalComponent, axios) => {
    return class extends Component {
        state = {
            error: null
        }
        componentWillMount () {
            this.reqInterceptor = axios.interceptors.request.use(req => req, err => {
                this.setState({error: err});
                return Promise.reject(err)
            } )
            this.resInterceptor = axios.interceptors.response.use(res => res, err => {
                if (err.response) {
                    if (err.response.status !== 401) {
                        
                        this.setState({error: err}); 
                    }else if (err.response.status === 401) {
                        this.props.authModalShow();
                    }
                }else {
                    this.setState({error: err})
                }
               

                
                return Promise.reject(err)
            } )
            
        }
        modalToggle = () => {
            this.setState({
                error: null
            })
        }
        componentWillUnmount() {
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }

        render() {
            let message = null;
            if (this.state.error) {
                message = this.state.error.message;
                if (this.state.error.response.data.error.code === 400) {
                    message = this.state.error.response.data.error.message;
                };
            }
            
            return( 
                <Fragment>
                    <Modal show={this.state.error} showModalHandler={this.modalToggle}>
                        {this.state.error ? <h3>{message}</h3> : null }
                    </Modal>
                    <OriginalComponent {...this.props}/>
                </Fragment>
            )
        }
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        authModalShow: () => dispatch(authModalShow())
    }
}

const composed = compose(
    connect(null, mapDispatchToProps),
    Error
)

export default composed;
