const API_URL = 'https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json';

export async function getAllPodcasts() {
  try{
    const response = await fetch(API_URL);
    const data = await response.json();
    console.log("Consulta a API OK");
    return data.feed.entry;
  } catch (error) {
    console.log(error);
  }
}

export async function getPodcastById(id) {
  console.log("id", id);
  try{
    const response = await fetch(`https://itunes.apple.com/lookup?id=${id}`);
    const data = await response.json();
    console.log("Podcast ", data.results[0]);
    return data;
  } catch (error) {
    console.log(error);
  }
}