import React from "react";
import "./PlatinumCard.css"; // This will be your CSS file where you will write styles for the card

const PlatinumCard = () => {
  return (
    <div className="platinum-card">
      <div className="platinum-card-inner">
        <h2 className="platinum-card-title">Platinum Membership</h2>
        <p className="platinum-card-text">
          Unlock exclusive benefits and features
        </p>
        <button className="platinum-card-button">Go Platinum</button>
      </div>
    </div>
  );
};

export default PlatinumCard;
