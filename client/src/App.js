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
import Post from './components/Posts';

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
  const pages = {};
  pages["home"] = <Home />;
  pages["profile"] = <Profile />;
  pages["likedpost"] = <LikedPost />;
  pages["login"] = <Login />;
  pages["signup"] = <SignUp />;
  pages["searchrecipes"] = <RecipeSearch/>
  pages["post"] = <Post />;

  const path = window.location.pathname.split("/")[1].toLowerCase();
  console.log(path);

  let component = <Main />;
  if (pages[path]) {
    component = pages[path]
  }


  // const [page, setPage] = useState(pages[url]);
  const [page, setPage] = useState(component);

  return (
    <ApolloProvider client={client}>
      <Router>
        <div className='App'>
          {<Nav setPage={setPage} pages={pages} />}
          {page}

        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
