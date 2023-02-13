/* Funnción que devuelve el tiempo en milisegundos convertido a formato hh:mm:ss */
export const convertMillisecondsToTime = milliseconds => {
  let seconds = milliseconds / 1000;
  let minutes = Math.floor(seconds / 60);
  seconds = Math.floor(seconds % 60);
  let hours = Math.floor(minutes / 60);
  minutes = minutes % 60;

  return `${hours}:${minutes}:${seconds}`;
};

/* Función que devuelve la fecha en formato dd/mm/yyyy */
export const convertDate = date => {
  return new Date(date).toLocaleDateString("es-ES", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  });
};