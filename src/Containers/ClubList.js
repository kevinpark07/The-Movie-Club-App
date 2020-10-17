import React, { Component } from "react";
import MovieClub from '../Components/MovieClub'


const ClubList = (props) =>  {

  const renderClubs = () => {
    return props.clubs.map(club => <MovieClub key={club.id} club={club} />)
  }

    return (
      <div>
        {renderClubs()}
      </div>
    );
}


export default ClubList;