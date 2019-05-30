import React, { Component } from 'react';

class Register extends Component {
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
        this.props.handleRegister(this.state);
    }


    render(){
        return(
            <div>
                <form className = "authform" onSubmit = {this.handleSubmit}>
                    <input className = "authinput" type="text" name="username" placeholder = "Type username here" onChange = {this.handleChange}></input>
                    <input className = "authinput" type="password" name="password" placeholder = "Type password here" onChange = {this.handleChange}></input>
                    <input className = "authbutton" type="submit" value="Register"></input>
                </form>

                <button onClick = {this.props.toggleLogin}>Already have an account?</button>
            </div>
        )
    }
}

export default Register;