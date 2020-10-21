import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './Components/Header'
import Home from './Components/Home'
import NavBar from './Components/NavBar'
import MoviesContainer from './Containers/MoviesContainer';
import MovieClubsContainer from './Containers/MovieClubsContainer'
import User from './Components/User'
import Login from './Components/Login'
import SignUp from './Components/Signup'
import { Route, Switch, Redirect } from 'react-router-dom'
import styled from 'styled-components'


const MOVIE_URL = "http://localhost:3000/movies/";
const USER_URL = "http://localhost:3000/users/"
const MEMBER_URL = "http://localhost:3000/members/"

const App = () => {

  const [movieApi, setMovieApi] = useState([]);
  const [userApi, setUserApi] = useState([]);
  const [user, setUser] = useState(null);
  const [memberApi, setMemberApi] = useState([])
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    fetch(MOVIE_URL)
      .then(res => res.json())
      .then(movieData => setMovieApi(movieData))
  }, [])

  useEffect(() => {
    fetch(USER_URL)
      .then(res => res.json())
      .then(userData => setUserApi(userData))
  }, [])

  useEffect(() => {
    fetch(MEMBER_URL)
    .then(res => res.json())
    .then(memberData => setMemberApi(memberData))
  }, [])

  const login = user => {
    setUser(user)
  }

  const logout = el => {
    setUser(el)
  }

  const newUser = (newUser) => {
    fetch(USER_URL, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        accepts: 'application/json'
      },
      body: JSON.stringify(newUser)
    })
      .then(res => res.json())
      .then(userInfo => {
        setUserApi([...userApi, userInfo])
        login(newUser)
        setRedirect(!redirect)
      })
  }

    const joinClub = (club, user) => {
      fetch(MEMBER_URL, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          accepts: 'application/json'
        },
        body: JSON.stringify({
          club: club, 
          user: user})
      })
      .then(res => res.json())
      .then(member => {
        setMemberApi([...memberApi, member])
      })
    }

    const leaveClub = (memberId) => {
      fetch(MEMBER_URL + memberId, {
        method: 'DELETE'
      }).then(resp => resp.json()).then(mem => {
        let newArray = memberApi.filter(member => member.id !== memberId)
        setMemberApi(newArray)
      })
    } 

  return (
    <div>
      {redirect ? <Redirect to={'/profile'} /> : null}
      <Header />
      <NavBar user={user} logout={logout} />
      <Switch>
        <Route path='/signup' render={() => <SignUp newUser={newUser} />} />
        <Route path='/login' render={() => <Login users={userApi} login={login} />} />
        <Route path='/home' render={() => <Home users={userApi} user={setUser} />} />
        <Route path='/clubs' render={() => <MovieClubsContainer leaveClub={leaveClub} members={memberApi} joinClub={joinClub} user={user} movies={movieApi} />} />
        <Route path='/movies' render={() => <MoviesContainer user={user} movies={movieApi} />} />
        <Route path='/profile' render={() => <User members={memberApi} user={user} users={userApi} />} />
      </Switch>
      
    </div>
  );
}

export default App;





