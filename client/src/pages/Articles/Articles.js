import React, { Component } from "react";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
//import DeleteBtn from "../../components/DeleteBtn";
import { Col, Row, Container } from "../../components/Grid";
import { ListItem } from "../../components/List";
import SearchForm from "../../components/Form/SearchForm";
import SearchList from "../../components/SearchList/list";

class Articles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      results: [],
      search: "",
      title: "",
      date: "",
      url: ""
    };
  }
  componentDidMount() {
    //this.searchArticles("trump");
    this.loadArticles();
  }

  loadArticles = () => {
    API.getArticles()
      .then(res=> this.setState({ articles: res.data}))
    .catch(err => console.log(err));
    console.log("Loading: " + this.state.articles);
  };

  searchArticles = query => {
    API.search(query)
      .then(res => this.setState({ results: res.data.response.docs }))
      .catch(err => console.log(err));
    console.log("results: " + this.state.results);
  };

  handleInputChange = event => {
    const value = event.target.value;
    const name = event.target.name;
    this.setState({
      [name]: value
    });
  };
  deleteArticle = id => {
    console.log("ID: "+ id);
    API.deleteArticle(id)
      .then(res => this.loadArticles())
      .catch(err => console.log(err));
  };
  // When the form is submitted, search the OMDB API for the value of `this.state.search`
  handleFormSubmit = event => {
    event.preventDefault();
    this.searchArticles(this.state.search);
  };

  saveArticles = result => {
    console.log(result);
    API.saveArticle({
      title: result.headline.main,
      date: result.pub_date,
      url: result.web_url
    })
      .then(res => this.loadArticles())
      .catch(err => console.log("Error Catch: " + err));

  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-6">
            <Jumbotron>
              <h1>What Articles Should I Read?</h1>
            </Jumbotron>

            <SearchForm />

          </Col>
          <Col size="md-6 sm-12">
            <Jumbotron>
              <h1>articles On My List</h1>
            </Jumbotron>
            {this.state.results.map(result => (
              <SearchList
                data={result}
                title={result.headline.main}
                date={result.pub_date}
                url={result.web_url}
                saveArticles={this.saveArticles}
              />
            ))}
            {this.state.articles.length ?(
        
              <div>
                {this.state.articles.map(article => (
                  <ListItem
                    key={article._id}
                    id={article._id}
                    title={article.title}
                    date={article.date}
                    url={article.url}
                    deleteArticle={this.deleteArticle}

                  />
                ))}
             </div>
            ):(
          <h2>
          There are no Saved Articles.
        </h2>
             )}
               
              
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Articles;
