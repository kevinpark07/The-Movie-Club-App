import React, { Component } from "react";
import Club from '../Components/Club'

const ClubList = (props) => {

  return (
    <div>
      <h1>Club List</h1>
      {props.clubs.map(club => <Club key={club.id} club={club} />)}
    </div>
  );
}


export default ClubList;

