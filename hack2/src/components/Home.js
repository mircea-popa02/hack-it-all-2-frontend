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

const Home = () => {

    const authContext = useContext(AuthContext);
    const [incomes, setIncome] = useState([]);
    const [expenses, setExpenses] = useState([]);


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

    }, [])

    const [open, setOpen] = useState(false);
    return (
        <>
            <AppNavbar />
            <div className='box1'>
            </div>

            <div className='box2'>
            </div>

            <Container className='home-container'>
                {authContext.isLoggedIn && (
                    <>
                        <h1 className='headline'>Welcome,</h1>
                        <h2 className='user-name'>{localStorage.getItem('nume')}</h2>
                    </>
                )}
            </Container>
            
            <Container className='home-container'>
                <h1 className='headline'>Recent transactions</h1>
                
                {incomes.map((income) => (
                    <div className='income card-container' key={income._id}>
                        <h3>+{income.value} </h3>
                        <p>{income.description}</p>
                        <SlFormatDate date={income.date} />
                    </div>
                ))}

                {expenses.map((expense) => (
                    <div className='expense card-container' key={expense._id}>
                        <h3>-{expense.value}</h3>
                        <p>{expense.description}</p>
                        <SlFormatDate date={expense.date} />
                    </div>
                ))}

                {/* <SlDrawer label="Drawer" placement="start" open={open} onSlAfterHide={() => setOpen(false)}>
                    This drawer slides in from the start.
                    <SlButton slot="footer" variant="primary" onClick={() => setOpen(false)}>
                        Close
                    </SlButton>
                </SlDrawer>

                <Button onClick={() => setOpen(true)}>Open Drawer</Button> */}
            </Container>
        </>

    );
}

export default Home;