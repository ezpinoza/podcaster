import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

import { PodcastInfo } from "./PodcastInfo";

export function EpisodeDetail() {
  const { id, episodeId } = useParams();

  const getLocalEpisode = JSON.parse(localStorage.getItem(`episodes-${id}`));
  const filteredEpisode = getLocalEpisode.find(
    (episode) => episode.trackId === parseInt(episodeId)
  );

  return (
    <div className="content-podcast-detail">
      <PodcastInfo podcastId={id} showLink={true} />
      <div className="content-episodes-detail">
        <h3>{filteredEpisode.trackName}</h3>
        <p>{filteredEpisode.description}</p>
        <hr />
        <audio controls>
          <source src={filteredEpisode.episodeUrl} type="audio/mpeg" />
          Tu navegador no soporta audio HTML5.
        </audio>
      </div>
    </div>
  );
}