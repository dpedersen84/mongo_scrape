import React from "react";
import API from "../../utils/API";
import Well from "../../components/Well/Well.js";


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

    viewArticle = () => {
        console.log("view article")
    }

    favArticle = () => {
        console.log("fav article")
    }

    render() {
        return (
            <div>
                <div className="container">
                    {this.state.articles 
                        .map(article => (
                            <Well key={article._id} >
                                <div><h3>{article.title}</h3></div>
                                <div onClick={this.viewArticle}><h5>{article.link}</h5></div>
                                <div className="btn btn-primary" onClick={this.favArticle}>
                                    Favorite
                                </div>
                            </Well>
                        ))
                        }
                </div>
            </div>
        )
    }
}

export default Articles;