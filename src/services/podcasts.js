const API_URL =
  'https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json'

export async function getAllPodcasts() {
  try {
    const response = await fetch(API_URL)
    const data = await response.json()
    console.log('Consulta a API OK')
    return data.feed.entry
  } catch (error) {
    console.log(error)
    return null
  }
}

export async function getPodcastById(id) {
  console.log('id', id)
  try {
    const response = await fetch(
      `https://cors-anywhere.herokuapp.com/https://itunes.apple.com/lookup?id=${id}`
    )
    const data = await response.json()
    console.log('Podcast: ', data.results[0])
    return data.results[0]
  } catch (error) {
    console.log(error)
    return null
  }
}

export async function getEpisodesByPoscastId(id) {
  console.log('id', id)
  try {
    const response = await fetch(
      `https://itunes.apple.com/lookup?id=${id}&country=US&media=podcast&entity=podcastEpisode&limit=200`
    )
    const data = await response.json()
    console.log('Episodes ', data)
    return data.results
  } catch (error) {
    console.log(error)
    return null
  }
}
