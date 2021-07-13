import React, {Component} from "react";
import {Link} from "react-router-dom";
import Individual from "./Individual";


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