import React from "react";
import { Link } from "react-router-dom";
import API from "../../utils/API";
import Jumbotron from "../../components/Jumbotron";
import Well from "../../components/Well/Well.js";

class Favorites extends React.Component {
    state = {
        favArticles: [],
    };

    componentDidMount() {
        this.loadArticles();
    };

    loadArticles = () => {
        API.getFavorites()
            .then(res => {
                this.setState({ favArticles: res.data });
                console.log(res.data);
            })
            .catch(err => console.log(err));
    };

    render() {
        return (
            <div>
            <Jumbotron>
                <h1> Onion Favorites!</h1>
                <Link to={"/"}>
                <div className="btn btn-info"> Back </div>
                </Link>
                {/* <Link to={"/favorites"}>
                    <div className="btn btn-danger"> Favorites </div>
                </Link> */}
            </Jumbotron>
            <div className="container">
                <div>
                    {this.state.favArticles 
                        .map(article => (
                            <Well key={article._id} >
                                <div>
                                    <h3 id={article._id}>{article.title}</h3>
                                </div>
                                <div>
                                    <a href={article.link}>{article.link}</a>
                                </div>

                                <div 
                                    className="btn btn-primary" 
                                    // onClick={() => this.favArticle(article.title, article.link)} 
                                    id={article._id}
                                    title={article.title}
                                    link={article.link}
                                >
                                    Add Note
                                </div>

                                <div 
                                    className="btn btn-success" 
                                    // onClick={() => this.favArticle(article.title, article.link)} 
                                    id={article._id}
                                    title={article.title}
                                    link={article.link}
                                >
                                    Remove
                                </div>
                            </Well>
                        ))
                    }
                </div>
            </div>
            </div>

        )
    }
}

export default Favorites;