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
import Post from './components/Post';

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
<<<<<<< HEAD
  const pages = {};
  pages["home"] = <Home />;
  pages["profile"] = <Profile />;
  pages["likedpost"] = <LikedPost />;
  pages["login"] = <Login />;
  pages["signup"] = <SignUp />;

  const path = window.location.pathname.split("/")[1].toLowerCase();
  console.log(path);

  let component = <Main />;
  if (pages[path]) {
    component = pages[path]
  }


  // const [page, setPage] = useState(pages[url]);
  const [page, setPage] = useState(component);
=======
  const pages = [<Main/>, <Home/>, <Profile/>, <LikedPost/>, <Login/>, <SignUp/>, <RecipeSearch/>, <Posts/>];
  const [page, setPage] = useState(pages[0]);
>>>>>>> b59749e75d82bf2163f3c05759019079cb533fa2

  return (
    <ApolloProvider client={client}>
      <Router>
<<<<<<< HEAD
        <div className='App'>
          {<Nav setPage={setPage} pages={pages} />}
          {page}
          {/* <RecipeSearch/> */}
=======
    <div className='App'>
      {<Nav setPage={setPage} pages={pages}/>}
      {/* <Post/> */}
      {page} 
      {/* <RecipeSearch/> */}
>>>>>>> b59749e75d82bf2163f3c05759019079cb533fa2

        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
