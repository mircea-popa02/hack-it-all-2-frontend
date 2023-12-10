import React from "react";
import "./PlatinumCard.css"; // This will be your CSS file where you will write styles for the card
import { Button } from "react-bootstrap";

const PlatinumCard = () => {

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
            <h2 className="headline">Platinum Membership</h2>

            <div>
              <p>Unlock all the benefits and features</p>
              <Button className="" id="but-2">Go Platinum</Button>
            </div>
          </div>

          <div className="platinum-card"></div>
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

export default PlatinumCard;
