// import css
import './Profile.css';
import { useContext, useRef } from 'react';
import AuthContext from './AuthContext';
import { Button } from 'react-bootstrap';

import Footer from './Footer';

import Graph from './Graph';
import Chat from './Chat';
import DefaultImage from './default-user.jpg';

import { SlInput } from '@shoelace-style/shoelace/dist/react';

import { Container } from 'react-bootstrap';

import { useEffect } from 'react';
import { useState } from 'react';

import AppNavbar from './AppNavbar';
import Swal from 'sweetalert2';

import basic from './bg.jpg';
import gold from './gold.png';
import platinum from './black.png';
const Profile = () => {
    const [group, setGroup] = useState([]);
    const authContext = useContext(AuthContext);
    const limit = useRef();
    const [limita, setLimita] = useState('');
    const [accountLimit, setAccountLimit] = useState(0);

    const [accountType, setAccountType] = useState('');
    const [premiumAccountStartDate, setPremiumAccountStartDate] = useState('');

    const splitRefDesc = useRef();

    const [splitDesc, setSplitDesc] = useState('');

    const splitRef = useRef();

    const [splitValue, setSplitValue] = useState(0);

    const [income, setIncome] = useState([]);
    const [expenses, setExpenses] = useState([]);

    useEffect(() => {
        var url = "http://localhost:5000/api/payments/ceva/";

        url += localStorage.getItem("token");

        fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                } else {
                    throw new Error("Something went wrong");
                }
            })
            .then((data) => {
                console.log(data);
                setIncome(data.incomes);
                setExpenses(data.expenses);
            })
            .catch((err) => {
                console.log(err);
            });
        fetch('http://localhost:5000/api/users/ceva/' + localStorage.getItem('nume'))

            .then(res => res.json())
            .then(data => {
                console.log(data);
                setAccountLimit(data.user.accountlimit);
                setAccountType(data.user.accountType);
                setPremiumAccountStartDate(data.user.premiumAccountStartDate);
            })

        fetch("http://localhost:5000/api/groups/643185b22613671bb452c29d", {
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
                setGroup(data.groupWithMembers)
            }
            )
            .catch(err => {
                console.log(err);
            }
            )
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

    const makeSplitPayment = (e) => {
        e.preventDefault();
        const splitValueNew = splitRef.current.value;
        const splitDescNew = splitRefDesc.current.value;
        console.log(splitValue);
        setSplitValue(0);


        const promises = [];
        for (let i = 0; i < group.length; i++) {
            promises.push(
                fetch(
                    `http://localhost:5000/api/payments/`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            value: splitValueNew / group.length,
                            creator: group[i]._id,
                            description: splitDescNew,
                            type: "Split",
                            destination: "6431ed1a8deaff540c2022e6"
                        }),
                    }
                )
            );
        }
        Promise.all(promises)
            .then((res) => {
                console.log(res);
                Swal.fire({
                    title: 'Success!',
                    text: 'Split payment made',
                    icon: 'success',
                    confirmButtonText: 'Ok'
                })
            })
            .catch((err) => {
                console.log(err);
            }
            )

        setSplitValue(0);
    };


    const computeRemainingPremiumDays = () => {
        const date1 = new Date(premiumAccountStartDate);
        const date2 = new Date();
        const diffTime = Math.abs(date2 - date1);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return 30 - diffDays;
    }

    return (
        <>
            <AppNavbar />
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
            <Container className='home-container'>
                <div className='form-container d-flex flex-column small'>
                    <div className='d-flex flex-row justify-content-between'>
                        <div>
                            <h1 className='headline'>Profile </h1>
                            <h3 className='user-name'>Hello, {localStorage.getItem('nume')}</h3>
                            {accountType === 'basic' && (
                                <p>You have a <strong>{accountType.toUpperCase()}</strong> account</p>
                            )}
                            {accountType === 'gold' && (
                                <p>You have a <strong>{accountType.toUpperCase()}</strong> account</p>
                            )}
                            {accountType === 'platinum' && (
                                <p>You have a <strong>{accountType.toUpperCase()}</strong> account</p>
                            )}
                        </div>
                        <img src={DefaultImage} alt="default" className='default-image' />
                    </div>
                    <div className='line'></div>
                    <div>
                        <p>Your set <strong>montly limit</strong> is {accountLimit} RON</p>
                        <p>
                        {expenses
                            .map((expense) => expense.value)
                            .reduce((total, item) => total + item, 0) > accountLimit
                            ? <p className="over-limit">Your total spendings are {expenses
                                .map((expense) => expense.value)
                                .reduce((total, item) => total + item, 0)
                                .toFixed(2)} RON. You are over your limit</p>
                            : <p className='under-limit'>You have spent <strong>{expenses
                                .map((expense) => expense.value)
                                .reduce((total, item) => total + item, 0)
                                .toFixed(2)} / {accountLimit} </strong>RON</p>

                        }
                        </p>
                        <form onSubmit={setLimit}>
                            <div className='d-flex flex-row align-items-center justify-content-between'>
                                {/* only numbers */}
                                <SlInput placeholder="Set new limit" help-text="Press enter to submit" ref={limit} value={limita} />
                                {limita !== "" && (
                                    <Button variant="primary" type="submit" id='but-2'>
                                        Set
                                    </Button>
                                )
                                }
                            </div>
                        </form>
                    </div>
                </div>
                <br></br>
                <div className='form-container'>
                    <h1 className='headline'>Statistics</h1>
                    <h3 className='user-name'>Spendings</h3>
                    <p>
                        {expenses
                            .map((expense) => expense.value)
                            .reduce((total, item) => total + item, 0)
                            .toFixed(2)} RON spent in the last 30 days
                    </p>
                    <br></br>
                    <Graph />
                </div>
            </Container>
            <Footer />
        </>
    );
}

export default Profile;
