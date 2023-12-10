import React from "react";
import { Card, Row, Col, Container } from "react-bootstrap";
import "./GreenLoanItems.css";

const GreenLoanItems = ({ items }) => {
  return (
    <Container>
      <Row className="justify-content-md-center">
        {items.map((item, index) => (
          <Col key={index} md={2} className="mb-4 d-flex align-items-stretch">
            <div className="w-100 text-center d-flex flex-column card-loan">
              <Card.Body className="d-flex flex-column justify-content-center flex-grow-1">
                <Card.Title>{item.title}</Card.Title>
              </Card.Body>
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default GreenLoanItems;
