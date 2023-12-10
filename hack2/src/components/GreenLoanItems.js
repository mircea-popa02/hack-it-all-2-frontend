import React from "react";
import { Card, Row, Col, Container } from "react-bootstrap";

const GreenLoanItems = ({ items }) => {
  return (
    <Container>
      <Row className="justify-content-md-center">
        {items.map((item, index) => (
          <Col key={index} md={2} className="mb-4 d-flex align-items-stretch">
            <Card className="w-100 text-center d-flex flex-column">
              {/* <Card.Img
                variant="top"
                src={item.imageSrc}
                className="card-img-top"
              /> */}
              <Card.Body className="d-flex flex-column justify-content-center flex-grow-1">
                <Card.Title>{item.title}</Card.Title>
                {/* <Card.Text className="flex-grow-1 d-flex align-items-center justify-content-center">
                  {item.description}
                </Card.Text> */}
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default GreenLoanItems;
