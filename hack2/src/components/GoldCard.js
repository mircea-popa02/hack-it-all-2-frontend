import React from "react";
import "./GoldCard.css"; // This will be your CSS file where you will write styles for the card

const GoldCard = () => {
  return (
    <div className="gold-card">
      <div className="gold-card-inner">
        <h2 className="gold-card-title">Gold Membership</h2>
        <p className="gold-card-text">Unlock exclusive benefits and features</p>
        <button className="gold-card-button">Go Gold</button>
      </div>
    </div>
  );
};

export default GoldCard;
