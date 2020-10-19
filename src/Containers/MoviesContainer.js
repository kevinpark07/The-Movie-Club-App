import React, { useState, useEffect } from 'react';
import Movie from '../Components/Movie';
import Search from '../Components/Search';
import { Route, Redirect } from 'react-router-dom'

const MoviesContainer = (props) => {


   const renderMovies = () => {
      return props.movies.map(movie => <Movie key={movie.id} movie={movie} />)
   }

   return (
      <div>
         {props.user ? 
               renderMovies()
         : 
            <Redirect to='/home' /> 
         }
        
      </div>
   )
}

export default MoviesContainer;