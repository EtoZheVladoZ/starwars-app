import React from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

import "./Profile.scss";

import arrowLeft from "../../assets/img/left-arrow.svg";

const Profile = ({ characters, films, species, starships }: any) => {
  const { characterName } = useParams();
  const character = characters.find(
    (item: any) =>
      item.name.toLowerCase().split(" ").join("-") === characterName
  );
  const specie = species.find((item: any) =>
    item.people.includes(character.url)
  );
  const characterFilms = films
    .filter((item: any) => item.characters.includes(character.url))
    .map((item: any) => item.title);
  const characterStarships = starships
    .filter((item: any) => item.pilots.includes(character.url))
    .map((item: any) => item.name);

  console.log(characterStarships);

  return (
    <div className="wrapper">
      <div className="wrapper__profile">
        <Link to={`/`}>
          <img className="arrow-left" src={arrowLeft} alt="arrow left" />
        </Link>
        <div className="wrapper__profile-info">
          <p>{`Name: ${character.name}`}</p>
          <p>{`Spacies: ${
            specie !== undefined ? specie.name : "Undefined"
          }`}</p>
          <div className="info-holder">
            <p>{"Movies: "}</p>
            <div className="items">
              {characterFilms.map((item: string, index: number) => (
                <p className="item" key={index}>{item}</p>
              ))}
            </div>
          </div>
          <div className="info-holder">
            <p>{"Starships: "}</p>
            <div className="items">
              {characterStarships.length !== 0
                ? characterStarships.map((item: string, index: number) => (
                    <p className="item" key={index}>{item}</p>
                  ))
                : "Unknow"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
