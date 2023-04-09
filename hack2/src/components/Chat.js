import { SlInput } from '@shoelace-style/shoelace/dist/react';

import { useRef, useState } from 'react';
import { Button } from 'react-bootstrap';

import { Container } from 'react-bootstrap';

//import css
import './Chat.css';
import { useEffect } from 'react';
import userEvent from '@testing-library/user-event';

import { SlSpinner } from '@shoelace-style/shoelace/dist/react';
import { SlSkeleton } from '@shoelace-style/shoelace/dist/react';

const css = `
  .skeleton-paragraphs sl-skeleton {
    margin-bottom: 1rem;
  }

  .skeleton-paragraphs sl-skeleton:nth-child(2) {
    width: 100%;
  }

  .skeleton-paragraphs sl-skeleton:nth-child(4) {
    width: 100%;
  }

  .skeleton-paragraphs sl-skeleton:last-child {
    width: 50%;
  }
`;

const ChatGPT = () => {
    const [messages, setMessages] = useState([]);

    const [inputs, setInput] = useState("");

    const [incomes, setIncome] = useState([]);
    const [expenses, setExpenses] = useState([]);

    const [accountLimit, setAccountLimit] = useState(0);

    const [balance, setBalance] = useState(0);

    const [isLoading, setIsLoading] = useState(false);

    const [isLoaded, setIsLoaded] = useState(false);

    const input = useRef();

    useEffect(() => {
        fetch('http://localhost:5000/api/users/ceva/' + localStorage.getItem('nume'))

            .then(res => res.json())
            .then(data => {
                console.log(data);
                setAccountLimit(data.user.accountlimit);
                setBalance(data.user.balance);
                var url = 'http://localhost:5000/api/payments/ceva/';

                url += localStorage.getItem('token');


                fetch(url, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                })
                    .then(res => {
                        if (res.ok) {
                            return res.json();
                        } else {
                            throw new Error('Something went wrong');
                        }
                    }
                    )
                    .then(data => {
                        console.log(data);
                        setIncome(data.incomes);
                        setExpenses(data.expenses);
                    }
                    )
                    .catch(err => {
                        console.log(err);
                    })
            })
    }, []);

    const getAdvice = () => {

        let advice = 'Here are my spendings in RON: ';
        for (let i = 0; i < expenses.length; i++) {
            advice += expenses[i].type + ' ' + expenses[i].value + ', ';
        }

        advice += 'Here are my incomes in RON: ';
        for (let i = 0; i < incomes.length; i++) {
            advice += incomes[i].type + ' ' + incomes[i].value + ', ';
        }

        advice += 'My current balance is: ' + balance + " ";

        advice += 'My budget is: ' + accountLimit + " ";

        advice += 'What can I do to improve my finances based on my current situation?';

        // setMessages([...messages, advice]);

        const data = {
            data: advice,
        }
        console.log(data);

        setIsLoading(false);

        setIsLoaded(true);

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
                setIsLoading(true);
                setIsLoaded(true);
                setMessages(prev =>
                    [...prev, data.content]);
            }
            )
    }

    const getJoke = () => {
        const data = {
            data: 'Tell me a joke',
        }
        setIsLoading(false);

        setIsLoaded(true);
        // setMessages([...messages, input.current.value]);
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
                setIsLoading(true);
                setIsLoaded(true);
                setMessages(prev =>
                    [...prev, data.content]);
            })
    }


    const sendMessage = (e) => {
        e.preventDefault();
        setMessages([...messages, input.current.value]);
        setInput("");
        console.log(input.current.value);
        const data = {
            data: input.current.value,
        }
        console.log(data);
        setIsLoading(false);

        setIsLoaded(true);
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
                setIsLoading(true);
                setIsLoaded(true);

                setMessages(prev =>
                    [...prev, data.content]);
            })
    }

    return (
        <Container className="chat">
            <h1 className="headline">Chat with GPT-3.5</h1>
            <div className='buttons'>
                <div className='option' onClick={getAdvice}>
                    financial tips
                </div>
                <div className='option' onClick={getJoke}>
                    random joke
                </div>
            </div>
            <div className="messages">
                {isLoaded ?
                    <>
                        {isLoading ?
                            <>
                                {messages.map((message, index) => (
                                    <div key={index} className="message">
                                        <p>{message}</p>
                                    </div>
                                ))}
                            </>

                            :
                            <>
                                {messages.map((message, index) => (
                                    <div key={index} className="message">
                                        <p>{message}</p>
                                    </div>
                                ))}
                                <div className="skeleton-paragraphs">
                                    <SlSkeleton effect="pulse"/>
                                    <SlSkeleton effect="pulse"/>
                                    <SlSkeleton effect="pulse"/>
                                    <SlSkeleton effect="pulse"/>
                                    <SlSkeleton effect="pulse"/>
                                </div>

                                <style>{css}</style>
                            </>
                        }
                    </>
                    : null
                }

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
            {openchat ? <><ChatGPT /><Button className="open-chat" onClick={changeVisibility}>Close chat</Button></> :
            <Button className="open-chat btn-secondary" onClick={changeVisibility} id='drawer'>
                Open chat
            </Button>}
        </>
    )
}

export default Chat;