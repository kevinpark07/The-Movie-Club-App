import React, {useState} from 'react';
import styled from 'styled-components'

const MessageBoard = (props) => {

    const [message, setMessage] = useState("") 
    
    // const [clubApi, setClubApi] = useState([])
    
    // useEffect (() => {
    //     fetch(CLUBS_URL).then(resp => resp.json()).then(clubs => setClubApi(clubs))
    // })

    const messageHandle = event => {
        console.log(event.target.value)
        setMessage(event.target.value)
    }
    
    const renderMessages = () => {
        let clubMessages = props.messages.filter(message => message.club.id === props.club.id)
        return clubMessages.map((message, index)=> <p key={index}><b>{message.user.username}</b>: {message.content}</p>)
    }


    const submitHandle = event => {
        event.preventDefault();
        // console.log(props.club, props.user, event.target.value)
        props.submitMessage(props.club, props.user, event.target.value)
        setMessage("")  
    }

    return (
        <div>
            <Header >Chat Room</Header>
            <MessageContainer>
                {renderMessages()}
            </MessageContainer>
            <p><MessageArea onChange={messageHandle} value={message} /></p>
            <Button onClick={submitHandle} value={message}>Submit</Button>
        </div>
    )
}

export default MessageBoard;


const MessageContainer = styled.div`
    border-style: solid;
    border-color: black;
    border-radius: 5px;
    overflow: scroll;
    background-color: #eee;
    height: 200px;
    width: auto;
`

const Header = styled.h1`
    text-align: center;
`
const MessageArea = styled.textarea`
    width: 100%;
`

const Button = styled.button`
    height: 20px;
    width: 100px;
    background: #0066A2;
    text-shadow:none;
    margin-top: 2%;
    border-radius: 10px;
    font: bold 15px monospace;
    display: block;
    margin-left: auto;
    margin-right: auto;
    color: white;
`