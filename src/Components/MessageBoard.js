import React, {useState} from 'react'



const MessageBoard = (props) => {

    const [message, setMessage] = useState("") 
    
    // const [clubApi, setClubApi] = useState([])
    
    // useEffect (() => {
    //     fetch(CLUBS_URL).then(resp => resp.json()).then(clubs => setClubApi(clubs))
    // })

    const messageHandle = event => {
        setMessage(event.target.value)
    }
    
    const renderMessages = () => {
       
        return props.club.messages.map(message => <li>{message.user.username}: {message.content}</li>)
    }


    const submitHandle = event => {
        event.preventDefault();
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