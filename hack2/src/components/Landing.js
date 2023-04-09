import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

import './Landing.css';

import Footer from './Footer';
import { NavLink } from 'react-router-dom';

const Landing = () => {
    return (
        <>
        <div className='box2'>
            </div>
        <div className="landing-page">
            <Container>
                <Row>
                    <Col md={6}>
                        <p className='vertical'>Student finance</p>

                        <h1>Welcome to Fintech</h1>
                        <p>A modern take on student finance management</p> 
                        <NavLink to={'/register'}>
                        <Button variant="primary" >Register</Button>
                        </NavLink>
                    </Col>

                    <Col md={5}>
                        <img src="https://source.unsplash.com/random" alt="placeholder" />
                    </Col>
                </Row>
            </Container>
            <Footer />
        </div>
        </>
    );
};

export default Landing;
