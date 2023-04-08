import { SlInput } from '@shoelace-style/shoelace/dist/react';
import { SlSelect } from '@shoelace-style/shoelace/dist/react';
import { SlMenuItem } from '@shoelace-style/shoelace/dist/react';
import { SlTextarea } from '@shoelace-style/shoelace/dist/react';
import { SlCheckbox } from '@shoelace-style/shoelace/dist/react';
import { SlButton } from '@shoelace-style/shoelace/dist/react';
import { useRef } from 'react';
import { SlDivider } from '@shoelace-style/shoelace/dist/react';
// sweetalert
import Swal from 'sweetalert2';
import { Button } from 'react-bootstrap';

import { Container } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

const Register = () => {
    const nameInputRef = useRef();
    const emailInputRef = useRef();
    const passwordInputRef = useRef();


    const handleSubmit = (e) => {
        e.preventDefault();
        const name = nameInputRef.current.value;
        const email = emailInputRef.current.value;
        const password = passwordInputRef.current.value;

        const user = {
            name,
            email,
            password
        };

        fetch('http://localhost:5000/api/users/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            // catch errors

            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.message) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: data.message,
                    })
                } else {
                    Swal.fire({
                        icon: 'success',
                        title: 'Success',
                        text: 'You have successfully registered!',
                    })
                    window.location.href = '/home';
                }
            }

            )

    }
    return (
        <>
            <div className='box1'>
            </div>

            <div className='box2'>
            </div>
            <Container className='d-flex align-items-center justify-content-center flex-column' style={{ minHeight: '100vh' }}>
                <div className='form-container'>
                    <h1>Register</h1>
                    <form onSubmit={handleSubmit}>
                        <SlInput name="name" label="Name" required ref={nameInputRef} clearable/>
                        <SlInput email="email" label="Email" required ref={emailInputRef} clearable/>
                        <SlInput password="password" label="Pasword" required ref={passwordInputRef} clearable/>
                        <br />
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </form>
                    <SlDivider></SlDivider>
                    <p className='p-faded'>Already have an account? <NavLink to='/'>Login</NavLink></p>

                </div>
            </Container>
        </>
    );
}

export default Register;
