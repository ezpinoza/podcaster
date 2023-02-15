import { React } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import { convertMillisecondsToTime, convertDate } from '../utils/utils'

export default function EpisodesList({ episodes, idPodcast }) {
  return (
    <div className="content-episodes-list">
      <div className="content-episodes-list__header">
        <h4>
          Episodes:{' '}
          {
            episodes.filter(
              (episode) => episode.wrapperType === 'podcastEpisode'
            ).length
          }
        </h4>
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
            {episodes
              .filter((episode) => episode.wrapperType === 'podcastEpisode')
              .map((episode, index) => (
                <tr
                  key={episode.trackId}
                  className={index % 2 === 0 ? 'odd' : ''}
                >
                  <td>
                    <Link
                      to={`/podcast/${idPodcast}/episode/${episode.trackId}`}
                    >
                      {episode.trackName}
                    </Link>
                  </td>
                  <td>{convertDate(episode.releaseDate)}</td>
                  <td>{convertMillisecondsToTime(episode.trackTimeMillis)}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

EpisodesList.propTypes = {
  episodes: PropTypes.arrayOf(
    PropTypes.shape({
      wrapperType: PropTypes.string.isRequired,
      trackId: PropTypes.number.isRequired,
      trackName: PropTypes.string.isRequired,
      releaseDate: PropTypes.string.isRequired,
      trackTimeMillis: PropTypes.number.isRequired,
    })
  ).isRequired,
  idPodcast: PropTypes.string.isRequired,
}
