import React, { Component } from 'react';
import RecIndex from './RecIndex/RecIndex';
import AuthGateway from './AuthGateway/AuthGateway';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      loggedIn: false,
      userId: null
    }
  }

  handleRegister = async (formData) => {
    const response = await fetch("https://queerrex-java.herokuapp.com/users", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include"
    })
    const parsedResponse = await response.json();
    if(response.status === 200){
        this.setState({
            userId: parsedResponse.id,
            loggedIn: true
        })
    }
  }

  handleLogin = async (formData) => {
      const response = await fetch("https://queerrex-java.herokuapp.com/login", {
          method: "POST",
          body: JSON.stringify(formData),
          headers: {
              "Content-Type": "application/json"
          },
          credentials: "include"
      })
      const parsedResponse = await response.json();
      if(response.status === 200){
          this.setState({
              userId: parsedResponse.id,
              loggedIn: true
          })
      }
      console.log("APP.JS STATE" + this.state.userId);
  }

  render(){
    return (
      <div className="App">
        <link href="https://fonts.googleapis.com/css?family=Fascinate+Inline|Open+Sans" rel="stylesheet"></link>
        <header> QUEER REX</header>
        <p>LGTBQIA+ media recommendations; <br></br>
            for queers by queers.</p> 

        {
          this.state.loggedIn ?
          <RecIndex userId = {this.state.userId}/>
          :
          <AuthGateway handleRegister={this.handleRegister} 
          handleLogin={this.handleLogin}></AuthGateway>
        }
        
      </div>
    );
  }
}

export default App;
