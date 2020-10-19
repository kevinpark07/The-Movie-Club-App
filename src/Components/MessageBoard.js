import React, {useState} from 'react'

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
        console.log(clubMessages)
        return clubMessages.map(message => <li>{message.user.username}: {message.content}</li>)
    }


    const submitHandle = event => {
        event.preventDefault();
        // console.log(props.club, props.user, event.target.value)
        props.submitMessage(props.club, props.user, event.target.value)
        setMessage("")  
    }

    return (
        <div>
            <h1>Message Board!</h1>
            <ul list-style-type="none">
                {renderMessages()}
            </ul>
            <p><textarea onChange={messageHandle} value={message} /></p>
            <button onClick={submitHandle} value={message}>Submit</button>
        </div>
    )
}

export default MessageBoard;