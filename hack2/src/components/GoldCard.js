import React from "react";
import "./GoldCard.css"; // This will be your CSS file where you will write styles for the card

import Button from "react-bootstrap/Button";

const GoldCard = () => {
  const [isHovered, setIsHovered] = React.useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
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
            <Button className="" id="but-2">Go Gold</Button>
          </div>
        </div>
        <div className="gold-card"></div>
        
      </div>
      {isHovered && 
      <div className="membership-info">
        <ul>
          <li>1% cashback on all purchases</li>
          <li>1% cashback on all purchases</li>
          <li>1% cashback on all purchases</li>
          <li>1% cashback on all purchases</li>
        </ul>
      </div>}
    </div>
      
    </>
  );
};

export default GoldCard;
