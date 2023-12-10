import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import AppNavbar from "./AppNavbar";
import backpackImage1 from "./images/backpack1.png";
import backpackImage2 from "./images/backpack2.png";
import backpackImage3 from "./images/backpack3.png";
import clothes1 from "./images/clothes1.png";
import clothes2 from "./images/clothes2.png";
import clothes3 from "./images/clothes3.png";
import miscellaneous1 from "./images/miscellaneous1.png";
import miscellaneous2 from "./images/miscellaneous2.png";
import miscellaneous3 from "./images/miscellaneous3.png";
import "./Marketplace.css";
import GoldCard from "./GoldCard";
import PlatinumCard from "./PlatinumCard";
import ONGlist from "./ONGlist";

import Swal from "sweetalert2";

import { useEffect, useState } from "react";

const DUMMY_DATA = [
  {
    id: "product1",
    name: "Rains Backpack",
    price: 99,
    description:
      "Crafted from recycled materials, emphasizing sustainability and eco-friendliness",
    image: backpackImage1,
  },
  {
    id: "product2",
    name: "Rolltop Backpack",
    description:
      "Responsible choice for fashion-forward individuals who care about the planet.",
    image: backpackImage2,
    price: 149,
  },
  {
    id: "product3",
    name: "Sandqvist Backpack",
    description:
      "Sustainable cotton and vegetable-tanned leather are used as materials.",
    image: backpackImage3,
    price: 349,
  },
  {
    id: "product4",
    name: "Ecoalf Jacket",
    description:
      "Logo-patch pouch-pocket dress. Organic Cotton 50%, Recycled Cotton 50%",
    image: clothes1,
    price: 119,
  },
  {
    id: "product5",
    name: "GR10K",
    description:
      "Green recycled polyamide-blend recycled knit jumper from GR10K featuring knitted construction",
    image: clothes2,
    price: 69,
  },
  {
    id: "product6",
    name: "Stadium Goods",
    description: "Simple and super soft. Made from an organic cotton blend.",
    image: clothes3,
    price: 89,
  },
  {
    id: "product7",
    name: "Biodegradable Toothbrushes",
    description:
      "100% Plant-Based Beech Wood Toothbrush, available in multiple colors",
    image: miscellaneous1,
    price: 9,
  },
  {
    id: "product8",
    name: "Soap",
    description:
      "An all natural ingredient soap derived only from coconut and eucalyptus.",
    image: miscellaneous2,
    price: 9,
  },
  {
    id: "product9",
    name: "Eco-friendly Gift",
    description: "Eco-friendly Hamper Gift Set Soap Bar Shampoo Bar",
    image: miscellaneous3,
    price: 29,
  },
];

// useffect fecth user coins


const buyItem = (product) => {
  console.log(product);
  const handleSubmit = () => {
    fetch("http://localhost:5000/api/payments/buyItem", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        uid: localStorage.getItem("token"),
        price: product.price,
        name: product.name
      }),
    }).then(res => {
      if (res.ok) {
          return res.json()
      } else {
          Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: res.message,
          })
          throw new Error('Something went wrong');
      }
    })
    .then(data => {
        Swal.fire({
            icon: 'success',
            title: 'Success',
            text: data.message,
        }).then(() => {
            window.location.href = '/home';
        })
    })
  }
  handleSubmit();
}

const Marketplace = () => {
  const [coins, setCoins] = useState(0);

  useEffect(() => {
    var url = 'http://localhost:5000/api/users/ceva/' + localStorage.getItem('nume');
    fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then(res => {
      return res.json();
    })
    .then(data => {
      setCoins(data.user.coins);
    })
    .catch(error => {
      console.error(error);
    });
  }, []);

  return (
    <>
      <AppNavbar />
      <div className="home-container container">
        <h1 className="headline">Marketplace</h1>
        <p>
          You have <strong>{coins}</strong> Coins <sl-icon name="coin"></sl-icon>
        </p>
        <Tabs
          defaultActiveKey="plans"
          id="uncontrolled-tab-example"
          className="mb-3"
        >

          <Tab eventKey="plans" title="Plans">
            <div className="d-flex justify-content-evenly align-items-start">
              <GoldCard />
              <PlatinumCard />
            </div>
          </Tab>
          <Tab eventKey="products" title="Products">
            <Container>
              <Row>
                {DUMMY_DATA.map((product) => (
                  <Col md={4} key={product.id} className="mb-4">
                    <Card style={{ width: "350px", height: "600px" }} id="my-card">
                      <Card.Img
                        variant="top"
                        src={product.image}
                        className="marketplace-img"
                      />
                      <Card.Body>
                        <div className="d-flex justify-content-between">
                          <Card.Title>{product.name}</Card.Title>
                          <Card.Title className="d-flex align-items-center">
                            {product.price}
                            <sl-icon
                              style={{ paddingLeft: "8px" }}
                              name="coin"
                            ></sl-icon>
                          </Card.Title>
                        </div>
                        <Card.Text>{product.description}</Card.Text>
                        <Button variant="primary" id="but-2" onClick={() => buyItem(product)}>Buy</Button>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Container>
          </Tab>
          <Tab eventKey="grants" title="Donate">
            <ONGlist />
          </Tab>
        </Tabs>
      </div>
    </>
  );
};

export default Marketplace;
