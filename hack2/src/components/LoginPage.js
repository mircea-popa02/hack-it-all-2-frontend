import { SlInput } from '@shoelace-style/shoelace/dist/react';
import { SlSelect } from '@shoelace-style/shoelace/dist/react';
import { SlMenuItem } from '@shoelace-style/shoelace/dist/react';
import { SlTextarea } from '@shoelace-style/shoelace/dist/react';
import { SlCheckbox } from '@shoelace-style/shoelace/dist/react';
import { SlButton } from '@shoelace-style/shoelace/dist/react';
import { useRef, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import AuthContext from './AuthContext';



import { SlDivider } from '@shoelace-style/shoelace/dist/react';

// import css
import './LoginPage.css';
import Footer from './Footer'

//add bootstrap button
import { Button } from 'react-bootstrap';

// sweetalert
import Swal from 'sweetalert2';

import { Container, Nav } from 'react-bootstrap';

const Login = () => {
    const nameInputRef = useRef();
    const emailInputRef = useRef();
    const passwordInputRef = useRef();

    const authContext = useContext(AuthContext);

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
                    text: 'You have successfully logged in!',
                }).then(() => {
                    console.log(data.user.id, data.user.name)
                    authContext.onLogin(data.user.id, data.user.name);

                })
            })
            .catch(err => {
                console.log(err);
            })

    }

    return (
        <>
        
            <Container className='d-flex align-items-center justify-content-center flex-column' style={{ minHeight: '100vh' }}>
                <div className='form-container'>
                    <h1>Login</h1>
                    <form onSubmit={handleSubmit}>
                        <SlInput email="email" label="Email" required ref={emailInputRef} clearable/>
                        <SlInput  type="password" password="password" label="Pasword" required ref={passwordInputRef} clearable password-toggle/>
                        <br />
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </form>
                    <SlDivider></SlDivider>
                    <p className='p-faded'>Don't have an account? <NavLink to='/register'>Register</NavLink></p>
                </div>
            </Container>
            <Footer />
        </>
    );
}

export default Login;
