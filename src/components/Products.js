import '../static/customStyling.css';
import React from 'react';
import { set, ref } from 'firebase/database';
import { useDatabase, useUser } from 'reactfire';

const Product = (props) => {
    const { userStatus, data: user } = useUser();
    const db = useDatabase();

    // I want to be able to set our Cart with a new addition when the Hire button is pressed
    let addToCart = () => {
        let mutatingCart = { ...props.cart }; // copy current cart state so we aren't mutating state directly

        // increase the size of the cart by one
        mutatingCart.size++;

        // check if the actor.id already exists in the cart items
        mutatingCart.items[props.actor.id] ? mutatingCart.items[props.actor.id].quantity += 1 : mutatingCart.items[props.actor.id] = { data: props.actor, quantity: 1 }; // add new item in

        // change the total
        let floatPrice = parseFloat(props.actor.hiringprice.replaceAll(',', '').replace('$', ''));
        mutatingCart.total = mutatingCart.total + floatPrice;

        if (user) {
            let uid = user.uid;
            set(ref(db, `carts/${uid}`), mutatingCart);
        }
        props.setCart(mutatingCart); // mutate state through setState
    }

    return (
        <div className="card actorCard">
            <img src={props.actor.image} className="card-img-top img-fluid" alt="All actors should be Danny DeVito" />
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
                <button className="btn btn-sm btn-info" onClick={addToCart}>Hire</button>
            </div>
        </div>
    )
}

export default Product;