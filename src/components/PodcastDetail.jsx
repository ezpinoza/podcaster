import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

import * as API from "../services/podcasts";
import { convertMillisecondsToTime, convertDate } from "../utils/utils";

export function PodcastDetail() {
  const { id } = useParams();
  const [episodes, setEpisodes] = useState(null);

  const getLocalPodcasts = JSON.parse(localStorage.getItem("podcasts"));
  const filteredPodcast = getLocalPodcasts.filter(
    (item) => item.id.attributes["im:id"] === id
  );
  const selectedPodcast = filteredPodcast[0];

  useEffect(() => {
    const lastFetchedDate = localStorage.getItem(`lastFetchedDate-${id}`);
    const now = new Date();
    const oneDayInMilliseconds = 24 * 60 * 60 * 1000;

    if (!lastFetchedDate || now - new Date(lastFetchedDate) > oneDayInMilliseconds) {
      API.getEpisodesByPoscastId(id).then((data) => {
        setEpisodes(data);
        localStorage.setItem(`lastFetchedDate-${id}`, now);
      });
    } else {
      setEpisodes(JSON.parse(localStorage.getItem(`episodes-${id}`)));
    }
  }, []);

  useEffect(() => {
    if (episodes) {
      localStorage.setItem(`episodes-${id}`, JSON.stringify(episodes));
    }
  }, [episodes]);

  if (!episodes) {
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
      <div className="content-episodes-list">
        <div className="content-episodes-list__header">
          <h4>Episodes: {episodes.filter(episode => episode.wrapperType === "podcastEpisode").length}</h4>
        </div>
        <div className="content-episodes-list__body">
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Date</th>
                <th>Duration</th>
              </tr>
            </thead>
            <tbody>
              {episodes.filter(episode => episode.wrapperType === "podcastEpisode").map((episode, index) => (
                <tr key={episode.trackId} className={index % 2 === 0 ? "odd" : ""}>
                  <td><Link to={`/podcast/${id}/episode/${episode.trackId}`}>{episode.trackName}</Link></td>
                  <td>{convertDate(episode.releaseDate)}</td>
                  <td>{convertMillisecondsToTime(episode.trackTimeMillis)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
