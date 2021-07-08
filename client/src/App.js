import React, { useState } from 'react';
import './index.css';
import Nav from './components/Nav';
import Main from './components/Main';
import SignUp from './components/SignUp';
import Login from './components/Login';
import Home from './components/Home';
import Profile from './components/Profile';
import LikedPost from './components/LikedPosts';
import RecipeSearch from './components/RecipeSearch'
import Post from './components/Post'

function App() {
  const pages = [<Main/>, <Home/>, <Profile/>, <LikedPost/>, <Login/>, <SignUp/>];
  const [page, setPage] = useState(pages[0]);

  return (
    <div className='App'>
      <RecipeSearch/>
      {/* <Nav setPage={setPage} pages={pages}/>
      {page} */}
      {/* <RecipeSearch/> */}

      </div>
  );
}

export default App;
