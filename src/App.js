import React, { Component } from 'react';
import RecIndex from './RecIndex/RecIndex';
import AuthGateway from './AuthGateway/AuthGateway';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      loggedIn: false,
      username: null
    }
  }

  handleRegister = async (formData) => {
    console.log(formData);
    const response = await fetch("http://localhost:8080/users", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include"
    })
    console.log(response);
    const parsedResponse = await response.json();
    console.log(parsedResponse);
    if(response.status === 200){
        this.setState({
            username: parsedResponse.username,
            loggedIn: true
        })
    }
  }

  handleLogin = async (formData) => {
      const response = await fetch("http://localhost:8080/login", {
          method: "POST",
          body: JSON.stringify(formData),
          headers: {
              "Content-Type": "application/json"
          },
          credentials: "include"
      })
      console.log(response);
      const parsedResponse = await response.json();
      console.log(parsedResponse);
      if(response.status === 200){
          this.setState({
              username: parsedResponse.username,
              loggedIn: true
          })
      }
  }

  render(){
    return (
      <div className="App">
        <link href="https://fonts.googleapis.com/css?family=Fascinate+Inline|Open+Sans" rel="stylesheet"></link>
        <header> QUEER REX</header>
        
        {
          this.state.loggedIn ?
          <RecIndex/>
          :
          <AuthGateway handleRegister={this.handleRegister} 
          handleLogin={this.handleLogin}></AuthGateway>
        }
        
      </div>
    );
  }
}

export default App;
