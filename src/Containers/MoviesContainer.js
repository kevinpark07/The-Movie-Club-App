import React, { useState, useEffect } from 'react';
import Movie from '../Components/Movie';
import Search from '../Components/Search';
import { Route } from 'react-router-dom'

const MoviesContainer = (props) => {


   const renderMovies = () => {
      return props.movies.map(movie => <Movie key={movie.id} movie={movie} />)
   }

   return (
      <>
         {renderMovies()}
      </>
   )
}

export default MoviesContainer;