import React, {Component} from "react";
import {Link} from "react-router-dom";


class Header extends Component{
    constructor(props) {
        super (props)
    }

    render () {
        return (
            
        <div className="header-container">
            {this.props.loggedIn === true ?
            //logged in display

                <div className="header">
                    <div className="head-left">
                <h1 className="title">One Ring...</h1>
                <Link to="/search">Search by movie:</Link>
                <br></br>
                <Link to={`/profile/${this.props.username}`}>Profile</Link>
            </div>
        <div className="head-right">
            <div className="login-container">
                <h4 className="title">Welcome, {this.props.name}</h4>
                
                <Link onClick={this.props.onLogout}>Logout</Link>
            </div>
        </div>
                </div>  
            :
            //logged out display

                <div className="header">
                    <div className="head-left">
                <h1 className="title">One Ring...</h1>
                
            </div>
        <div className="head-right">
            <div className="login-container">
                <form onSubmit={this.props.onLogin}>
                    <input 
                        className="button-head"
                        type="text" 
                        placeholder="Username" 
                        name="username" />
                    <input
                        className="button-head" 
                        type="password" 
                        placeholder="password" 
                        name="password" />
                    <input
                        className="button-head" 
                        type="submit" 
                        value="Login" />
                </form>
            </div>
            <Link
                to="/signup">Sign Up!</Link>
        </div>
                </div>    
        }
        </div>
            
        )
    }
}

export default Header;