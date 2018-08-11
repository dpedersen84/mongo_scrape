import axios from "axios";

export default {

    getArticles: () => {
        return axios.get("/api/articles");
    },

    scrapeArticles: () => {
        return axios.get("/api/articles/scrape");
    },

    favoriteArticle: (articleData) => {
        return axios.post("/api/articles/favorites", articleData);
    },

};