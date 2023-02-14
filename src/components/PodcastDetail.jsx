import { useState, useEffect, React } from 'react'
import { useParams } from 'react-router-dom'

import * as API from '../services/podcasts'
import { EpisodesList } from './EpisodesList'
import { PodcastInfo } from './PodcastInfo'

export function PodcastDetail() {
  const { id } = useParams()
  const [episodes, setEpisodes] = useState(null)

  useEffect(() => {
    const lastFetchedDate = localStorage.getItem(`lastFetchedDate-${id}`)
    const now = new Date()
    const oneDayInMilliseconds = 24 * 60 * 60 * 1000

    if (
      !lastFetchedDate ||
      now - new Date(lastFetchedDate) > oneDayInMilliseconds
    ) {
      API.getEpisodesByPoscastId(id).then((data) => {
        setEpisodes(data)
        localStorage.setItem(`lastFetchedDate-${id}`, now)
      })
    } else {
      setEpisodes(JSON.parse(localStorage.getItem(`episodes-${id}`)))
    }
  }, [])

  useEffect(() => {
    if (episodes) {
      localStorage.setItem(`episodes-${id}`, JSON.stringify(episodes))
    }
  }, [episodes])

  if (!episodes) {
    return <h1>Loading...</h1>
  }
  return (
    <div className="content-podcast-detail">
      <PodcastInfo podcastId={id} />
      <EpisodesList episodes={episodes} idPodcast={id} />
    </div>
  )
}
