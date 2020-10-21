import React from 'react'
import styled from 'styled-components';

const Header = () => {
    return (
        <Head>The Movie Club</Head>
    )
}

export default Header;

const Head = styled.div`
    text-align: center;
    font-family: URW Chancery L, cursive;
    font-size: 40pt;
    font-style: oblique;
    font-weight: 600;
    color: white;
    background: black;
`
