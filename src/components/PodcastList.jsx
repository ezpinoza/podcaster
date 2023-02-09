import React from "react";

export function PodcastList({ podcasts, filterText, onFilterTextChange }) {
  const handlePodcastClick = (id) => {
    console.log(`Podcast with id ${id} was clicked`);
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
