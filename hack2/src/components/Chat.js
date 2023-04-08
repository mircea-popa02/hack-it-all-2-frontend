import { SlInput } from '@shoelace-style/shoelace/dist/react';

import { useRef, useState } from 'react';
import { Button } from 'react-bootstrap';

import { Container } from 'react-bootstrap';

//import css
import './Chat.css';

const ChatGPT = () => {
    const [messages, setMessages] = useState([]);

    const [inputs, setInput] = useState("");

    const input = useRef();

    const sendMessage = (e) => {
        e.preventDefault();
        setMessages([...messages, input.current.value]);
        setInput("");
        console.log(input.current.value);
        const data = {
            data: input.current.value,
        }
        console.log(data);
        fetch("http://localhost:5000/api/chat/", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);

                setMessages(prev =>
                    [...prev, data.content]);
            })
    }

    return (
        <Container className="chat">
            <h1 className="headline">Chat with GPT-3.5</h1>
            <div className="messages">
                {messages.map((message, index) => (
                    <div key={index} className="message">
                        <p>{message}</p>
                    </div>
                ))}
            </div>
            <form onSubmit={sendMessage}>
                <SlInput ref={input} value={inputs} onInput={(e) => setInput(e.target.value)} placeholder="Type your message here" />
                <br />
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </form>
        </Container>
    )
}





const Chat = () => {
    const [openchat, setOpenChat] = useState(false);
    const changeVisibility = () => {
        setOpenChat(!openchat);
    }

    return (
        <>
        {openchat ? <><ChatGPT /><Button className="open-chat" onClick={changeVisibility}>Close Chat</Button></> : <Button className="open-chat" onClick={changeVisibility} id='drawer'>
                Open chat
            </Button>}
        </>
    )
}

export default Chat;