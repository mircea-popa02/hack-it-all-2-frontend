import Chat from './Chat';
import Navbar from './AppNavbar';
import Footer from './Footer';

import { Container } from 'react-bootstrap';

import { useRef } from 'react';

import { SlInput } from '@shoelace-style/shoelace/dist/react';

import Form from 'react-bootstrap/Form';

import { Button } from 'react-bootstrap';
import Swal from 'sweetalert2';

const Action = () => {
    const description = useRef();
    const type = useRef();

    const sendMoney = (e) => {
        e.preventDefault();
        const descriptionValue = description.current.value;
        const typeValue = type.current.value;

        if (typeValue === "Camin") {
            var a = 250;
        }
        else if (typeValue === "Restante") {
            var a = 150;
        }
        else {
            var a = 30;
        }


        const transaction = {
            description: descriptionValue,
            type: typeValue,
            destination: "643202214b6b2e57d0234cb7",
            value: a,
            creator: localStorage.getItem('token'),
            type: "UPB"
        };

        fetch('http://localhost:5000/api/payments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(transaction),
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
                Swal.fire({
                    title: 'Success!',
                    text: 'Transaction sent! You will receive your receipt in your email.',
                    icon: 'success',
                    confirmButtonText: 'OK'
                }).then((result) => {
                    window.Email.send({
                        Host: "smtp.elasticemail.com",
                        Username: "pmircea027@gmail.com",
                        Password: "5899E82B668DCCCCB2F780F83DEBF239F496",
                        To: "mci42@yahoo.com",
                        From: "pmircea027@gmail.com",
                        Subject: "Payment confirmation",
                        Body: "And this is the body"
                    }).then(
                        console.log("Email sent")
                    );
                }
                )
            }
            )
            .catch(err => {
                console.log(err);
            }
            )


    }
    return (
        <>
            <Navbar />
            <Container className='home-container'>
                <div className='form-container'>
                    <h1 className='headline'>Quick action <sl-icon name="rocket-takeoff"></sl-icon></h1>
                    <br />
                    <h2 className='user-name'>Pay student fees</h2>
                    <p>Universitatea Politehnica București</p>
                    <form onSubmit={sendMoney}>
                        <Form.Select aria-label="Default select example" ref={type}>
                            <option>Transaction type</option>
                            <option value="Camin">Cămin (250 RON)</option>
                            <option value="Restante">Restanțe (150 RON)</option>
                            <option value="Cantina">Cantină (30 RON)</option>
                        </Form.Select>
                        <br />
                        <SlInput ref={description} clearable label="Description" help-text="Add your student ID" />
                        <br />

                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </form>
                </div>
            </Container>
            <Footer />
        </>
    );
}

export default Action;
