import { SlInput } from '@shoelace-style/shoelace/dist/react';
import { SlSelect } from '@shoelace-style/shoelace/dist/react';
import { SlMenuItem } from '@shoelace-style/shoelace/dist/react';
import { SlTextarea } from '@shoelace-style/shoelace/dist/react';
import { SlCheckbox } from '@shoelace-style/shoelace/dist/react';
import { SlButton } from '@shoelace-style/shoelace/dist/react';
import { useRef } from 'react';

// sweetalert
import Swal from 'sweetalert2';

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
        <Container className='d-flex align-items-center justify-content-center flex-column' style={{ minHeight: '100vh' }}>
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <SlInput name="name" label="Name" required pill ref={nameInputRef}/>
                <SlInput email="email" label="Email" required pill ref={emailInputRef}/>
                <SlInput password="password" label="Pasword" required pill ref={passwordInputRef}/>
                <br />
                {/* <SlSelect label="Favorite Animal" clearable required>
                    <SlMenuItem value="birds">Birds</SlMenuItem>
                    <SlMenuItem value="cats">Cats</SlMenuItem>
                    <SlMenuItem value="dogs">Dogs</SlMenuItem>
                    <SlMenuItem value="other">Other</SlMenuItem>
                </SlSelect>
                <br />
                <SlTextarea name="comment" label="Comment" required></SlTextarea>
                <br />
                <SlCheckbox required>Check me before submitting</SlCheckbox>
                <br />
                <br /> */}
                <SlButton type="submit" variant="primary">
                    Submit
                </SlButton>
            </form>
            <p>Already have an account? <NavLink to='/'>Login</NavLink></p>

        </Container>
    );
}

export default Register;
