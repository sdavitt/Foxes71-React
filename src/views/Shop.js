import '../static/customStyling.css';
import React from 'react';
import Product from '../components/Products';

const Shop = (props) => {
    console.log(props.actors);
    return (
        <div className="container">
            <div className="row shopShelf">
                {
                    !props.actors // initial condition: not props.actors -> true if props.actors is null or undefined
                    ? //ternary operator
                    <h1>Loading actors for hire...</h1> // thing to do if initial condition succeeds
                    : //ternary operator seperator
                    Object.values(props.actors).map(actor => {
                        return <Product actor={actor}/>
                    }) // thing to do if initial condition fails
                }
            </div>
        </div>
    )
};

export default Shop;