import axios from "axios";
import React, {Component} from "react";
import {Link} from "react-router-dom";


class Home extends Component {
    constructor (props) {
        super (props)
    
        this.state= {
            charList:[],
        }
    }
    getCharacter = (string) =>{
        axios.get(`https://the-one-api.dev/v2/character/${string}`)
        .then(response =>{
            console.log(response)
            this.setState({
                charList:response.data.docs,
            })
        })
    }
    componentDidMount() {
        // this.getCharacter("5cd99d4bde30eff6ebccfc15")
        // this.getCharacter("5cd99d4bde30eff6ebccfc07")
        // this.getCharacter("5cd99d4bde30eff6ebccfc38")
        // this.getCharacter("5cd99d4bde30eff6ebccfd81")
        // this.getCharacter("5cd99d4bde30eff6ebccfe9e")
        // this.getCharacter("5cd99d4bde30eff6ebccfea4")
        this.getCharacter("5cd99d4bde30eff6ebccfea0")
        // this.getCharacter("5cd99d4bde30eff6ebccfea5")
        // this.getCharacter("5cd9d5a0844dc4c55e47afef")

    }

    render () {
    return (
        <div className="entireHome">
            <div className="landing-text search-container">
                <h1> Welcome to One Quote...</h1>
                <p>Login or sign up above to search the library.</p>  
                <p> Check out Gandalfs page:</p>       
            </div>
            <div className="homePerson">
            <div className="container">
                {this.state.charList.map((charList) => {
                     return (
            <Link
                to={`/quote/${charList._id}`}>
            <div className="each">
                <button className= "button-head">{charList.name}</button>
            </div>
            </Link>               
                )
            })}
              </div>    
            </div>
                
        </div>

    )
}
}

export default Home;