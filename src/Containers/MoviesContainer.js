import React, { useState, useEffect } from 'react';
import Movie from '../Components/Movie';
import { Redirect } from 'react-router-dom'
import styled from 'styled-components';

const BACKGROUND_URL = "https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=925&q=80";

const MoviesContainer = (props) => {


   const renderMovies = () => {
      return props.movies.map(movie => <Movie key={movie.id} movie={movie} />)
   }

   return (
      <Container>
         <Image alt="" src={BACKGROUND_URL} />
         <InnerContainer>
            {props.user ? 
                  renderMovies()
            : 
               <Redirect to='/home' /> 
            }
         </InnerContainer>
      </Container>
   )
}

export default MoviesContainer;

const Image = styled.img`
  width: 100%;
  height: 100%;
  z-index: -1;
  position: absolute;
  left: 0px;
`

const Container = styled.div`
   position: relative;
   text-align: center;
   overflow: scroll;
`

const InnerContainer = styled.div`
   z-index: 1;
   postion: absolute;
   align-self: center;
   margin-top: 5%;
`