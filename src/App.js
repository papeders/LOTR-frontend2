import './App.css';
import {Link, Route, withRouter} from "react-router-dom";
import React, { Component } from 'react';
import axios from 'axios';
import Header from './components/Header';
import Profile from './components/Profile';
import Home from './components/Home';

class App extends Component {
  constructor(props){
    super(props)

    this.state = {
      name: '',
      username: '',
      loggedIn:false
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
  render() {
    return (
      <div className="App">
        <Header 
          name={this.state.name} 
          username={this.state.username} 
          loggedIn={this.state.loggedIn} 
          onLogin={this.onLogin}         
        />
        <Route
          path="/profile/:username"
          render={(props) => 
          <Profile {...props} 
          username={this.state.username}/>}
        />
        <Route
          path="/"
          exact render={() => 
          <div> 
          <Home/> 
          </div> 
        }
        />
  
      </div>
    );
  }
}

export default withRouter(App);
