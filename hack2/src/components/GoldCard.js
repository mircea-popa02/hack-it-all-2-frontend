import React from "react";
import "./GoldCard.css"; // This will be your CSS file where you will write styles for the card

import Button from "react-bootstrap/Button";

import Swal from "sweetalert2";

const GoldCard = () => {
  const [isHovered, setIsHovered] = React.useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const product = {
    id: "Gold Membership 30 days",
    price: 49,
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const buyItem = () => {
    console.log("buying item");
    const url = "http://localhost:5000/api/payments/buyItem";
    const payload = {
      uid: localStorage.getItem("token"),
      price: product.price,
      name: product.id,
    };
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((res) => {
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
  };

  return (
    <>
    <div className="d-flex flex-column align-items-center">
      <div
        className="membership d-flex align-items-center"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="membership-text">
          <h2 className="headline">Gold Membership</h2>
          <div>
            <p>Unlock exclusive benefits and features</p>
            <Button className="" id="but-2" onClick={() => buyItem()}>
              Go Gold</Button>
          </div>
        </div>
        <div className="gold-card"></div>
        
      </div>
      {isHovered && 
      <div className="membership-info">
        <ul>
          <li>Personalized gold card</li>
          <li>20% discount international transactions</li>
          <li>3% Gross interest on savings</li>
          <li>Discounted airport lounge access</li>
        </ul>
      </div>}
    </div>
      
    </>
  );
};

export default GoldCard;
