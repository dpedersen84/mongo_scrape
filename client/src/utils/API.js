import axios from "axios";

export default {

    getArticles: () => {
        return axios.get("/api/articles");
    },

    scrapeArticles: () => {
        return axios.get("/api/articles/scrape");
    },

};