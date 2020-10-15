import React from 'react';
import './App.css';
import Header from './Components/Header'
import Login from './Components/Login'
import NavBar from './Components/NavBar'
import MoviesContainer from './Containers/MoviesContainer';
import MovieClubsContainer from './Containers/MovieClubsContainer'
import User from './Components/User'
import { Route, Switch } from 'react-router-dom'

function App() {
  return (
    <div>
      <Header />
      <Login />
      <NavBar />
      <Switch>
        <Route path='/movies' component={MoviesContainer} />
        <Route path ='/movieclubs' component={MovieClubsContainer} />
        <Route path='/user' component={User} />
      </Switch>
    </div>
  );
}

export default App;
