import React, { useState, useEffect } from 'react';
import Movie from '../Components/Movie';
import Search from '../Components/Search';
import { Route } from 'react-router-dom'

const MoviesContainer = (props) => {

    const [movieApi, setMovieApi] = useState([]);


   useEffect(() => {
      fetch("http://localhost:3000/movies")
        .then(res => res.json())
         .then(movieData => setMovieApi(movieData))
   }, [])

   const renderMovies = () => {
      return movieApi.map(movie => <Movie key={movie.id} movie={movie} />)
   }

   return (
      <>
         {renderMovies()}
      </>
   )
}

export default MoviesContainer;