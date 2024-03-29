import ONGcard from "./ONGcard";
import "./ONGlist.css";
import spatiiverzi from "./images/spatiiverzi.png";
import montana from "./images/montana.png";
import carpathia from "./images/carpathia.png";
import green from "./images/green.png";
import React from "react";
import { useState } from "react";
import { SlInput } from "@shoelace-style/shoelace/dist/react";

const DUMMY_ONGs = [

  {
    id: "ong1",
    name: "Asociatia Montana Carpati",
    description:
      "Prin intermediul activităților organizate ne dorim să schimbăm percepția oamenilor asupra mediului înconjurător, să-i determinăm să fie mai atenți și mai responsabili",
    image: montana,
    location: "Bucuresti, Romania",
    link: "https://asociatiamontanacarpati.ro/",
  },
  {
    id: "ong2",
    name: "Asociatia Carpathia",
    description:
      "Fundația Conservation Carpathia a fost fondată în anul 2009 de către 12 filantropi și conservaționiști cu scopul de a opri tăierile ilegale de pădure",
    image: carpathia,
    location: "Bucuresti, Romania",
    link: "https://www.carpathia.org/ro/",
  },
  {
    id: "ong3",
    name: "Asociatia GREEN",
    description:
      "Grupul Regional pentru Ecologie Europeană şi Natură. Daca vrei sa ni te alaturi, trebuie doar sa ne dai de stire. ",
    image: green,
    location: "Bucuresti, Romania",
    link: "https://www.protectiamediului.org/asociatii/green-grupul-regional-pentru-ecologie-europeana-si-natura/",
  },
  {
    id: "ong4",
    name: "Asociatia Spatii Verzi",
    description:
      "Programul Spaţii Verzi este o iniţiativă comună a MOL România şi a Fundaţiei pentru Parteneriat lansată în 2006 sub forma unui program ce a urmărit implicarea copiilor şi a tinerilor în proiecte de  amenajare a spaţiilor verzi.",
    image: spatiiverzi,
    location: "Bucuresti, Romania",
    link: "https://www.spatiiverzi.org.ro/",
  }
];

const ONGlist = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredONGs = DUMMY_ONGs.filter((ong) =>
    ong.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
    <div className="ong-container">
      <SlInput
        type="text"
        placeholder="Search"
        value={searchQuery}
        onInput={(e) => setSearchQuery(e.target.value)}
        helpText="Find ONGs by name"
      />
      {filteredONGs.map((ong) => (
        <ONGcard
          key={ong.id}
          name={ong.name}
          description={ong.description}
          image={ong.image}
          location={ong.location}
          link={ong.link}
        />
      ))}
    </div>
  );
};

export default ONGlist;
