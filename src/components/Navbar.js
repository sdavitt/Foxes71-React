import React from "react";
import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { ref, set, get, child } from 'firebase/database';
import { Link } from 'react-router-dom';
import { useDatabase, useAuth, useUser, useSigninCheck } from "reactfire";

const Navbar = (props) => {
    const auth = useAuth();
    const db = useDatabase();

    const { userStatus, data: user } = useUser();
    const { signInStatus, data: signInCheckResult } = useSigninCheck();

    const checkdatabase = async () => {
        let result = await signin();
        // check if our user has a cart already
        let uid = result.user.uid
        get(child(ref(db), `carts/${uid}`)).then((snapshot) => {
            if (snapshot.exists()) {
              let c = snapshot.val();
              if (c.items){ props.setCart(c);}
              console.log(props.cart); // set state cart if it exists
            } else {
              set(ref(db, `carts/${uid}`), props.cart); // create user's db cart slot if doesn't exist yet
              console.log('set'); 
            }
          }).catch((error) => {
            console.error(error);
          });
        // if our user has a cart -> set the cart state to that cart
        // if our user has no cart -> create a cart space in the database for them
    }

    const signin = async () => {
        let provider = new GoogleAuthProvider()
        let x = await signInWithPopup(auth, provider);
        return x
    }

    const signout = async () => {
        await signOut(auth).then(() => console.log('signed out user'));
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link className="navbar-brand" to="/">Foxes71</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link className="nav-link" to="/">Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link " to="/shop">Shop</Link>
                    </li>
                </ul>
                <ul className="navbar-nav ml-auto">
                    {
                        signInStatus === 'loading' ?
                            <li className="nav-item">
                                <span className="nav-link auth">Fetching user information...</span>
                            </li>
                        :
                        user ?
                        <li className="nav-item">
                            <span className="nav-link auth" onClick={signout}>Sign-out</span>
                        </li>
                        :
                        <li className="nav-item">
                            <Link className="nav-link auth" to='/' onClick={checkdatabase}>Sign-in</Link>
                        </li>
                    }
                    <li className="nav-item">
                        <Link className="nav-link" to="/cart">
                            <i className="fa fa-shopping-cart"></i>
                            <span> | {props.cart.size} | ${props.cart.total.toFixed(2)}</span>
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
};

export default Navbar;