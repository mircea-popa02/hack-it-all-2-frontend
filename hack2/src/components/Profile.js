// import css
import './Profile.css';
import { useContext, useRef } from 'react';
import AuthContext from './AuthContext';
import { Button } from 'react-bootstrap';
import Chat from './Chat';

import Footer from './Footer';

import Graph from './Graph';

import { SlInput } from '@shoelace-style/shoelace/dist/react';

import { Container } from 'react-bootstrap';

import { useEffect } from 'react';
import { useState } from 'react';

import AppNavbar from './AppNavbar';
const Profile = () => {

    const authContext = useContext(AuthContext);
    const limit = useRef();
    const [limita, setLimita] = useState('');
    const [accountLimit, setAccountLimit] = useState(0);

    useEffect(() => {
        fetch('http://localhost:5000/api/users/ceva/' + localStorage.getItem('nume'))

            .then(res => res.json())
            .then(data => {
                console.log(data);
                setAccountLimit(data.user.accountlimit);
            })
    }, [])


    const setLimit = (e) => {
        e.preventDefault();

        const limita = limit.current.value;
        console.log(limita);

        setLimita('');

        const url = 'http://localhost:5000/api/users/' + localStorage.getItem('token');
        fetch(url, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                accountlimit: limita
            })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setAccountLimit(data.user.accountlimit);
            })
    }



    return (
        <>
            <AppNavbar />
            <Container className='home-container'>
                <h1 className='headline'>Profile</h1>
                <br></br>
                <h3 className='user-name'>Hello, {localStorage.getItem('nume')}</h3>
                


                <div className='form-container'>
                    <span>Your set montly limit is {accountLimit} RON</span>
                    <form onSubmit={setLimit}>
                        <SlInput placeholder="Set limit" ref={limit} value={limita} clearable />
                        <br />
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </form>
                </div>
            </Container>


            <Container className='home-container'>
                <h1>Statistics</h1>
                <br></br>
                <Graph />

                {authContext.isLoggedIn && (
                    <Button variant="danger" onClick={authContext.onLogout}>
                        Logout
                    </Button>
                )}
            </Container>
            <Footer />


        </>
    );
}

export default Profile;
