import React from "react";
import { Link } from "react-router-dom";
import API from "../../utils/API";
import Jumbotron from "../../components/Jumbotron";
import Well from "../../components/Well/Well.js";
// import cheerio from "cheerio";

class Articles extends React.Component {
    state = {
        articles: [],

    };

    componentDidMount() {
        this.loadArticles();
    }

    loadArticles = () => {
        API.getArticles()
            .then(res => this.setState({ articles: res.data }))
            .catch(err => console.log(err));
    };

    scrapeArticles = () => {
        API.scrapeArticles() 
            .then((res) => this.loadArticles())
            .catch(err => console.log(err));
    };

    favArticle = (title, link) => {
        // console.log("fav article")
        // console.log(title);
        // console.log(link);
        API.favoriteArticle({
            title: title,
            link: link,
        })
        .then(res => {
            // console.log(res)
            res.data.code === 11000 ? alert("Already a favorite!") : alert("Favorite added!")
        })
    };

    formatDate= (date) => {
        return Date.parse(date);
    }
    render() {
        return (
            <div>
                <Jumbotron>
                    <h1> Scrape Articles from the Onion!</h1>
                    <div className="btn btn-warning" onClick={this.scrapeArticles}> Scrape </div>
                    <Link to={"/favorites"}>
                        <div className="btn btn-danger"> Favorites </div>
                    </Link>
                </Jumbotron>
                <div className="container">
                    <div>
                        {this.state.articles 
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
                                        onClick={() => this.favArticle(article.title, article.link)} 
                                        key={article._id}
                                        id={article._id}
                                        title={article.title}
                                        link={article.link}
                                    >
                                        Favorite
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

export default Articles;