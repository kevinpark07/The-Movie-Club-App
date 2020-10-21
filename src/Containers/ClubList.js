import React, { Component } from "react";
import Club from '../Components/Club';
import styled from 'styled-components'

const BACKGROUND_URL = "https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=925&q=80";

const ClubList = (props) => {

  return (
    <Big>
      <Image alt="" src={BACKGROUND_URL} />
      <Container>
        {props.clubs.map(club => <Club key={club.id} club={club} />)}
        </Container>
    </Big>
  );
}


export default ClubList;


// const CardContainer = styled.div`
//   transform: translate(-50%, -50%);
// `

const Image = styled.img`
  width: 100%;
  height: 100%;
  z-index: -1;
  position: absolute;
  left: 0px;
`

const Container = styled.div`
  z-index: 1;
  postion: absolute;
  align-self: center;
  margin-top: 5%;
` 
const Big = styled.div`
    position: relative;
    text-align: center;
    overflow: scroll;
`
