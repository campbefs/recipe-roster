import React, { useState } from 'react';
import './App.css';import Nav from './Components/Nav';
import Main from './Components/Main';
import SignUp from './Components/SignUp';
import Login from './Components/Login';
import Home from './Components/Home';
import Profile from './Components/Profile';
import Favorites from './Components/Favorites';
import SavedRecipes from './Components/SavedRecipes';
import { BrowserRouter as Router } from 'react-router-dom'

function App() {
  const pages = [<Main/>, <Home/>, <Profile/>, <Favorites/>, <SavedRecipes/>, <Login/>, <SignUp/>];
  const [page, setPage] = useState(pages[0]);

  return (
    <div className='App'>
      <Nav setPage={setPage} pages={pages}/>
      {page}
      </div>
  );
}

export default App;
