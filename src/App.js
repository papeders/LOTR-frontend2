import './App.css';
import {Link, Route, withRouter} from "react-router-dom";
import Header from './components/Header';
import Signup from './components/Signup';
import Home from './components/Home';
import Profile from './components/Profile';
import React, { Component } from 'react';
import axios from 'axios';
import SearchStream from './components/SearchStream';

const token = "sEOk9zqaPd6ghXcWSjL7"
axios.defaults.baseURL = 'http://localhost:3000/'
axios.defaults.headers.common = {'Authorization': `Bearer ${token}`}


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      username: '',
      favList:[],
      quoteList:[],
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
  updateFavs = (list) => {
    this.setState({
      favList: list
    })
  } 

  searchQuotes = (string) => {
         axios.get(`https://the-one-api.dev/v2/quote`)
        .then(resp => {
          console.log(resp)
          this.setState({
            quoteList:resp.data.docs
          })
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
          <Home searchQuotes={this.searchQuotes}/> 
          <SearchStream quoteList={this.state.quoteList}/>
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
          updateFavs={this.updateFavs} 
          onLogout={this.onLogout}/>}
        /> 
        </div>
      </div>
    );
  }
   
}

export default withRouter(App);
