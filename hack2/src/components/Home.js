import { useContext } from 'react';
import AuthContext from './AuthContext';
import { useEffect } from 'react';
import { useState } from 'react';
// import bootstrap button and 
import { Button, Container } from 'react-bootstrap';
import { SlDrawer } from '@shoelace-style/shoelace/dist/react';
import { SlButton } from '@shoelace-style/shoelace/dist/react';
import AppNavbar from './AppNavbar';
//import css
import './Home.css';
import { SlDivider } from '@shoelace-style/shoelace/dist/react';
import { SlFormatDate } from '@shoelace-style/shoelace/dist/react';

import Chat from './Chat';

import Footer from './Footer';

import Graph from './Graph';

import { SlDetails } from '@shoelace-style/shoelace/dist/react';

const Home = () => {

    const authContext = useContext(AuthContext);
    const [incomes, setIncome] = useState([]);
    const [expenses, setExpenses] = useState([]);

    const [balance, setBalance] = useState(0);


    useEffect(() => {
        console.log(authContext);
        var url = 'http://localhost:5000/api/payments/ceva/';

        url += localStorage.getItem('token');


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
                setIncome(data.incomes);
                setExpenses(data.expenses);
            }
            )
            .catch(err => {
                console.log(err);
            })


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


    // sort expenses by date
    expenses.sort((a, b) => {
        return new Date(b.date) - new Date(a.date);
    });

    // sort incomes by date
    incomes.sort((a, b) => {
        return new Date(b.date) - new Date(a.date);
    });

    // merge expenses and incomes
    const all = [...expenses, ...incomes];

    // sort all by date
    all.sort((a, b) => {
        return new Date(b.date) - new Date(a.date);
    });


    useEffect(() => {

    }, []);




    const [open, setOpen] = useState(false);
    return (
        <>
            <AppNavbar />
            {/* <div className='box1'>
            </div>

            <div className='box2'>
            </div> */}

            <Chat />
            <Container className='home-container'>
                {authContext.isLoggedIn && (
                    <>
                        <span>Welcome, {localStorage.getItem('nume')}</span>
                    </>
                )}


                <h1 className='headline'>Total Balance</h1>
                <h2 className='user-name'>{balance} <p className=''> RON</p></h2>

                <div className='d-flex button-container align-items-center justify-content-around'>
                    <div className='group-button d-flex flex-column align-items-center'>
                        <div className='round-button d-flex'>
                            <sl-icon name="plus" size="large" />
                        </div>
                        <p>Add</p>
                    </div>

                    <div className='group-button d-flex flex-column align-items-center'>
                        <div className='round-button d-flex'>
                            <sl-icon name="arrow-up-right"></sl-icon>
                        </div>
                        <p>Send</p>
                    </div>

                    <div className='group-button d-flex flex-column align-items-center'>
                        <div className='round-button d-flex'>
                            <sl-icon name="arrow-bar-down"></sl-icon>
                        </div>
                        <p>Statistics</p>
                    </div>
                </div>




            <h1 className='headline'>Recent transactions</h1>

            {/* sorting expenses by date */}

            {expenses.map((expense) => (
                <div className='expense card-container' key={expense._id}>
                    <h3>-{expense.value}</h3>
                    <p>{expense.description}</p>
                    <SlFormatDate date={expense.date} />
                </div>
            ))}

            {incomes.map((income) => (
                <div className='income card-container' key={income._id}>
                    <h3>+{income.value} </h3>
                    <p>{income.description}</p>
                    <SlFormatDate date={income.date} />
                </div>
            ))}

        </Container >
        <Footer />
        </>

    );
}

export default Home;