import React, {useState, useEffect } from 'react';
import './App.css';
import Header from './Components/Header'
import Login from './Components/Login'
import NavBar from './Components/NavBar'
import MoviesContainer from './Containers/MoviesContainer';
import MovieClubsContainer from './Containers/MovieClubsContainer'
import User from './Components/User'
import { Route, Switch } from 'react-router-dom'

const App = () => {

  


  return (
    <div>
      <Header />
      <Login />
      <NavBar />
      <Switch>
        <Route path ='/clubs' render={() => <MovieClubsContainer />} />
        <Route path='/movies' render={() => <MoviesContainer />} />
        <Route path='/user' component={User} />
      </Switch>
    </div>
  );
}

export default App;
