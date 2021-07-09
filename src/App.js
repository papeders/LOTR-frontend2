import './App.css';
import {Link, Route, withRouter} from "react-router-dom";
import Header from './components/Header';
import Signup from './components/Signup';
import Home from './components/Home';
import Profile from './components/Profile';
import React, { Component } from 'react';
import axios from 'axios';
import SearchStream from './components/SearchStream';
import Individual from './components/Individual';

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
      charList:[],
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
  // addFavQuote = (_id, dialog, userName) => {
  //   //add drink to favorites, updates backend api and adds drink to fav list in state.

  //   const newDrink = {name: drinkName, drinkID: drinkId}
  //   axios.post(`http://localhost:3001/drink/${userName}`, newDrink)
  //     .then(response => {
  //       axios.get(`http://localhost:3001/drink/${userName}`)
  //       .then(resp => {
            
  //           this.setState({
  //               favList:resp.data
  //           })
            
  //       })
  //     })
  // }

  // delFavDrink = (drinkId) => {
  //   //Remove drink from favorites, updates backend api and removes drink from fav list in state.

  //   axios.delete(`http://localhost:3001/drink/${drinkId}`)
  //   .then(response => {
  //     axios.get(`http://localhost:3001/drink/${this.state.username}`)
  //     .then(resp => {
          
  //         this.setState({
  //             favList:resp.data
  //         })
          
  //     })
  //   })
  // } 

  searchCharacters = (string) => {
         axios.get(`https://the-one-api.dev/v2/${string}`)
        .then(resp => {
          console.log(resp)
          this.setState({
            charList:resp.data.docs
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
          <Home searchCharacters={this.searchCharacters}/> 
          <SearchStream charList={this.state.charList}/>
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
        <Route
          path="/quote/:id"
          render={(props) => <Individual 
          username={this.state.username}
          {...props} 
          favList={this.state.favList}
        />
        }
        />
        </div>
      </div>
    );
  }
   
}

export default withRouter(App);
