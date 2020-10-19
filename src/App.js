import React, {useState, useEffect } from 'react';
import './App.css';
import Header from './Components/Header'
import Home from './Components/Home'
import NavBar from './Components/NavBar'
import MoviesContainer from './Containers/MoviesContainer';
import MovieClubsContainer from './Containers/MovieClubsContainer'
import User from './Components/User'
import Login from './Components/Login'
import { Route, Switch } from 'react-router-dom'

const MOVIE_API = "http://localhost:3000/movies/";
const USER_API = "http://localhost:3000/users/"

const App = () => {

  const [movieApi, setMovieApi] = useState([]);
  const [userApi, setUserApi] = useState([]);
  const [user, setUser] = useState(null);

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

  const login = user => {
    setUser(user)
  }

  const logout = el => {
    setUser(el)
  }

  return (
    <div>
      <Header />
      <NavBar user={user} logout={logout} />
      <Switch>
        <Route path='/login' render={() => <Login users={userApi} login={login} />} />
        <Route path='/home' render={() => <Home users={userApi} user={setUser} />} />
        <Route path ='/clubs' render={() => <MovieClubsContainer user={user} movies={movieApi} />} />
        <Route path='/movies' render={() => <MoviesContainer user={user} movies={movieApi} />} />
        <Route path='/profile' render={() => <User user={user} users={userApi} />} />
      </Switch>
    </div>
  );
}

export default App;
