import React from "react";

import "./RadioButton.scss"

const RadioButton = ({ title, characters, name, onChange, checked }: any) => {
  return (
    <div className="radio-button">
      <input
        type="radio"
        id={title}
        name={name}
        value={characters}
        checked={checked === title}
        onChange={(e) => onChange(e)}
      />
      <label>{title}</label>
    </div>
  );
};

export default RadioButton;
