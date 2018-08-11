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

    viewArticle = () => {
        console.log("view article")
    };

    favArticle = (title, link) => {
        // console.log("fav article")
        console.log(title);
        console.log(link);
        API.favoriteArticle({
            title: title,
            link: link,
        })
        .then(res => console.log(res))
            
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
                                    <div><h3>{article.title}</h3></div>
                                    <div onClick={this.viewArticle}><h5>{article.link}</h5></div>
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
                                    {/* <Link to={article.link}>
                                    <div className="btn btn-primary">View</div>
                                    </Link> */}
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