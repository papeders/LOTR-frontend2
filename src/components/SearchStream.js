import React, {Component} from "react";
import {Link} from "react-router-dom";

class SearchStream extends Component {
    constructor (props) {
        super (props)
    }

render () {
    return (
        <div>
            <div className="container">
                {this.props.quoteList.map(quotes => {
                     return (
            <Link
                to={`character/id`}>
            <div className="each">
                <p>{quotes.dialog}</p>
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