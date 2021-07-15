import axios from "axios";
import React, {Component} from "react";
import {Link} from "react-router-dom";
import ReactPlayer from "react-player";


class Home extends Component {
    constructor (props) {
        super (props)
    
        this.state= {
            char:[],
        }
    }
    getCharacter = (string) =>{
        axios.get(`https://the-one-api.dev/v2/character/${string}`)
        .then(response =>{
            console.log(response)
            this.setState({
                char:response.data.docs[0],
            })
        })
    }
    componentDidMount() {
        this.getCharacter("5cd99d4bde30eff6ebccfea0")
    }

    render () {
    return (
        <div className="entireHome">
                <h1> Welcome to One Quote...</h1>
                <p>Login or sign up above to search the rest of the library.</p>  
                <p> Check out Gandalfs page:</p>       
            
            <Link
                to={`/quote/${this.state.char._id}`}>
                <button className= "button-head">{this.state.char.name}</button>            
            </Link>  
            <br></br> 
            <ReactPlayer url= "https://www.youtube.com/watch?v=9RF45wxvf_k" /> 
               
        </div>

    )
}
}

export default Home;