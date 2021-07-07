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
                {this.props.bookList.map(books => {
                     return (
            <Link
                to={`https://the-one-api.dev/v2/book/${books._id}/chapter`}>
            <div className="each">
                <p>{books.name}</p>
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