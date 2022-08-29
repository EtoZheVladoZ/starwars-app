import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";

import Home from "./pages/Home";
import Profile from "./pages/Profile";

const charactersUrls = Array.from(Array(9).keys()).map(
  (index) => `https://swapi.dev/api/people/?page=${index + 1}`
);

const speciesUrls = Array.from(Array(4).keys()).map(
  (index) => `https://swapi.dev/api/species/?page=${index + 1}`
);

const starshipsUrls = Array.from(Array(4).keys()).map(
  (index) => `https://swapi.dev/api/starships/?page=${index + 1}`
);

function App() {
  const [characters, setCharacters] = useState<any>(null);
  const [films, setFilms] = useState<any>(null);
  const [species, setSpecies] = useState<any>(null);
  const [starships, setStarships] = useState<any>(null);

  useEffect(() => {
    const localCharacters = localStorage.getItem("characters");
    const localFilms = localStorage.getItem("films");
    const localSpecies = localStorage.getItem("species");
    const localStarships = localStorage.getItem("starships");

    if (localCharacters) {
      setCharacters(JSON.parse(localCharacters));
    } else {
      axios.all(charactersUrls.map((url) => axios.get(url))).then(
        axios.spread((...allData) => {
          const mappingData = allData
            .map((item) => item.data.results)
            .flatMap((el) => el);
          setCharacters(mappingData);
          localStorage.setItem("characters", JSON.stringify(mappingData));
        })
      );
    }

    if (localFilms) {
      setFilms(JSON.parse(localFilms));
    } else {
      axios.get("https://swapi.dev/api/films/").then(({ data }) => {
        setFilms(data.results);
        localStorage.setItem("films", JSON.stringify(data.results));
      });
    }

    if (localSpecies) {
      setSpecies(JSON.parse(localSpecies));
    } else {
      axios.all(speciesUrls.map((url) => axios.get(url))).then(
        axios.spread((...allData) => {
          const mappingData = allData
            .map((item) => item.data.results)
            .flatMap((el) => el);
          setSpecies(mappingData);
          localStorage.setItem("species", JSON.stringify(mappingData));
        })
      );
    }

    if (localStarships) {
      setStarships(JSON.parse(localStarships));
    } else {
      axios.all(starshipsUrls.map((url) => axios.get(url))).then(
        axios.spread((...allData) => {
          const mappingData = allData
            .map((item) => item.data.results)
            .flatMap((el) => el);
          setStarships(mappingData);
          localStorage.setItem("starships", JSON.stringify(mappingData));
        })
      );
    }
  }, []);

  // console.log(characters)

  return (
    <>
      {characters && films && species && (
        <Routes>
          <Route
            path="/"
            element={
              <Home characters={characters} films={films} species={species} />
            }
          />
          <Route
            path="/profile/:characterName"
            element={
              <Profile
                characters={characters}
                films={films}
                species={species}
                starships={starships}
              />
            }
          />
        </Routes>
      )}
    </>
  );
}

export default App;
