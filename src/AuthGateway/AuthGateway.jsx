import React, { Component } from 'react';
import Register from './Register/Register';
import Login from './Login/Login';

class AuthGateway extends Component {
    constructor(props){
        super(props);
        this.state = {
            login: true
        }
    }

    toggleLogin = (e) => {
        e.preventDefault();
        console.log("login toggled to " + this.state.login);
    }

    render(){
        return (
            <div>

                { 
                    this.state.login ?
                        <Login 
                            handleLogin={this.props.handleLogin} 
                            toggleLogin={this.toggleLogin}>
                        </Login>
                    :
                        <Register 
                            handleRegister={this.props.handleRegister} 
                            toggleLogin={this.toggleLogin}>
                        </Register>
                }

            </div>
        )
    }
}

export default AuthGateway;