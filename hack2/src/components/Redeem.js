import React, { useState, useRef } from 'react';
import { Button } from 'react-bootstrap';
import { Container } from 'react-bootstrap';
import background from './bg.jpg';

import Navbar from './AppNavbar';
import Swal from 'sweetalert2';



import './Redeem.css';

const VerificationCodeInput = () => {
  const inputRef = useRef([]);
  const [code, setCode] = useState(new Array(6).fill(''));

  const handleChange = (element, index) => {
    const newCode = [...code];
    newCode[index] = element.value;
    setCode(newCode);

    if (element.value.length === 1 && index < 5) {
      inputRef.current[index + 1].focus();
    }
  };

  const handleBackspace = (element, index) => {
    if (index > 0 && element.value.length === 0) {
      inputRef.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const paste = e.clipboardData.getData('text').split('').filter((_, index) => index < 6);
    if (paste.length === 6) {
      setCode(paste);
      inputRef.current[5].focus();
    }
  };

  const sendCode = () => {
    if (code.length === 6) {
        const handleSubmit = () => {
            const code = inputRef.current.map((input) => input.value).join('');
            const url = 'http://localhost:5000/api/payments/redeem';
            const payload = {
                code: code,
                uid: localStorage.getItem('token')
            };
            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            })
            .then(res => {
                if (res.ok) {
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
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: data.message,
                }).then(() => {
                    window.location.href = '/home';
                })
            })
        }
        handleSubmit();
    }
  }

  return (
    <>
        <Navbar />
        <div className='background'>
            <img src={background} alt="background" />
            <div className='background-whitefade'></div>
        </div>
        <Container className='redeem-container d-flex justify-content-center align-items-center'>
            <div onPaste={handlePaste}>
            <h1 className='headline'>Redeem code</h1>
            <p>
                Here you can redeem your<strong> volunteering rewards</strong>. Enter the code you received from your volunteering organization.
            </p>
            {code.map((num, index) => (
                <input
                key={index}
                ref={(el) => (inputRef.current[index] = el)}
                type="text"
                maxLength="1"
                value={num}
                onChange={(e) => handleChange(e.target, index)}
                onKeyDown={(e) => e.key === 'Backspace' && handleBackspace(e.target, index)}
                onFocus={(e) => e.target.select()}
                style={{ width: '4rem', height: '4rem', textAlign: 'center', marginRight: '0.5rem', fontSize: '2rem', borderRadius: '5px', border: '1px solid #ced4da', boxShadow: '0 0 10px #ced4da' }}
                />
            ))}
            <br></br>
            <br></br>
            <div>
                 <p className='d-flex flex-row' >
                    Get <div className='d-flex align-items-center' style={{paddingLeft: '4px'}}><strong>Coins</strong> <sl-icon name="coin" style={{paddingRight: '4px'}}></sl-icon></div>to buy products from the<strong style={{paddingLeft: '4px'}}>Marketplace</strong>
                </p>
                <Button onClick={sendCode}>Redeem</Button>
            </div>
            </div>
        </Container>
    </>
  );
};

export default VerificationCodeInput;