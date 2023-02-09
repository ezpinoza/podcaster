import { useState, useEffect } from "react";
import * as API from "./services/podcasts";

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
    <div>
      <h1>Podcasts</h1>
      <input
        type="text"
        value={filterText}
        onChange={(e) => setFilterText(e.target.value.toLowerCase())}
      />
      {podcasts.length === 0 ? (
        <p>Cargando podcasts...</p>
      ) : (
        <ul>
          {filteredPodcasts.map((podcast) => (
            <li key={podcast.id.attributes["im:id"]}>
              {podcast["im:artist"].label} - {podcast["im:name"].label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
