import React, {Component} from "react";
import axios from "axios";
import {Link} from "react-router-dom";

class Profile extends Component {
    constructor(props){
    super(props)
    this.state = {
        username: '',
        password: '',
        email: '',
        name: '',
        img: '',
        quoteList:[],
    }
}
handleChange = (event) => {
    this.setState({
        [event.target.name]: event.target.value
    })        
}

fetchProfile = () => {        
    axios.get(`http://localhost:3001/user/${this.props.username}`)
        .then(resp => {               
            this.setState({                    
                username: resp.data.username,
                password: resp.data.password,
                name: resp.data.name,
                email: resp.data.email,
                img: resp.data.img
            })
                
        })
}

fetchQuotes = () => {
    axios.get(`http://localhost:3001/quote/${this.props.username}`)
    .then(resp => {        
        this.setState({
            quoteList:resp.data
        })
        this.props.updateQuotes(this.state.quoteList)
    })    
}

componentDidMount =() => {
    this.fetchProfile();
    this.fetchQuotes();
}

onSubmit = (event) => {
    event.preventDefault()
    axios.put(`http://localhost:3001/user/${this.props.username}`, this.state)
        .then(resp => {            
            this.props.updateState(this.state.username, this.state.name)
        })
    
}
handleDeleteUser = () => {
    axios.delete(`http://localhost:3001/user/${this.props.username}`)
    .then(() =>{
        this.props.onLogout()
    })
}

render () { 
const quoteList = this.state.quoteList.map(quote =>{
    return(
        <div>
        <Link to={`/quote/${quote.quoteID}`}>
            {quote.name}
        </Link>                                                              
        </div>
                
            )
        })       
    return (
    <div className="info">
        <div className="profile search-container">
            <h1> Profile:</h1>
            <p> {this.state.username} </p>
            <form onSubmit={this.onSubmit}>
                password:<input 
                    className="button"
                    type="password"  
                    name="password" 
                    value={this.state.password} 
                    onChange={this.handleChange}/> <br></br>
                name:<input 
                    className="button"
                    type="text" 
                    name="name" 
                    value={this.state.name} 
                    onChange={this.handleChange}/> <br></br>
                email:<input 
                    className="button"
                    type="text" 
                    name="email" 
                    value={this.state.email} 
                    onChange={this.handleChange}/> <br></br>
                img:<input 
                    className="button"
                    type="text" 
                    name="img" 
                    value={this.state.img} 
                    onChange={this.handleChange}/> <br></br>
                <input 
                    className="button"
                    type="submit" 
                    value="Submit Changes" /> <br></br>
            </form>
        </div>
    </div>
    )
}
}

export default Profile;