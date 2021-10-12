import '../static/customStyling.css';
import fox from '../static/fox.webp';
import React from 'react';

const Product = (props) => {
    return (
        <div className="card actorCard">
            <img src={fox} className="card-img-top img-fluid" alt="All actors should be Danny DeVito"/>
            <div className="card-body">
            <h5 className="card-title">{`${props.actor.first_name} ${props.actor.last_name}`}</h5>
            </div>
            <ul className="list-group list-group-flush">
            <li className="list-group-item">{props.actor.age}</li>
            <li className="list-group-item">{props.actor.nationality}</li>
            <li className="list-group-item">{props.actor.bestrole}</li>
            <li className="list-group-item">{props.actor.bestmovie}</li>
            </ul>
            <div className="card-body">
            <h5>{props.actor.hiringprice}</h5>
            <button className="btn btn-sm btn-info">Add to Cart</button>
            </div>
        </div>
    )
}

export default Product;