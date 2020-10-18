import React, {useState, useEffect } from 'react';
import './App.css';
import Header from './Components/Header'
import Login from './Components/Login'
import NavBar from './Components/NavBar'
import MoviesContainer from './Containers/MoviesContainer';
import MovieClubsContainer from './Containers/MovieClubsContainer'
import User from './Components/User'
import { Route, Switch } from 'react-router-dom'

const MOVIE_API = "http://localhost:3000/movies/";
const USER_API = "http://localhost:3000/users/"

const App = () => {

  const [movieApi, setMovieApi] = useState([]);
  const [userApi, setUserApi] = useState([]);


  useEffect(() => {
     fetch(MOVIE_API)
       .then(res => res.json())
        .then(movieData => setMovieApi(movieData))
  }, [])

  useEffect(() => {
    fetch(USER_API)
      .then(res => res.json())
       .then(userData => setUserApi(userData))
 }, [])


  return (
    <div>
      <Header />
      <Login />
      <NavBar />
      <Switch>
        <Route path ='/clubs' render={() => <MovieClubsContainer movies={movieApi} />} />
        <Route path='/movies' render={() => <MoviesContainer movies={movieApi} />} />
        <Route path='/user' render={() => <User users={userApi} />} />
      </Switch>
    </div>
  );
}

export default App;
