import { getAllPodcasts, getPodcastById, getEpisodesByPoscastId } from '../services/podcasts.js'

describe('getAllPodcasts', () => {
  it('should return an array of podcasts', async () => {
    const podcasts = await getAllPodcasts()
    expect(typeof podcasts).toBe('object')
  })
})

describe('getPodcastById', () => {
  it('should return a podcast object', async () => {
    const id = 1460157002
    const podcast = await getPodcastById(id)
    expect(typeof podcast).toBe('object')
  })
})

describe('getEpisodesByPoscastId', () => {
  it('should return an array of episodes', async () => {
    const id = 1460157002
    const episodes = await getEpisodesByPoscastId(id)
    expect(typeof episodes).toBe('object')
  })
})
