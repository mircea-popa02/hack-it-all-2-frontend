import React from "react";
import "./GoldCard.css"; // This will be your CSS file where you will write styles for the card

import Button from "react-bootstrap/Button";

const GoldCard = () => {
  return (
    <div className="gold-card">
      <div className="gold-card-inner">
        <h2 className="gold-card-title">Gold Membership</h2>
        <p className="gold-card-text">Unlock exclusive benefits and features</p>
        <Button className="" id="but-2">Go Gold</Button>
      </div>
    </div>
  );
};

export default GoldCard;
