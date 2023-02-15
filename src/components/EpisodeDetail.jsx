import { useState, useEffect, React } from 'react'
import { useParams } from 'react-router-dom'

import * as API from '../services/podcasts'

import PodcastInfo from './PodcastInfo'

export default function EpisodeDetail() {
  const { id, episodeId } = useParams()
  
  const [isLoading, setIsLoading] = useState(true)
  const [episodes, setEpisodes] = useState(null)

  const lastFetchDate = localStorage.getItem('lastFetchDate')
  const lastFetchedDate = localStorage.getItem(`lastFetchedDate-${id}`)
  const now = new Date()
  const oneDayInMilliseconds = 24 * 60 * 60 * 1000

  useEffect(() => {
    // Comprobamos si están guardados en localStorage el los podcasts y la última vez que se guardaron.
    if (!lastFetchDate || now - Date(lastFetchDate) > oneDayInMilliseconds) {
      API.getAllPodcasts().then((data) => {
        localStorage.setItem('podcasts', JSON.stringify(data))
        localStorage.setItem('lastFetchDate', now.toString())
      })
    }

    // Comprobamos si están guardados en localStorage el los episodios del podcast y la última vez que se guardaron.
    if (!lastFetchedDate || now - new Date(lastFetchedDate) > oneDayInMilliseconds) {
      API.getEpisodesByPoscastId(id).then((dataEpisodes) => {
        localStorage.setItem(`lastFetchedDate-${id}`, now)
        localStorage.setItem(`episodes-${id}`, JSON.stringify(dataEpisodes))
        setEpisodes(dataEpisodes)
        setIsLoading(false)
      })
    } else {
      setEpisodes(JSON.parse(localStorage.getItem(`episodes-${id}`)))
      setIsLoading(false)
    }
  }, [id])

  if (isLoading || !episodes) {
    return <h1>Loading...</h1>
  }

  const filteredEpisode = episodes.find(
    (episode) => episode.trackId === parseInt(episodeId)
  )

  console.log('Filtered episode', filteredEpisode);

  return (
    <div className="content-podcast-detail">
      <PodcastInfo podcastId={id} showLink />
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
  )
}
