import { useState, useEffect } from "react";
import * as API from "./services/podcasts";
import "./styles/app.scss";
import { PodcastList } from "./components/PodcastList";

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

  const handlePodcastClick = (podcast) => {
    console.log(`Se hizo clic en el podcast: ${podcast["im:name"].label}`);
    // Aquí se puede agregar la lógica necesaria para navegar a la vista con el detalle del podcast.
  };

  console.log(podcasts);
  return (
    <div className="content-page">
      <div className="navbar">
        <h1>Podcaster</h1>
      </div>
      <div className="searchbar">
        <span>{filteredPodcasts.length}</span>
        <input
          type="text"
          value={filterText}
          placeholder="Filter podcasts..."
          onChange={(e) => setFilterText(e.target.value)}
        />
      </div>
      {podcasts.length === 0 ? (
        <p>Cargando podcasts...</p>
      ) : (
        <PodcastList
          podcasts={filteredPodcasts}
          filterText={filterText}
          onPodcastClick={handlePodcastClick}
        />
      )}
    </div>
  );
}
