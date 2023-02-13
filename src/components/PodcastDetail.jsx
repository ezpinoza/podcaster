import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import * as API from "../services/podcasts";

export function PodcastDetail() {
  const { id } = useParams();
  const [podcast, setPodcast] = useState(null);

  const getLocalPodcasts = JSON.parse(localStorage.getItem("podcasts"));
  const filteredPodcast = getLocalPodcasts.filter(
    (item) => item.id.attributes["im:id"] === id
  );
  const selectedPodcast = filteredPodcast[0];

  /* Almacenamos en cliente los datos y volvemos a consultar si ha pasado más de 1 día */
  useEffect(() => {
    API.getPodcastById(id).then((data) => {
      setPodcast(data);
    });
  }, []);

  if (!podcast) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="content-podcast-detail">
      <div className="content-podcast-detail__info">
        <img src={selectedPodcast["im:image"][2].label} alt={selectedPodcast.title.label} />
        <hr />
        <h4>{selectedPodcast["im:name"].label}</h4>
        <span>by {selectedPodcast["im:artist"].label}</span>
        <hr />
        <h5>Description: </h5>
        <p>{selectedPodcast.summary.label}</p>
      </div>

      <p>{podcast.description}</p>
      <img src={podcast.image_url} alt={podcast.title} />
    </div>
  );
}
