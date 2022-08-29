import React from "react";

import RadioButton from "../../components/RadioButton";

import "./Filter.scss";

import arrowDown from "../../assets/img/down-arrow.svg";
import arrowUp from "../../assets/img/up-arrow.svg";

const Filter = ({
  list,
  name,
  visible,
  setVisible,
  onChange,
  checked,
  reset,
}: any) => {
  return (
    <div className="filter">
      <div className="filter-accordion" onClick={() => setVisible(!visible)}>
        <h2>{name}</h2>
        {!visible ? (
          <img src={arrowDown} alt="arrow-down" />
        ) : (
          <img src={arrowUp} alt="arrow-up" />
        )}
      </div>
      {visible &&
        list.map((item: any, index: number) => (
          <RadioButton
            key={index}
            title={item.title ? item.title : item.name}
            characters={item.characters ? item.characters : item.people}
            name="film-filter"
            onChange={onChange}
            checked={checked}
          />
        ))}
      {checked && (
        <button type="reset" onClick={reset}>
          Clear filter
        </button>
      )}
    </div>
  );
};

export default Filter;
