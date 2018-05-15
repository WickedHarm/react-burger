import React, {Fragment, Component} from "react";
import Modal from "./Modal";



const Error = (OriginalComponent, axios) => {
   
    return class extends Component {
        state = {
            error: null
        }
        componentWillMount () {
            this.reqInterceptor = axios.interceptors.request.use(req => req, err => {this.setState({error: err}); return Promise.reject(err)} )
            this.resInterceptor = axios.interceptors.response.use(res => res, err => {this.setState({error: err}); return Promise.reject(err)} )
            
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
           
            return( 
                <Fragment>
                    <Modal show={this.state.error} showModalHandler={this.modalToggle}>
                        {this.state.error ? <h3>{this.state.error.message}</h3> : null }
                    </Modal>
                    <OriginalComponent {...this.props}/>
                </Fragment>
            )
        }
    }
}
export default Error;