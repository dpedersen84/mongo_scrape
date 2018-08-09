import React from "react";
import API from "../../utils/API";
import Well from "../../components/Well/Well.js";
// import cheerio from "cheerio";

class Articles extends React.Component {
    state = {
        articles: [],

    };

    componentDidMount() {
        this.loadArticles();
        console.log("hello")
    }

    loadArticles = () => {
        API.getArticles()
            .then(res => {
                
                this.setState({ articles: res.data })
            })
            .catch(err => console.log("ERROR", err));
    };

    scrapeArticles = () => {
        API.scrapeArticles() 
            .then((res) => {
                    console.log(res)
                })
            .then(window.location.reload())
    };

    viewArticle = () => {
        console.log("view article")
    };

    favArticle = (id) => {
        console.log("fav article")
    };

    formatDate= (date) => {
        return Date.parse(date);
    }
    render() {
        return (
            <div>
                <div className="container">
                    <div className="btn btn-warning" onClick={this.scrapeArticles}> Scrape </div>
                    <div>
                    
                    {this.state.articles 
                        .map(article => (
                            <Well key={article._id} >
                                <div><h3>{article.title}</h3></div>
                                <div onClick={this.viewArticle}><h5>{article.link}</h5></div>
                                <div><h5>{article.date}</h5></div>
                                <div className="btn btn-primary" onClick={this.favArticle}>
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