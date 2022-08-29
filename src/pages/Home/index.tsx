import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";

import Card from "../../components/Card";
import Filter from "../../components/Filter";

import "./Home.scss";

const Home = ({ characters, films, species }: any) => {
  const [filmFilter, setFilmFilter] = useState<any>(null);
  const [filmsVisible, setFilmsVisible] = useState<boolean>(false);
  const [specieFilter, setSpecieFilter] = useState<any>(null);
  const [speciesVisible, setSpeciesVisible] = useState<boolean>(false);
  const [filmChecked, setFilmChecked] = useState<any>(null);
  const [specieChecked, setSpecieChecked] = useState<any>(null);
  const [isFiltering, setIsFiltering] = useState<boolean>(false);
  const [min, setMin] = useState<number>(8);
  const [max, setMax] = useState<number>(896);

  const minInput = useRef<any>();
  const maxInput = useRef<any>();

  const filmChange = (e: React.FormEvent<HTMLInputElement>) => {
    setFilmFilter(e.currentTarget.value.split(","));
    setFilmChecked(e.currentTarget.id);
  };

  const resetFilm = () => {
    setFilmChecked(null);
    setFilmFilter(null);
  };

  const specieChange = (e: React.FormEvent<HTMLInputElement>) => {
    setSpecieFilter(e.currentTarget.value.split(","));
    setSpecieChecked(e.currentTarget.id);
  };

  const resetSpecie = () => {
    setSpecieChecked(null);
    setSpecieFilter(null);
  };

  const minChange = () => {
    if (Number(minInput.current.value) > maxInput.current.min) {
      minInput.current.value = maxInput.current.min;
      minInput.current.max = minInput.current.value;
      setMin(+minInput.current.max);
    } else if (Number(minInput.current.value) < minInput.current.min) {
      minInput.current.value = minInput.current.min;
    } else {
      minInput.current.max = minInput.current.value;
      setMin(+minInput.current.max);
    }
  };

  const maxChange = () => {
    if (Number(maxInput.current.value) < minInput.current.max) {
      maxInput.current.value = minInput.current.max;
      maxInput.current.min = maxInput.current.value;
      setMax(+maxInput.current.min);
    } else if (Number(maxInput.current.value) > maxInput.current.max) {
      maxInput.current.value = maxInput.current.max;
    } else {
      maxInput.current.min = maxInput.current.value;
      setMax(+maxInput.current.min);
    }
  };

  return (
    <div className="wrapper">
      <div className="wrapper__filters">
        <Filter
          list={films}
          name="Films"
          visible={filmsVisible}
          setVisible={setFilmsVisible}
          onChange={filmChange}
          checked={filmChecked}
          reset={resetFilm}
        />
        <Filter
          list={species}
          name="Species"
          visible={speciesVisible}
          setVisible={setSpeciesVisible}
          onChange={specieChange}
          checked={specieChecked}
          reset={resetSpecie}
        />
        <div className="filter-years">
          <div className="filter-years-title">
            <h2>Years range</h2>
            <input
              type="checkbox"
              checked={isFiltering}
              onChange={() => {
                setIsFiltering(!isFiltering);
                minInput.current.readOnly = !minInput.current.readOnly;
                maxInput.current.readOnly = !maxInput.current.readOnly;
              }}
            />
          </div>
          <div className="filter-years-inputs">
            <input
              ref={minInput}
              type="number"
              name="years-range"
              min={8}
              max={8}
              defaultValue={8}
              readOnly
              onBlur={minChange}
            />
            <label>BBY</label>
            <span>—</span>
            <input
              ref={maxInput}
              type="number"
              name="years-range"
              min={896}
              max={896}
              defaultValue={896}
              readOnly
              onBlur={maxChange}
            />
            <label>BBY</label>
          </div>
        </div>
      </div>
      <div className="wrapper__cards">
        <div className="wrapper__cards-grid">
          {filmFilter || specieFilter || isFiltering
            ? characters
                .filter(
                  (item: any) =>
                    (filmFilter ? filmFilter.includes(item.url) : true) &&
                    (specieFilter ? specieFilter.includes(item.url) : true) &&
                    (isFiltering
                      ? characters
                          .filter(
                            (item: any) =>
                              min <= item.birth_year.split("BBY")[0] &&
                              item.birth_year.split("BBY")[0] <= max
                          )
                          .map((item: any) => item.url)
                          .includes(item.url)
                      : true)
                )
                .map((character: any, index: number) => (
                  <Link
                    key={index}
                    to={`/profile/${character.name
                      .toLowerCase()
                      .split(" ")
                      .join("-")}`}
                  >
                    <Card name={character.name} />
                  </Link>
                ))
            : characters.map((character: any, index: number) => (
                <Link
                  key={index}
                  to={`/profile/${character.name
                    .toLowerCase()
                    .split(" ")
                    .join("-")}`}
                >
                  <Card name={character.name} />
                </Link>
              ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
