import './App.css';
import {Link, Route, withRouter} from "react-router-dom";
import Header from './components/Header';
import Signup from './components/Signup';
import Home from './components/Home';
import Profile from './components/Profile';
import React, { Component } from 'react';
import axios from 'axios';


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      username: '',
      loggedIn: false
    }
  }

  onLogin = (event) => {

    event.preventDefault()
    
    const params = {password: event.target.password.value}
    
    axios.put(`http://localhost:3001/user/login/${event.target.username.value}`, params)
      .then(response => {
        this.setState({
          name: response.data.name,
          username: response.data.username,
          loggedIn: true
        })
      this.props.history.push(`/profile/${response.data.username}`)
      }

      )
  }

  onLogout = (event) => {

    if (event) {event.preventDefault()} 
    this.setState({
      name: '',
      username: '',
      favList: [],
      loggedIn: false
    })
    this.props.history.push('/')
  }

  updateState = (username, name) => {

    this.setState({
      username: username,
      name: name,
      loggedIn: true
    })
  } 

 


  render() {
    return (
      <div className="App">

        <Header 
          name={this.state.name} 
          username={this.state.username} 
          loggedIn={this.state.loggedIn} 
          onLogin={this.onLogin}
          onLogout={this.onLogout}          
        />
        
        <div className="content"> {/* content container for styling. */}
        
        <Route
          path="/"
          exact render={() => 
          <div> 
          <Home/> 
          </div> 
        }
        />

      
        <Route
          path ="/signup"
          render={(props) => <Signup 
            username={this.state.username} 
            loggedIn={this.state.loggedIn} 
            {...props} 
            updateState={this.updateState}/>}
        />
        <Route
          path="/profile/:username"
          render={(props) => 
          <Profile {...props} 
          username={this.state.username} 
          updateState={this.updateState} 
          onLogout={this.onLogout}/>}
        /> 
        </div>
      </div>
    );
  }
   
}

export default withRouter(App);
