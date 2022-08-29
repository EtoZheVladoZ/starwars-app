import React from "react";

import "./Card.scss";

const Card = ({ name }: any) => {
  return <div className="card">{`Name: ${name}`}</div>;
};

export default Card;
