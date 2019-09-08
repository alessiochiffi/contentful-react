import React from 'react';
import { Link } from 'react-router-dom';

const Card = props => (
  <Link to={`post/${props.to}/`} className="card">
    <div className="image">{props.src && <img src={props.src} alt="" />}</div>
    <h2 className="title">{props.title}</h2>
  </Link>
);

export default Card;
