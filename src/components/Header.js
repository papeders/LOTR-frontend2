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
        <div className="header">
            <div className="head-left">
                <h1 className="title"> One Quote...</h1>
                <Link to={`/profile/${this.props.username}`}>Profile</Link>
            </div>
            <div className="center">
                <Link to='/search'> Search by Movie:</Link>
            </div>
            <div className="head-right">
                <div className="login-container">
                    <h4 className="title">Welcome, {this.props.name}</h4>                
                    <Link onClick={this.props.onLogout}>Logout</Link>
                </div>
            </div>
        </div>
    :
        <div className="header">
            <div className="head-left">
                <h1 className="title">One Quote...</h1>
            </div>
            <div className="head-right">
                <div className="login-container">
                    <form onSubmit={this.props.onLogin}>
                        <input 
                            className="button"
                            type="text" 
                            placeholder="Username" 
                            name="username" />
                        <input
                            className="button" 
                            type="password" 
                            placeholder="password" 
                            name="password" />
                        <input
                            className="button" 
                            type="submit" 
                            value="Login" />
                    </form>
                </div>
                <Link to="/signup">Sign Up!</Link>
            </div>
        </div>    
    }
</div>

        )
    }
}

export default Header;