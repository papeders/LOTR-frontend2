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
    }
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

    render () {        
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