
import { Container } from 'react-bootstrap';
import { SlInput } from '@shoelace-style/shoelace/dist/react';
import Swal from 'sweetalert2';
import { useReducer, useRef, useState } from 'react';

import { SlSelect } from '@shoelace-style/shoelace/dist/react';

import AuthContext from './AuthContext';

import { SlOption } from '@shoelace-style/shoelace/dist/react';
import { useContext } from 'react';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';

import AppNavbar from './AppNavbar';
const Transactions = () => {


    const name = useRef();
    const amount = useRef();
    const description = useRef();
    const type = useRef();
    const authContext = useContext(AuthContext);


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

            <div className='box1'>
            </div>

            <div className='box2'>
            </div>

            <Container className='home-container'>
                <h1 >Transactions</h1>
                <br></br>
                <form onSubmit={sendMoney}>
                    <SlInput placeholder="Send to" ref={name} clearable />
                    <br />
                    <SlInput placeholder="Amount" ref={amount} clearable />
                    <br />
                    <SlInput placeholder="Description" ref={description} clearable />
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
            </Container >
        </>
    )
}

export default Transactions