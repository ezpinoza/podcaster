import { useState, useEffect } from "react";

import * as API from "../services/podcasts";

export function PodcastList({ podcasts, filterText }) {
  const [podcastItem, setPodcastItem] = useState([]);

  const handlePodcastClick = (podcastId) => {
    console.log(`Se hizo clic en el podcast con id: ${podcastId}`);
    // Aquí se puede agregar la lógica necesaria para navegar a la vista con el detalle del podcast.
    API.getPodcastById(podcastId).then((data) => {
      setPodcastItem(data);
    });
  };

  return (
    <div className="podcasts-list">
      {podcasts
        .filter((podcast) =>
          podcast["im:name"].label.toLowerCase().includes(filterText.toLowerCase())
        )
        .map((podcast) => (
          <div
            className="podcasts-list__item"
            key={podcast.id.attributes["im:id"]}
            onClick={() => handlePodcastClick(podcast.id.attributes["im:id"])}
          >
            <img src={podcast["im:image"][2].label} alt={podcast.title.label} />
            <h3>{podcast["im:name"].label}</h3>
            <p>Author: {podcast["im:artist"].label}</p>
          </div>
        ))}
    </div>
  );
}
