import React from "react";
import GreenLoanItems from "./GreenLoanItems";
import ContactForm from "./ContactForm";

const items = [
  {
    imageSrc: "path-to-your-image-1.jpg",
    title: "Electric and hybrid cars",
    description: "Plug-in type with carbon emissions below 50gCO2 / km",
  },
  {
    imageSrc: "path-to-your-image-1.jpg",
    title: "Green equipment for personal mobility",
    description: "Electric bicycles, scooters / electric scooters",
  },
  {
    imageSrc: "path-to-your-image-1.jpg",
    title: "Equipment that uses renewable energy",
    description:
      "Solar / photovoltaic panels, heat pumps, boilers, convectors, collectors and auxiliary installations",
  },
  {
    imageSrc: "path-to-your-image-1.jpg",
    title: "Equipment that improves the energy efficiency of the home",
    description:
      "Double glazed windows, central heating, including auxiliary installations and boilers, air conditioning equipment",
  },
  {
    imageSrc: "path-to-your-image-1.jpg",
    title: "Green House",
    description:
      "Energy efficiency, sustainable and durable materials, better air quality",
  },
];

const GreenLoans = () => {
  return (
    <>
      <h2
        className="headline"
        style={{
          fontSize: "1.4rem",
        }}
      >
        What are Green Loans?
      </h2>
      <p>
        A green loan is a form of financing that enables borrowers to use the
        proceeds to exclusively fund projects that make a substantial
        contribution to an environmental objective
      </p>
      <h2
        className="headline"
        style={{
          fontSize: "1.4rem",
        }}
      >
        What makes a loan a green loan?
      </h2>
      <p>
        To be called a green loan, a loan should be structured in alignment to
        the Green Loan Principles:
      </p>
      <ul>
        <li>
          Designated Green Projects should provide clear environmental benefits
        </li>
        <li>
          The proceeds of a green loan should be tracked by the borrower to
          maintain transparency and promote the integrity of the product.
        </li>
      </ul>
      <div>
        <GreenLoanItems items={items} />
      </div>
      <ContactForm />
    </>
  );
};

export default GreenLoans;
