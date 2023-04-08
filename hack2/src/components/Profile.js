// import css
import './Profile.css';
import { useContext } from 'react';
import AuthContext from './AuthContext';
import { Button } from 'react-bootstrap';
import Chat from './Chat';

import Graph from './Graph';

import { Container } from 'react-bootstrap';

import { useEffect } from 'react';
import { useState } from 'react';

import AppNavbar from './AppNavbar';
const Profile = () => {

    const authContext = useContext(AuthContext);
    
    return (
        <>
            <AppNavbar />
            <div className='box1'>
            </div>

            <div className='box2'>
            </div>
            <Container className='home-container'>
                <h1>Profile</h1>
                <br></br>
                <h3>Name: {localStorage.getItem('nume')}</h3>

                {authContext.isLoggedIn && (
                    <Button variant="danger" onClick={authContext.onLogout}>
                        Logout
                    </Button>
                )}
            </Container>

            <Container className='home-container'>
                <h1>Statistics</h1>
                <br></br>
                <Graph />
            </Container>

        </>
    );
}

export default Profile;
