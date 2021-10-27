import './App.css';
import React, { useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Shop from './views/Shop';
import Home from './views/Home';
import Cart from './views/Cart';
import Checkout from './views/Checkout';
import axios from 'axios';
import { get, child, ref } from 'firebase/database';
import { useDatabase, useUser } from 'reactfire';
import { useEffect } from 'react/cjs/react.development';

const App = (props) => {
  // Reactfire setup stuff
  const db = useDatabase();
  const { userStatus, data: user } = useUser();
  console.log(db);

  /* State hook -> declaring the state variable students */
  // const [<state_variable_name>, <setState function name>] = useState(<initial_value>);
  const [students, setStudents] = useState(['Elaine', 'Chad', 'Ronald', 'Christian', 'Claudia', 'Joo Yeon', 'Anne', 'Andre', 'Sierra']);

  /* Processing/background data section - for ACTORS */

  // api call step
  const getActors = async () => {
    let response = await axios.get('https://foxes71api.herokuapp.com/api/actors');
    // if you don't control the api or if you preparing this for a production environment, you may want to include some error handling
    // for bad api reponses
    // since we control the api and we're still developing this react app, we're operating under the assumption that everything is going to go smoothly (200 OK) with the API call
    // so we're ignoring the response headers, status_codes, messages, etc.
    // and just getting the data we need
    return response.data
  }

  // using api call data step
  // remember: don't start a normal function's name with use____ -> react will assume it is a custom hook even if it is not
  const gotActorsData = async () => {
    let data = await getActors();
    setActors(data);
  }

  // declare a state hook for my actors
  const [actors, setActors] = useState(() => gotActorsData());

  /* Cart stuff! */

  // return value of check user cart will be initial value of state cart
  const checkUserCart = () => {
    console.log(user);
    if (user) { // if there's a user, do some stuff to make state cart the same as db cart
      let uid = user.uid;
      get(child(ref(db), `carts/${uid}`)).then((snapshot) => {
        if (snapshot.exists()) {
          let c = snapshot.val();
          if (c.items) {
            return c
          }
        }
      }).catch((error) => {
        console.error(error);
      });
    }
    return
  }

  const [cart, setCart] = useState({
    total: 0,
    size: 0,
    items: {}
  });

  useEffect(() => {
    console.log(user);
    if (user) { // if there's a user, do some stuff to make state cart the same as db cart
      let uid = user.uid;
      get(child(ref(db), `carts/${uid}`)).then((snapshot) => {
        if (snapshot.exists()) {
          let c = snapshot.val();
          if (c.items) {
            setCart(c);
          }
        }
      }).catch((error) => {
        console.error(error);
      });
    }
  }, [user])

  /* 
  return -> actually has the HTML/pseudo-HTML/pseudo-JavaScript/React code called JSX
  Each react component - be it functional or class based - is intended to be a single HTML element
  Inside of the render's return we are mostly writing HTML -> if you want to use JavaScript, you put it in curly brackets
  */
  return (
    <div className="App">
      {/* Navbar custom component being placed in the App component's html */}
      <Navbar cart={cart} setCart={setCart} />

      {/* Router being set up to swap between Home and Shop components */}
      <Switch>
        <Route exact path='/' render={() => <Home title={'Foxes71 | Home'} students={students} setStudents={setStudents} newprop={'Hi Shoha'} />} />
        <Route path='/shop' render={() => <Shop title={'Foxes71 | Shop'} actors={actors} cart={cart} setCart={setCart} />} />
        <Route path='/cart' render={() => <Cart cart={cart} setCart={setCart} />} />
        <Route path='/checkout' render={() => <Checkout cart={cart} setCart={setCart} />} />
      </Switch>
    </div>
  );
};

export default App;


