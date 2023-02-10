import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import { NavBar } from "./components/NavBar";
import { SearchBar } from "./components/SearchBar";
import { PodcastList } from "./components/PodcastList";

import * as API from "./services/podcasts";
import "./styles/app.scss";

export function App() {
  const [podcasts, setPodcasts] = useState([]);
  const [filteredPodcasts, setFilteredPodcasts] = useState([]);
  const [filterText, setFilterText] = useState("");

  /* Almacenamos en cliente los datos y volvemos a consultar si ha pasado más de 1 día */
  useEffect(() => {
    const lastFetchDate = localStorage.getItem("lastFetchDate");
    const currentDate = new Date();
    if (
      lastFetchDate &&
      currentDate - new Date(lastFetchDate) < 24 * 60 * 60 * 1000
    ) {
      setPodcasts(JSON.parse(localStorage.getItem("podcasts")));
    } else {
      API.getAllPodcasts().then((data) => {
        setPodcasts(data);
        localStorage.setItem("podcasts", JSON.stringify(data));
        localStorage.setItem("lastFetchDate", currentDate.toString());
      });
    }
  }, []);

  useEffect(() => {
    setFilteredPodcasts(
      podcasts.filter(
        (podcast) =>
          podcast["im:artist"].label.toLowerCase().includes(filterText) ||
          podcast["im:name"].label.toLowerCase().includes(filterText)
      )
    );
  }, [filterText, podcasts]);

  console.log(podcasts);
  return (
    <div className="content-page">
      <NavBar />
      <SearchBar
        filterText={filterText}
        setFilterText={setFilterText}
        filteredPodcasts={filteredPodcasts}
      />
      <Routes>
        <Route
          path="/"
          element={
            <PodcastList podcasts={filteredPodcasts} filterText={filterText} />
          }
        />
      </Routes>
    </div>
  );
}
