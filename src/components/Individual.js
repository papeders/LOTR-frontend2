import React, {Component} from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import SearchStream from "./SearchStream";

class Individual extends Component {
    constructor (props) {
        super (props)

        this.state= {
            quote:[],
            recievedQuote: false,
            _id: ''
        }

    }
    componentDidMount = () => {
        axios.get(`https://the-one-api.dev/v2/character/${this.props.match.params.id}`)
        .then(response => {
            
            this.setState({
                quote:response.data.docs[0],
                recievedQuote:true
            })
        })
    }
    
    favID = '' //storing favID--from backend API--here allows to manipulate DB without external API call.
    
    checkFavs = (id) => {
        //checks to see if drink is in fav List by external API drink ID.
        //returns true or false.

        for (let i=0; i < this.props.favList.length; i++) {
            
            if (this.props.favList[i].quoteID == id) {
                this.favID = this.props.favList[i].id
                return true
            }
        }
        return false
    }

    render () {
        
        
    return (
    <div className="quoteInfo">
        {this.state.recievedQuote && 
        <div>
            <h1>{this.state.quote.name} </h1> <br></br>
        <div className="container">    
            <div className="informationContainer">

                <h3 className="quoteTitle">Information:</h3>
                <ul className="ingredients"> 
                    {this.state.quote.gender != null &&
                    <li>
                        Gender: {this.state.quote.gender}                       
                    </li>
                    }
                    {this.state.quote.race != null &&
                    <li>
                        Race: {this.state.quote.race}                       
                    </li>
                    }
                     {this.state.quote.spouse != null &&
                    <li>
                          {this.state.quote.spouse}                    
                    </li>
                    }
                    {this.state.quote.realm != null ||
                    <li>
                        <label>Realm:</label>  {this.state.quote.realm}                       
                    </li>
                    }
                    {this.state.quote.wikiUrl != null &&
                    <a href= "">
                        {this.state.quote.wikiUrl}                       
                    </a>
                    }                                 
                </ul> 
                <table>
                    <tr>
                        <th>Gender</th>
                        <th>Spouse</th>
                    </tr>
                    <tr>
                    {this.state.quote.gender != null &&
                    <td>
                     {this.state.quote.gender}                       
                    </td>
                    }
                    </tr>
                    <tr>
                    {this.state.quote.spouse != null &&
                    <td>
                     {this.state.quote.spouse}                       
                    </td>
                    }
                    </tr>

                </table>
            </div>
            <div className="instructionContainer">
                <h3 className="quoteTitle">Instructions:</h3>
                <p className="instructions">{this.state.quote.strInstructions}</p>
            </div> 
        </div> 

            </div>
            }
            {this.checkFavs(this.state.quote.idQuote) 

            
            ? <button className="button" 
            onClick={() => this.props.delFavQuote(this.favID)}>Remove from Favorites</button>
            : <button className="button"
            onClick={() => this.props.addFavQuote(this.state.quote.idQuote, this.props.username)}>Add to Favorites</button>}
            
        </div>
    )
}
}

export default Individual;