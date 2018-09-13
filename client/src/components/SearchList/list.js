import React from "react";

const SearchList = props => (
  
    <div className="card">
    
      <ul className="list-group">
      <button className="btn btn-primary" onClick={() => props.saveArticles(props.data)}>
    Save
  </button>
  
        <li className="list-group-item">
          <strong>Title:</strong> {props.title}
        </li>
        <li className="list-group-item">
          <strong>Date:</strong> {props.date}
        </li>
        <li className="list-group-item">
          <strong>URL:</strong> {props.url}
        </li>
      </ul>
</div>
);

export default SearchList;
