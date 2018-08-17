import axios from "axios";

export default {

    getArticles: () => {
        return axios.get("/api/articles");
    },

    scrapeArticles: () => {
        return axios.get("/api/articles/scrape");
    },

    favoriteArticle: (articleData) => {
        return axios.post("/api/favorites", articleData);
    },

    getFavorites: () => {
        return axios.get("/api/favorites");
    },

    deleteFavorite: (articleId) => {
        return axios.delete("/api/favorites/" + articleId);
    },

    saveNote: (articleId, noteData) => {
        return axios.post("/api/favorites/" + articleId, noteData);
    },

    loadNotes: (articleId) => {
        return axios.get("/api/favorites/" + articleId);
    },

    deleteNote: (noteId, articleId) => {
        return axios.delete("/api/notes/" + noteId, articleId);
    }

};