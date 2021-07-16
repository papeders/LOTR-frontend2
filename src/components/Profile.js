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
        quote: '',
        favList:[],
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

componentDidMount =() => {
    this.fetchProfile();
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
    return (
    <div className="info">
        <div className="entireProfile">
            <h1> {this.state.username} </h1>
            <img className="mainImg" src={this.state.img}/>
            <form className= "profile"
                  onSubmit={this.onSubmit}>
                    <label for ="password"> Password:</label>
                    <input 
                        className="button"
                        type="password"  
                        name="password" 
                        value={this.state.password} 
                        onChange={this.handleChange}/> <br></br>
                    <label for ="name"> Name:</label>
                    <input
                        className="button"
                        type="text" 
                        name="name" 
                        value={this.state.name} 
                        onChange={this.handleChange}/> <br></br>
                    <label for ="email"> E-mail:</label>
                    <input 
                        className="button"
                        type="text" 
                        name="email" 
                        value={this.state.email} 
                        onChange={this.handleChange}/> <br></br>
                    <label for ="img"> Image:</label>
                    <textarea rows="4"
                        className="button"
                        type="text" 
                        name="img" 
                        value={this.state.img} 
                        onChange={this.handleChange}/> <br></br>
                    <button 
                        className="button-head"
                        type="submit" 
                        value="Submit Changes"> Submit Updates 
                    </button> <br></br>               
            </form>
                <button
                    className="button-head"
                    type="submit" 
                    value="Delete Profile" 
                    onClick={this.handleDeleteUser}>Delete User?
                </button>
        </div>
        <Link to="/">
        <img src="https://cdn.dribbble.com/users/24711/screenshots/1476445/mordor_animation_2x.gif" height="60px"/>
    </Link>
    </div>
    )
}
}

export default Profile;