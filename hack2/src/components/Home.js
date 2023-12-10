import { useContext } from 'react';
import AuthContext from './AuthContext';
import { useEffect } from 'react';
import { useState } from 'react';

import basic from './bg.jpg';
import gold from './gold.png';
import platinum from './black.png';

// import bootstrap button and 
import { Container } from 'react-bootstrap';

import AppNavbar from './AppNavbar';
import Redeem from './Redeem';
//import css
import './Home.css';
import { SlFormatDate } from '@shoelace-style/shoelace/dist/react';

import Chat from './Chat';

import Footer from './Footer';

import Swal from 'sweetalert2';
import { NavLink } from 'react-router-dom';

import { Row, Col } from 'react-bootstrap';

const Home = () => {

    const authContext = useContext(AuthContext);
    const [incomes, setIncome] = useState([]);
    const [expenses, setExpenses] = useState([]);
    const [balance, setBalance] = useState(0);
    const [coins, setCoins] = useState(0);
    const [accountType, setAccountType] = useState('basic');


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
                setCoins(data.user.coins);
                setAccountType(data.user.accountType);
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


    const addMoney = () => {
        Swal.fire
            ({
                title: 'Add money',
                input: 'number',
                // inputLabel: 'Amount',
                inputPlaceholder: 'Enter the amount',
                showCancelButton: true,
                confirmButtonText: 'Add',
                showLoaderOnConfirm: true,
                preConfirm: (amount) => {
                    console.log(amount);
                    var url = 'http://localhost:5000/api/payments/ing/';
                    fetch(url, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        }
                        ,
                        body: JSON.stringify({
                            value: amount,
                            type: 'income',
                            destination: localStorage.getItem('token'),
                            description: 'Added money via app'
                        })
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
                            setBalance(balance + +amount);
                            window.Email.send({
                                Host: "smtp.elasticemail.com",
                                Username: "pmircea027@gmail.com",
                                Password: "5899E82B668DCCCCB2F780F83DEBF239F496",
                                To: "mci42@yahoo.com",
                                From: "pmircea027@gmail.com",
                                Subject: "Payment confirmation",
                                Body: "And this is the body"
                            }).then(
                                // refresh
                                window.location.reload()
                            );
                        }
                        )
                        .catch(err => {
                            console.log(err);
                        })
                }
            })
            .finally(() => {
                window.location.reload();
            })
    }

    const [open, setOpen] = useState(false);
    return (
        <>
            <AppNavbar />
            {/* <div className='background'>
                <img src={background} alt="background" />
                <div className='background-whitefade'></div>
            </div> */}

            {accountType === 'basic' && (
                <div className='background'>
                    <img src={basic} alt="background" />
                    <div className='background-whitefade'></div>
                </div>
            )}

            {accountType === 'gold' && (
                <div className='background'>
                    <img src={gold} alt="background" />
                    <div className='background-whitefade'></div>
                </div>
            )}

            {accountType === 'platinum' && (
                <div className='background'>
                    <img src={platinum} alt="background" />
                    <div className='background-whitefade'></div>
                </div>
            )}


            <Container className='home-container '>
                <div className='balance-container small'>
                    {authContext.isLoggedIn && (
                        <>
                            <span>Welcome, <strong>{localStorage.getItem('nume')}</strong></span>
                        </>
                    )}
                    <h1 className='headline'>Total Balance <sl-icon name="currency-exchange"></sl-icon></h1>
                    <div className='line'></div>
                    <div className='d-flex justify-content-center'>
                        <h2 className='user-name coins'>{(balance).toFixed(2)} <p className=''> RON</p></h2>
                        <h2 className='user-name coins'>
                            {coins}
                            <p className='d-flex align-items-center'>
                                Coins <sl-icon name="coin" style={{ paddingLeft: '8px' }}></sl-icon>
                            </p>
                        </h2>
                    </div>
                    <br></br>
                    <div className='d-flex button-container align-items-center justify-content-around quick'>
                        <div className='group-button d-flex flex-column align-items-center' onClick={addMoney}>
                            <div className='round-button d-flex'>
                                <sl-icon name="plus" size="large" />
                            </div>
                            <p>Add</p>
                        </div>

                        <NavLink to='/transactions'>
                            <div className='group-button d-flex flex-column align-items-center'>
                                <div className='round-button d-flex'>
                                    <sl-icon name="arrow-up-right"></sl-icon>
                                </div>
                                <p>Send</p>
                            </div>
                        </NavLink>

                        <NavLink to='/action'>
                            <div className='group-button d-flex flex-column align-items-center'>
                                <div className='round-button d-flex'>
                                    <sl-icon name="award"></sl-icon>
                                </div>
                                <p>Redeem</p>
                            </div>
                        </NavLink>
                    </div>
                </div>
                <br></br>
                {expenses.length > 0 && (
                    <div className='balance-container'>
                        <h1 className='headline'>Recent transactions</h1>
                        <p>
                            Here you can see your recent transactions
                        </p>
                        <div className='line'></div>
                        <Col>
                            {expenses.map((expense) => (
                                <>
                                    <div className='expense card-container d-flex' key={expense._id}>
                                        <h3>-{(expense.value).toFixed(2)}</h3>
                                        <Col>
                                            <strong>{expense.type}</strong>
                                            <p>{expense.description}</p>
                                        </Col>
                                        <SlFormatDate date={expense.date} className='date' />
                                    </div>
                                </>
                            ))}
                        </Col>
                        <Col>
                            {incomes.map((income) => (
                                <div className='income card-container d-flex' key={income._id}>
                                    <h3>+{(income.value).toFixed(2)} </h3>
                                    <Col>
                                        <strong>{income.type}</strong>
                                        <p>{income.description}</p>
                                    </Col>
                                    <SlFormatDate date={income.date} className='date'/>
                                </div>
                            ))}
                        </Col>
                    </div>
                )}
            </Container >
            <Footer/>
        </>

    );
}

export default Home;