import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import Nav from './components/Nav';
import Main from './components/Main';
import SignUp from './components/SignUp';
import Login from './components/Login';
import Home from './components/Home';
import Profile from './components/Profile';
import LikedPost from './components/Posts';
import RecipeSearch from './components/RecipeSearch'
import Posts from './components/Posts';

import { ApolloProvider } from '@apollo/client';
import ApolloClient from 'apollo-boost';

const client = new ApolloClient({
  
  request: operation => {
    const token = localStorage.getItem('id_token');

    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : ''
      }
    })
  },
  uri: 'http://localhost:3001/graphql'
  // uri: '/graphql'
});


function App() {
  const pages = [<Main/>, <Home/>, <Profile/>, <LikedPost/>, <Login/>, <SignUp/>, <RecipeSearch/>, <Posts/>];
  const [page, setPage] = useState(pages[0]);

  return (
    <ApolloProvider client={client}>
      <Router>
    <div className='App'>
      {<Nav setPage={setPage} pages={pages}/>}
      {/* <Post/> */}
      {page} 
      {/* <RecipeSearch/> */}

    </div>
      </Router>
 </ApolloProvider>
  );
}

export default App;
