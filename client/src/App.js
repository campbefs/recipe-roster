import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Nav from './Components/Nav';
import Main from './Components/Main';
import SignUp from './Components/SignUp';
import Login from './Components/Login';

function App() {
  return (
    <Router>
      <Nav/>
      <Route path='/' exact component={Main}/>
      <Route path='/signup' component={SignUp}/>
      <Route path='/login' component={Login}/>
      </Router>
  );
}

export default App;
