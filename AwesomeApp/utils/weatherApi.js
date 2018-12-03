const rootURL =
  "https://api.openweathermap.org/data/2.5/weather?appid=72049c73cf2cd9a385fd3a7b281284c7";

export const fetchWeather = (lat, lon) => {
  const url = rootURL + "&lat=" + lat + "&lon=" + lon;

  return fetch(url)
    .then(res => res.json())
    .then(json => ({
      temp: json.main.temp,
      weather: json.weather[0].main
    }));
};
