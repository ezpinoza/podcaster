import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

export function EpisodeDetail() {
  const { id, episodeId } = useParams();

  const getLocalEpisode = JSON.parse(localStorage.getItem(`episodes-${id}`));
  const filteredEpisode = getLocalEpisode.find(
    (episode) => episode.trackId === parseInt(episodeId)
  );

  const getLocalPodcasts = JSON.parse(localStorage.getItem("podcasts"));
  const filteredPodcast = getLocalPodcasts.filter(
    (item) => item.id.attributes["im:id"] === id
  );
  const selectedPodcast = filteredPodcast[0];

  return (
    <div className="content-podcast-detail">
      <div className="content-podcast-detail__info">
        <Link className="content-podcast-detail__info__img" to={`/podcast/${id}`}><img src={selectedPodcast["im:image"][2].label} alt={selectedPodcast.title.label} /></Link>
        <hr />
        <Link to={`/podcast/${id}`}><h4>{selectedPodcast["im:name"].label}</h4></Link>
        <span>by <Link to={`/podcast/${id}`}>{selectedPodcast["im:artist"].label}</Link></span>
        <hr />
        <h5>Description: </h5>
        <p>{selectedPodcast.summary.label}</p>
      </div>
      <div className="content-episodes-detail">
        
      </div>
    </div>
  );
}