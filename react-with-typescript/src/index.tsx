import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router,Routes } from 'react-router-dom';
import './index.css';
import App from './pages/App';
import reportWebVitals from './reportWebVitals';
import { Switch } from '@material-ui/core';
import CountryDetails from './pages/CountryDetails';
import NavBar from './components/Navbar';

const routing = (
  
  <Router>
    <NavBar/>
    <Routes>
      <Route path="/" element={<App/>}/>
      <Route path="/:name" element={<CountryDetails/>}/>
    </Routes>
  </Router>
)
ReactDOM.render(
   routing,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
