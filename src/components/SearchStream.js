import React, {Component} from "react";
import {Link} from "react-router-dom";


class SearchStream extends Component {
    constructor (props) {
        super (props)
    }
    componentDidMount(){
        this.props.searchCharacters("character")
    }

    
render () {
    return (
        <div>
            <Link to="/">
                <img src="https://cdn.dribbble.com/users/24711/screenshots/1476445/mordor_animation_2x.gif" height="60px"/>
            </Link>
            <div className="container">
                {this.props.charList.map(chars => {
                     return (
            <Link
                to={`/quote/${chars._id}`}>
            <div className="each">
                <p>{chars.name}</p>
            </div>
            </Link>               
                )
            })}
              </div> 
              
        </div>
    )
}
}

export default SearchStream;