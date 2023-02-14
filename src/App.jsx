import { React } from 'react'
import { Routes, Route } from 'react-router-dom'

import { NavBar } from './components/NavBar'
import PodcastList from './components/PodcastList'
import { PodcastDetail } from './components/PodcastDetail'
import { EpisodeDetail } from './components/EpisodeDetail'

import './styles/app.scss'

export default function App() {
  return (
    <div className="content-page">
      <NavBar />
      <Routes>
        <Route path="/" element={<PodcastList />} />
        <Route path="/podcast/:id" element={<PodcastDetail />} />
        <Route
          path="/podcast/:id/episode/:episodeId"
          element={<EpisodeDetail />}
        />
      </Routes>
    </div>
  )
}
