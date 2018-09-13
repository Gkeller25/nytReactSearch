import axios from "axios";
import APIKEY from "./APIKEY";


export default {

  search: function(query) {
    const queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" +
    APIKEY + "&q=" + query  + "&fl=headline,pub_date,web_url";
    console.log("inside api.js "+query);
    return axios.get(queryURL);
  },
  // Gets all books
  getArticles: function() {
    return axios.get("/api/articles");
  },
  // Gets the book with the given id
  getArticle: function(id) {
    return axios.get("/api/articles/" + id);
  },
  // Deletes the book with the given id
  deleteArticle: function(id) {
    return axios.delete("/api/articles/" + id);
  },
  // Saves a book to the database
  saveArticle: function(articleData) {
    return axios.post("/api/articles", articleData);
  }
};
