
import { Container } from 'react-bootstrap';
import { SlInput } from '@shoelace-style/shoelace/dist/react';
import Swal from 'sweetalert2';
import { useEffect, useReducer, useRef, useState } from 'react';

import { SlSelect } from '@shoelace-style/shoelace/dist/react';

import AuthContext from './AuthContext';
import Footer from './Footer';

import { SlOption } from '@shoelace-style/shoelace/dist/react';
import { useContext } from 'react';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';

import Chat from './Chat';

import AppNavbar from './AppNavbar';
const Transactions = () => {


    const name = useRef();
    const amount = useRef();
    const description = useRef();
    const type = useRef();
    const authContext = useContext(AuthContext);

    const [balance, setBalance] = useState(0);
    useEffect(() => {
        var url = "http://localhost:5000/api/users/ceva/" + localStorage.getItem('nume');
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
                setBalance(data.user.balance);
            }
            )
            .catch(err => {
                console.log(err);
            })
    }, [])



    const sendMoney = (e) => {
        e.preventDefault();
        const nume = name.current.value;
        const value = amount.current.value;
        const desc = description.current.value;
        const tip = type.current.value;

        console.log(tip);

        
        const url = 'http://localhost:5000/api/users/ceva/' + nume;
        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(res => res.json())
            .then(data => {
                console.log(data.user._id);
                const id = data.user._id;
                const transaction = {
                    description: desc,
                    destination: id,
                    value: value,
                    type: tip,
                    creator: authContext.token
                }

                console.log(transaction);

                fetch('http://localhost:5000/api/payments', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(transaction)
                })
                    .then(res => {
                        if (res.ok) {
                            console.log(res);
                            return res.json()
                        } else {
                            Swal.fire({
                                icon: 'error',
                                title: 'Oops...',
                                text: res.message,
                            })
                            throw new Error('Something went wrong');
                        }
                    })
                    .then(data => {
                        console.log(data);
                        Swal.fire({
                            icon: 'success',
                            title: 'Success',
                            text: 'Transaction sent',
                        })
                    })
                    .catch(err => {
                        console.log(err);
                    }
                    )

            })
            .catch(err => {
                console.log(err);
            }
            )

    }


    return (
        <>
            <AppNavbar />
            <Container className='home-container'>
                <h1 className='headline'>Transactions</h1>
                <h2 className='user-name'>{balance.toFixed(2)} RON</h2>
                <span>Send money to any user</span>
                <br />
                <br />
                <div className='form-container small'>
                <form onSubmit={sendMoney}>
                    <h2 className='headline' style={{
                        fontSize: '1.4rem',
                    }}>
                        Please fill in the details below
                    </h2>
                    <br />
                    <div className='line'></div>

                    <SlInput  ref={name} clearable label="Consignee" help-text="Who would you like to send money to?"/>
                    <br />
                    <SlInput  ref={amount} clearable label="Amount" help-text="How much money would you like to send?"/>
                    <br />
                    <SlInput  ref={description} clearable label="Description" help-text="What is the purpose of this transaction?"/>
                    <br />
                    <Form.Select aria-label="Default select example" ref={type}> 
                        <option>Transaction type</option>
                        <option value="Entertainment">Entertainment</option>
                        <option value="Food & Drinks">Food & Drinks</option>
                        <option value="Activities">Activities</option>
                        <option value="Transport">Transport</option>
                        <option value="Accomodation">Accomodation</option>
                        <option value="Other">Other</option>
                    </Form.Select>
                    <br />
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </form>
                </div>
            </Container >
            <Footer />
        </>
    )
}

export default Transactions