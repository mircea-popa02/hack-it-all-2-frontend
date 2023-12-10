import React from "react";
import "./PlatinumCard.css"; // This will be your CSS file where you will write styles for the card
import { Button } from "react-bootstrap";

const PlatinumCard = () => {
  return (
    <div className="platinum-card">
      <div className="platinum-card-inner">
        <h2 className="platinum-card-title">Platinum Membership</h2>
        <p className="platinum-card-text">
          Unlock exclusive benefits and features
        </p>
        <Button className="" id="but-2">Go Platinum</Button>
      </div>
    </div>
  );
};

export default PlatinumCard;
