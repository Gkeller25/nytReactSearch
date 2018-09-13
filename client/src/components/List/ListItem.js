import React from "react";

export const ListItem = props => (
  <div className="card">
  <ul className="list-group">
        <span className="delete-btn" onClick={() => props.deleteArticle(props.id)}>
          ✗
        </span>
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
