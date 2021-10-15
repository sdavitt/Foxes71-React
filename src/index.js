import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from 'react-router-dom';
import { FirebaseAppProvider } from 'reactfire';
import ProviderLayer from './ProviderLayer';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB3bv7isNa1zFw9vYJN2O1BbHV-Fhd04cU",
  authDomain: "foxes71react.firebaseapp.com",
  databaseURL: "https://foxes71react-default-rtdb.firebaseio.com",
  projectId: "foxes71react",
  storageBucket: "foxes71react.appspot.com",
  messagingSenderId: "179926038158",
  appId: "1:179926038158:web:2fc5a87367f00ea58d7bdf",
  measurementId: "G-0ZY6FWE1HQ"
};

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <FirebaseAppProvider firebaseConfig={firebaseConfig}>
        <ProviderLayer />
      </FirebaseAppProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
