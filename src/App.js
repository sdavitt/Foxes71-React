import logo from './logo.svg';
import './App.css';
import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Shop from './views/Shop';
import Home from './views/Home';

export default class App extends Component {
  /* Application state -> the entire application has access stored in the application state */
  constructor(){
    super();

    this.state = {
      students: ['Chad', 'Ronald', 'Christian', 'Claudia', 'Joo Yeon', 'Anne', 'Andre', 'Sierra']
    };
  }

  /* Processing/background data section */

  /* 
  return -> actually has the HTML/pseudo-HTML/pseudo-JavaScript/React code
  Each react component - be it functional or class based - is intended to be a single HTML element
  Inside of the render's return we are mostly writing HTML -> if you want to use JavaScript, you put it in curly brackets
  */
  render() {
    return (
      <div className="App">
        {/* Navbar custom component being placed in the App component's html */}
        <Navbar />

        {/* Router being set up to swap between Home and Shop components */}
        <Switch>
          <Route exact path='/' render={() => <Home title={'Foxes71 | Home'} students={this.state.students} newprop={'Hi Shoha'}/>} />
          <Route path='/shop' render={() => <Shop title={'Foxes71 | Shop'} />} />
        </Switch>
      </div>
    );
  }
}


