import React, { Component } from 'react';

class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            username: null,
            password: null
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.handleLogin(this.state);
    }


    render(){
        return(
            <div>
                <form onSubmit = {this.handleSubmit}>
                    Username: <input type="text" name="username" onChange = {this.handleChange}></input><br></br>
                    Password: <input type="password" name="password" onChange = {this.handleChange}></input><br></br>
                    <input type="submit" value="Login"></input>
                </form>
            </div>
        )
    }
}

export default Login;