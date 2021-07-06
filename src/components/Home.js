import React, {Component} from "react";


class Home extends Component {
    constructor (props) {
        super (props)
    }

componentDidMount(){
    this.props.searchQuotes()
}
    render () {
    return (
        <div className="landing-text search-container">
            <h1> Welcome to One Quote...</h1>
            <p>Login or sign up above to search the library.</p>         
        </div>
    )
}
}

export default Home;