import React from "react";
import { Card, Badge, Button, Row, Col } from "react-bootstrap";
import "./ONGcard.css";
import Swal from "sweetalert2";

const ONGcard = (props) => {

  return (
    <div className="my-custom-component">
        <div className="d-flex justify-content-between align-items-center">
          <h1 className="headline my-headline">{props.name}</h1>
          <div className="my-badge">
            Matching Offer 1:2
          </div>
        </div>
        <br></br>
        <div className="line"></div>
        <Row className="align-items-center">
          <Col xs={12} md={3} lg={4}>
            <img
              src={props.image}
              alt="Generic placeholder"
              className="img-fluid" // This class makes the image responsive
            />
          </Col>
          <Col xs={12} md={9} lg={8}>
            <p>{props.description}</p>
            <div className="text-muted"><sl-icon name="geo-alt"></sl-icon>
            {props.location}</div>
            <br></br>
            <Button variant="primary" size="sm" className="mt-2" id="but-2"
              // onClick={() => openDonationModal(props.id)}
              >
              Donate
            </Button>
          </Col>
        </Row>
    </div>
  );
};

export default ONGcard;
