import './App.css';
import React, { useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Shop from './views/Shop';
import Home from './views/Home';

const App = (props) => {
  /* State hook -> declaring the state variable students */
  // const [<state_variable_name>, <setState function name>] = useState(<initial_value>);
  const [students, setStudents] = useState(['Chad', 'Ronald', 'Christian', 'Claudia', 'Joo Yeon', 'Anne', 'Andre', 'Sierra']);


  /* Processing/background data section */

  /* 
  return -> actually has the HTML/pseudo-HTML/pseudo-JavaScript/React code called JSX
  Each react component - be it functional or class based - is intended to be a single HTML element
  Inside of the render's return we are mostly writing HTML -> if you want to use JavaScript, you put it in curly brackets
  */

  return (
    <div className="App">
      {/* Navbar custom component being placed in the App component's html */}
      <Navbar />

      {/* Router being set up to swap between Home and Shop components */}
      <Switch>
        <Route exact path='/' render={() => <Home title={'Foxes71 | Home'} students={students} setStudents={setStudents} newprop={'Hi Shoha'} />} />
        <Route path='/shop' render={() => <Shop title={'Foxes71 | Shop'} />} />
      </Switch>
    </div>
  );
};

export default App;


