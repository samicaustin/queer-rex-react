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
                <form className = "authform" onSubmit = {this.handleSubmit}>
                    <input className = "authinput" type="text" name="username" placeholder = "Type username here" onChange = {this.handleChange}></input><br></br>
                    <input className = "authinput" type="password" name="password" placeholder = "Type password here" onChange = {this.handleChange}></input><br></br>
                    <input className = "authbutton" type="submit" value="Login"></input>
                </form>

                <button onClick = {this.props.toggleLogin}>Don't have an account?</button>
            </div>
        )
    }
}

export default Login;