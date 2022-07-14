import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Navigation from './global/Navigation';
import Home from './global/Home'; 

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MoviesList from './moviesList/MoviesList';
import MoviesInfo from './movieInfo/MovieInfo';
import NoMatch from './global/NoMatch';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <Navigation />
      <Container className="my-4">
          <Switch> 
            <Route path="/:moviesCategory/:path" component={MoviesInfo}/>
            <Route path="/:moviesCategory" component={MoviesList}/>
            <Route path="/" component={Home}/>
          </Switch>
      </Container>
      <ToastContainer/>
    </>
  );
}

export default App;
