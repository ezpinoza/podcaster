import { React } from 'react'
import { Link } from 'react-router-dom'

import PropTypes from 'prop-types'

export default function PodcastInfo({ podcastId, showLink }) {
  const getLocalPodcasts = JSON.parse(localStorage.getItem('podcasts'))
  const filteredPodcast = getLocalPodcasts.filter(
    (item) => item.id.attributes['im:id'] === podcastId
  )
  const selectedPodcast = filteredPodcast[0]

  return (
    <div className="content-podcast-detail__info">
      {showLink ? (
        <Link
          className="content-podcast-detail__info__img"
          to={`/podcast/${podcastId}`}
        >
          <img
            src={selectedPodcast['im:image'][2].label}
            alt={selectedPodcast.title.label}
          />
        </Link>
      ) : (
        <img
          src={selectedPodcast['im:image'][2].label}
          alt={selectedPodcast.title.label}
        />
      )}
      <hr />
      {showLink ? (
        <Link to={`/podcast/${podcastId}`}>
          <h4>{selectedPodcast['im:name'].label}</h4>
        </Link>
      ) : (
        <h4>{selectedPodcast['im:name'].label}</h4>
      )}
      {showLink ? (
        <Link to={`/podcast/${podcastId}`}>
          <span>by {selectedPodcast['im:artist'].label}</span>
        </Link>
      ) : (
        <span>by {selectedPodcast['im:artist'].label}</span>
      )}
      <hr />
      <h5>Description: </h5>
      <p>{selectedPodcast.summary.label}</p>
    </div>
  )
}

PodcastInfo.propTypes = {
  podcastId: PropTypes.string.isRequired,
  showLink: PropTypes.bool,
}

PodcastInfo.defaultProps = {
  showLink: false,
}
