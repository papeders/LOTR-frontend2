import React, {Component} from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import SearchStream from "./SearchStream";

class Individual extends Component {
    constructor (props) {
        super (props)

        this.state= {
            char:[],
            recievedChar: false,
            quote: [],
            recievedQuote: false,
        }

    }
    getInfo = () =>{
        axios.get(`https://the-one-api.dev/v2/character/${this.props.match.params.id}`)
        .then(response => {
            
            this.setState({
                char:response.data.docs[0],
                recievedChar:true
            })
        })
    }
    getQuote = () =>{
        axios.get(`https://the-one-api.dev/v2/character/${this.props.match.params.id}/quote`)
        .then(response => {
            console.log(response)
            this.setState({
                quote:response.data.docs,
                recievedQuote: true
            })
        })
    }
    componentDidMount = () => {
    this.getInfo()
    this.getQuote()
    }
    
    favID = '' //storing favID--from backend API--here allows to manipulate DB without external API call.
    
    checkFavs = (id) => {
        //checks to see if drink is in fav List by external API drink ID.
        //returns true or false.

        for (let i=0; i < this.props.favList.length; i++) {
            
            if (this.props.favList[i].charID == id) {
                this.favID = this.props.favList[i].id
                return true
            }
        }
        return false
    }

render () {         
    return (
<div>
    <div className="charInfo">
        {this.state.recievedChar && 
    <div>
        <h1>{this.state.char.name} </h1> <br></br>
    <div className="infoContainer">    
            <h3>Character Informtaion:</h3>
            <table>
                <tr>
                    <th>Gender</th>
                    <th>Race</th>
                    <th>Realm</th>
                    <th>Spouse</th>
                    <th>Birth</th>
                    <th>Death</th>
                    <th>Hair</th>
                    <th>Height</th>
                    <th>wikiUrl</th>
                </tr>
                <tr>                    
                    <td> {this.state.char.gender} </td>
                    <td> {this.state.char.race} </td>
                    <td> {this.state.char.realm} </td>                    
                    <td> {this.state.char.spouse} </td>
                    <td> {this.state.char.birth} </td>
                    <td> {this.state.char.death} </td>
                    <td> {this.state.char.hair} </td>                    
                    <td> {this.state.char.height} </td>
                    <td>
                        <Link> {this.state.char.wikiUrl} </Link>
                    </td>            
                </tr>              
            </table>
    </div>    
    </div>
        }            
    </div>
    <div className="quotes">
    {
                this.state.quote &&               
                    this.state.quote.map((quote) => {
            return (
                <li>
                {quote.dialog}                        
                </li>
            )
        })
        }
    </div>
</div>
    )
}
}

export default Individual;