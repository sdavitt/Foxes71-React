import React from 'react';
import '../static/cartTempStyle.css';
import { set, ref } from 'firebase/database';
import { useDatabase, useUser } from 'reactfire';

const Cart = (props) => {
    const { userStatus, data: user } = useUser();
    const db = useDatabase();

    // remove all button - remove everything from the cart - aka putting the cart back in its original state
    const clearCart = () => {
        if (user) {
            let uid = user.uid;
            set(ref(db, `carts/${uid}`), {
                total: 0,
                size: 0,
                items: {}
            });
        }
        props.setCart({
            total: 0,
            size: 0,
            items: {}
        });
    }

    // increase quantity
    let increaseOne = (act) => {
        let mutatingCart = { ...props.cart }; // copy current cart state so we aren't mutating state directly

        // increase the size of the cart by one
        mutatingCart.size++;

        // increase specific actor's quantity by one
        mutatingCart.items[act.data.id].quantity += 1

        // change the total
        let floatPrice = parseFloat(act.data.hiringprice.replaceAll(',', '').replace('$', ''));
        mutatingCart.total = mutatingCart.total + floatPrice;

        if (user) {
            let uid = user.uid;
            set(ref(db, `carts/${uid}`), mutatingCart);
        }

        props.setCart(mutatingCart); // mutate state through setState
        console.log(props.cart);
    }

    // remove one quantity from one item
    let removeOne = (act) => {
        let mutatingCart = { ...props.cart }; // copy current cart state so we aren't mutating state directly

        // decrease the size of the cart by one
        mutatingCart.size--;

        // check if the actor has a quantity of 1 or more than 1
        mutatingCart.items[act.data.id].quantity > 1 ? mutatingCart.items[act.data.id].quantity -= 1 : delete mutatingCart.items[act.data.id];

        // change the total
        let floatPrice = parseFloat(act.data.hiringprice.replaceAll(',', '').replace('$', ''));
        mutatingCart.total = mutatingCart.total - floatPrice;

        if (user) {
            let uid = user.uid;
            set(ref(db, `carts/${uid}`), mutatingCart);
        }

        props.setCart(mutatingCart); // mutate state through setState
        console.log(props.cart); // may be a step behind -> check components bc console.log can resolve before .setCart()
    }

    // remove all of one item
    let clearItem = (act) => {
        let mutatingCart = { ...props.cart }; // copy current cart state so we aren't mutating state directly

        // decrease the size of the cart by one
        mutatingCart.size -= act.quantity;

        // decrease the total by total cost of all of that item being removed
        let floatPrice = parseFloat(act.data.hiringprice.replaceAll(',', '').replace('$', ''));
        mutatingCart.total = mutatingCart.total - floatPrice * act.quantity;

        // remove all of that item from the cart
        delete mutatingCart.items[act.data.id];

        if (user) {
            let uid = user.uid;
            set(ref(db, `carts/${uid}`), mutatingCart);
        }

        props.setCart(mutatingCart); // mutate state through setState
    }


    return (
        <div className="container mt-5 mb-5">
            <div className="d-flex justify-content-center row">
                <div className="col-md-8">
                    <div className="p-2">
                        <h4>Actors to Hire:</h4>
                    </div>

                    {Object.values(props.cart.items).map(a => {
                        console.log(a);
                        return (
                            <div className="d-flex flex-row justify-content-between align-items-center p-2 bg-white mt-4 px-3 rounded">
                                <div className="mr-1"><img className="rounded" alt={a.data.first_name} src={a.data.image} width="70" /></div>
                                <div className="d-flex flex-column align-items-center product-details"><span className="font-weight-bold">{`${a.data.first_name} ${a.data.last_name}`}</span>
                                    <div className="d-flex flex-row product-desc">
                                        <div className="size mr-1"><span className="font-weight-bold">&nbsp;{a.data.bestrole}</span></div>
                                    </div>
                                </div>
                                <div className="d-flex flex-row align-items-center qty">
                                    <i className="fa fa-minus text-danger" onClick={() => removeOne(a)}></i>
                                    <h5 className="text-grey mt-1 mr-1 ml-1">{a.quantity}</h5>
                                    <i className="fa fa-plus text-success" onClick={() => increaseOne(a)}></i>
                                </div>
                                <div>
                                    <h5 className="text-grey">{a.data.hiringprice} ea.</h5>
                                </div>
                                <div className="d-flex align-items-center"><i className="fa fa-trash mb-1 text-danger" onClick={() => clearItem(a)}></i></div>
                            </div>
                        )
                    })}

                    <div className="d-flex flex-row justify-content-between align-items-center p-2 bg-white mt-4 px-3 rounded">
                        <div className="d-flex flex-column align-items-center product-details"><span className="font-weight-bold">Total:</span>
                        </div>
                        <div>
                            <h4 className="text-grey">${props.cart.total.toFixed(2)}</h4>
                        </div>
                        <div className="d-flex align-items-center"><button className="btn btn-sm btn-danger" onClick={clearCart}>Remove All</button></div>
                    </div>
                    <div className="d-flex flex-row align-items-center mt-3 p-2 bg-white rounded"><button className="btn btn-warning btn-block btn-lg ml-2 pay-button" type="button">Proceed to Pay</button></div>
                </div>
            </div>
        </div>
    )
}

export default Cart;