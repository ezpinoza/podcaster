import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { SearchBar } from "./SearchBar";

import * as API from "../services/podcasts";

export function PodcastList() {
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

  return (
    <>
      <SearchBar
        filterText={filterText}
        setFilterText={setFilterText}
        filteredPodcasts={filteredPodcasts}
      />
      <div className="podcasts-list">
        {filteredPodcasts.map((podcast) => (
          <div
            className="podcasts-list__item"
            key={podcast.id.attributes["im:id"]}
          >
            <Link to={`/podcast/${podcast.id.attributes["im:id"]}`}>
              <img
                src={podcast["im:image"][2].label}
                alt={podcast.title.label}
              />
              <h3>{podcast["im:name"].label}</h3>
              <p>Author: {podcast["im:artist"].label}</p>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}
