import React, { Component } from "react";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import { Col, Row, Container } from "../../components/Grid";
import { ListItem } from "../../components/List";
import { Input, FormBtn } from "../../components/Form";
import SearchList from "../../components/SearchList/list";
import MaskedInput from 'react-maskedinput';

class Articles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      results: [],
      search: "",
      startDate: "",
      endDate: ""
    };
  }
  componentDidMount() {
    this.loadArticles();
  }

  loadArticles = () => {
    API.getArticles()
      .then(res => this.setState({ articles: res.data }))
      .catch(err => console.log(err));

  };

  searchArticles = query => {

    API.search(query)
      .then(res => {
        console.log(this.state)
        this.setState({
          results: res.data.response.docs,
          search: "", startDate: "", endDate: ""
        })
        console.log(this.state)
       }
      )
      .catch(err => console.log(err));

  };

  handleInputChange = event => {
    const value = event.target.value;
    const name = event.target.name;
    this.setState({
      [name]: value
    });
  };

  deleteArticle = id => {

    API.deleteArticle(id)
      .then(res => this.loadArticles())
      .catch(err => console.log(err));
  };
  // When the form is submitted, search the NYT API for the value of `this.state.search`

  handleFormSubmit = event => {
    event.preventDefault();

    this.searchArticles({
      search: this.state.search,
      startDate: this.state.startDate,
      endDate: this.state.endDate
    });
  };

  _onChange = (event) => {
    event.preventDefault();
    this.setState({ [event.target.name]: event.target.value })
    //this.handleInputChange(event);
  }

  saveArticles = result => {
    API.saveArticle({
      title: result.headline.main,
      date: result.pub_date,
      url: result.web_url
    })
      .then(res => this.loadArticles())
      //maybe something can be inserted here to indicate that you can't save duplicates?
      .catch(err => console.log("Error Catch: " + err));

  };

  render() {
    return (
      <Container fluid>
        <Row>
          <div className="container text-center">
            <form>

              <Input
                value={this.state.search}
                onChange={this.handleInputChange}
                name="search"
                placeholder="Keywords (required)"
              />
              <div className="form-group">
                <label>Start Date:
                <MaskedInput className="form-control" value={this.state.startDate} mask="1111/11/11" name="startDate" placeholder="YYYY/MM/DD" onChange={this._onChange} />
                </label>
              </div>
              <div className="form-group">
                <label>End Date:
                <MaskedInput className="form-control" value={this.state.endDate} mask="1111/11/11" name="endDate" placeholder="YYYY/MM/DD" onChange={this._onChange} />
                </label>
              </div>
              <FormBtn
                disabled={!(this.state.search)}
                onClick={this.handleFormSubmit}
              >
                Search
              </FormBtn>
            </form>
          </div>
        </Row>
        <Row>

          <Col size="md-6 sm-12">
            <Jumbotron>
              <h1>Saved Articles</h1>
            </Jumbotron>

            {this.state.articles.length ? (

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
            ) : (
                <h2 className="text-center">
                  There are no Saved Articles.
                </h2>
              )}

          </Col>
          <Col size="md-6 sm-12">
            <Jumbotron>
              <h1>Articles Search Results</h1>
            </Jumbotron>
            {this.state.results.map(result => (
              <SearchList
                key={result._id}
                data={result}
                title={result.headline.main}
                date={result.pub_date}
                url={result.web_url}
                saveArticles={this.saveArticles}
              />
            ))}



          </Col>
        </Row>
      </Container>
    );
  }
}

export default Articles;
