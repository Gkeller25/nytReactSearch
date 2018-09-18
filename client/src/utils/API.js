import axios from "axios";
import APIKEY from "./APIKEY";

export default {

  search: function (query) {
    let endDate = query.endDate.replace(/\//g, '');
    let startDate = query.startDate.replace(/\//g, '');
    //run the query with endDate filter
    if (query.startDate === "" && query.endDate === "") { 
   const queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?facet_filter=true&api-key=" +
    APIKEY + "&q=" + query.search + `&facet_field=source&fl=headline,pub_date,web_url,_id`;
    return axios.get(queryURL);}

    //run the query with startDate filter
    else if (query.endDate === "") { 
    const queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?facet_filter=true&api-key=" +
    APIKEY + "&q=" + query.search + `&facet_field=source&begin_date=${startDate}&fl=headline,pub_date,web_url,_id`;
    return axios.get(queryURL);}

    //run the query with no date filters
    else if (query.startDate === "") {
    const queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?facet_filter=true&api-key=" +
    APIKEY + "&q=" + query.search + `&facet_field=source&end_date=${endDate}&fl=headline,pub_date,web_url,_id`;
    return axios.get(queryURL);}

    //run the query with Both Date filters
    else { 
    const queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?facet_filter=true&api-key=" +
    APIKEY + "&q=" + query.search + `&facet_field=source&begin_date=${startDate}&end_date=${endDate}&fl=headline,pub_date,web_url,_id`;
    return axios.get(queryURL);
  }},
  // Gets all articles
  getArticles: function () {
    return axios.get("/api/articles");
  },
  // Gets the article with the given id
  getArticle: function (id) {
    return axios.get("/api/articles/" + id);
  },
  // Deletes the article with the given id
  deleteArticle: function (id) {
    return axios.delete("/api/articles/" + id);
  },
  // Saves an article to the database
  saveArticle: function (articleData) {
    return axios.post("/api/articles", articleData);
  }
};
