import React from "react";
import { Card, Badge, Button, Row, Col } from "react-bootstrap";
import "./ONGcard.css";
import Swal from "sweetalert2";

const ONGcard = (props) => {

  const openDonationModal = (id) => {
    let amount;
    Swal.fire({
      title: "Donation",
      html: `
      <div class="input-group mb-2">
        <input type="number" class="form-control" placeholder="Amount" aria-label="Amount" aria-describedby="basic-addon1"
        style="padding: 1rem"" id="donation-amount" min="5" required
        >
      </div>
      `,
      showCancelButton: true,
      confirmButtonText: "Donate",
      cancelButtonText: "Cancel",
      showLoaderOnConfirm: true,
      didOpen: () => {
        const popup = Swal.getPopup();
        amount = popup.querySelector("input");
        amount.onkeyup = (event) => event.key === 'Enter' && Swal.clickConfirm()
      },
      preConfirm: () => {
        const value = amount.value;
        const url = "http://localhost:5000/api/payments/buyItem";
        const payload = {
          uid: localStorage.getItem("token"),
          price: value,
          name: id,
        };
        fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        })
          .then((res) => {
            if (res.ok) {
              return res.json();
            } else {
              throw new Error("Something went wrong");
            }
          })
          .then((data) => {
            console.log(data);
            Swal.fire({
              title: "Success!",
              text: "Your donation was successful!",
              icon: "success",
              confirmButtonText: "Ok",
            })
            .then(() => {
              window.location.href = "/marketplace";
            })
          })
          .catch((err) => {
            console.log(err);
            Swal.fire({
              title: "Error!",
              text: "Your donation was not successful!",
              icon: "error",
              confirmButtonText: "Ok",
            });
          });
      },
      allowOutsideClick: () => !Swal.isLoading(),
    });
  }

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
              onClick={() => openDonationModal(props.id)}
              >
              Donate
            </Button>
          </Col>
        </Row>
    </div>
  );
};

export default ONGcard;
