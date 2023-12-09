import React from "react";
import { Card, Badge, Button, Row, Col } from "react-bootstrap";
import "./ONGcard.css";

const ONGcard = (props) => {
  return (
    <Card className="my-custom-component shadow-sm">
      <Card.Body>
        <div className="d-flex justify-content-between align-items-center">
          <Card.Title>{props.name}</Card.Title>
          <Badge variant="secondary" style={{ padding: "8px" }}>
            Matching Offer 1:2
          </Badge>
        </div>

        <Row className="align-items-center">
          <Col xs={12} md={3} lg={2}>
            <img
              src={props.image}
              alt="Generic placeholder"
              className="img-fluid" // This class makes the image responsive
            />
          </Col>
          <Col xs={12} md={9} lg={10}>
            <Card.Text>{props.description}</Card.Text>
            <div className="text-muted">{props.location}</div>
            <Button variant="outline-primary" size="sm" className="mt-2">
              Donate
            </Button>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default ONGcard;
