import './App.css';
import React, { useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Shop from './views/Shop';
import Home from './views/Home';
import axios from 'axios';

const App = (props) => {
  /* State hook -> declaring the state variable students */
  // const [<state_variable_name>, <setState function name>] = useState(<initial_value>);
  const [students, setStudents] = useState(['Chad', 'Ronald', 'Christian', 'Claudia', 'Joo Yeon', 'Anne', 'Andre', 'Sierra']);

  // declare a state hook for my actors
  const [actors, setActors] = useState();

  /* Processing/background data section */

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
  const useActorsData = async () => {
    let data = await getActors();
    setActors(data);
    //console.log(actors);
  }

  /* 
  return -> actually has the HTML/pseudo-HTML/pseudo-JavaScript/React code called JSX
  Each react component - be it functional or class based - is intended to be a single HTML element
  Inside of the render's return we are mostly writing HTML -> if you want to use JavaScript, you put it in curly brackets
  */
  return (
    <div className="App">
      {/* Navbar custom component being placed in the App component's html */}
      <Navbar useActorsData={useActorsData} />

      {/* Router being set up to swap between Home and Shop components */}
      <Switch>
        <Route exact path='/' render={() => <Home title={'Foxes71 | Home'} students={students} setStudents={setStudents} newprop={'Hi Shoha'} />} />
        <Route path='/shop' render={() => <Shop title={'Foxes71 | Shop'} actors={actors} />} />
      </Switch>
    </div>
  );
};

export default App;


