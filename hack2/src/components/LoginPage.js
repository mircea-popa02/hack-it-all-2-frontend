import { SlInput } from '@shoelace-style/shoelace/dist/react';
import { SlSelect } from '@shoelace-style/shoelace/dist/react';
import { SlMenuItem } from '@shoelace-style/shoelace/dist/react';
import { SlTextarea } from '@shoelace-style/shoelace/dist/react';
import { SlCheckbox } from '@shoelace-style/shoelace/dist/react';
import { SlButton } from '@shoelace-style/shoelace/dist/react';
import { useRef } from 'react';
import { NavLink } from 'react-router-dom';

// sweetalert
import Swal from 'sweetalert2';

import { Container, Nav } from 'react-bootstrap';

const Login = () => {
    const nameInputRef = useRef();
    const emailInputRef = useRef();
    const passwordInputRef = useRef();


    const handleSubmit = (e) => {   
        e.preventDefault();
        const email = emailInputRef.current.value;
        const password = passwordInputRef.current.value;

        const user = {
            email,
            password
        };

        fetch('http://localhost:5000/api/users/login', {
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
                    text: 'You have successfully logged in!',
                })
                window.location.href = '/';
            }
        }

        )

    }
    return (
        <Container className='d-flex align-items-center justify-content-center flex-column' style={{ minHeight: '100vh' }}>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
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
            <p>Don't have an account? <NavLink to='/register'>Register</NavLink></p>

        </Container>
    );
}

export default Login;
