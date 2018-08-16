import React from "react";
import { Link } from "react-router-dom";
import API from "../../utils/API";
import Jumbotron from "../../components/Jumbotron";
import Well from "../../components/Well/Well.js";
import { TextArea, FormBtn } from "../../components/Form";
import Popup from "reactjs-popup";

class Favorites extends React.Component {
    state = {
        favArticles: [],
        noteBody: "",
        notes: [],
    };

    componentDidMount() {
        this.loadArticles();
    };

    loadArticles = () => {
        API.getFavorites()
            .then(res => {
                this.setState({ favArticles: res.data });
                // console.log(res.data);
            })
            // .catch(err => console.log(err));
    };

    delFavArticle = id => {
        API.deleteFavorite(id)
            .then(res => this.loadArticles())
    };

    addNote = (id) => {
        API.saveNote(
            id, 
            { body: this.state.noteBody }
        )
            .then(res => this.loadArticles())
    };

    handleInputChange = event => {
        const { name, value } = event.target;
        // console.log(name, value)
        this.setState({
            [name]: value
        });
    };

    showNotes = id => {
        // console.log(id)
        API.loadNotes(id)
            .then(res => {
                console.log(res.data.note)
                this.setState({ notes: res.data.note })
                this.state.notes.map(note => {
                    return console.log(note.body)
                })
            })
    }

    render() {
        return (
            <div>
                <Jumbotron>
                    <h1> Onion Favorites!</h1>
                    <Link to={"/"}>
                    <div className="btn btn-info"> Back </div>
                    </Link>
                </Jumbotron>
                <div className="container">
                    <div className="row">
                        <div className="col-md-4">
                            <h3>Article Notes</h3>
                            <div style={{ opacity: this.state.notes.length ? 1 : 0 }}>
                                {this.state.notes
                                    .map(note => (
                                        <div key={note._id}>
                                            <ul>
                                                <li>
                                                    {note.body}
                                                </li>
                                            </ul>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                        <div className="col-md-8">
                            {this.state.favArticles 
                                .map(article => (
                                    <Well key={article._id} >
                                        <div><h3>{article.title}</h3></div>
                                        <div><a href={article.link}>{article.link}</a></div>
                                        <div 
                                            className="btn btn-default" 
                                            onClick={() => this.showNotes(article._id)}
                                        >
                                            Show Notes
                                        </div>
                                        <Popup
                                            trigger={<button className="btn btn-primary" onClick={() => this.showNotes(article._id)}> Add Note </button>}
                                            modal
                                            closeOnDocumentClick
                                            // onClick={() => this.showNotes(article._id)}
                                            >
                                            <div>
                                                <form>
                                                    <TextArea 
                                                        value={this.state.noteBody}
                                                        onChange={this.handleInputChange}
                                                        name="noteBody"
                                                        placeholder="Note"
                                                    />
                                                    <FormBtn
                                                        onClick={() => this.addNote(article._id)}
                                                    >
                                                    Submit Note</FormBtn>
                                                </form>
                                            </div>
                                        </Popup>
                                        <div 
                                            className="btn btn-success" 
                                            onClick={() => this.delFavArticle(article._id)}
                                        >
                                            Remove
                                        </div>
                                    </Well>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Favorites;