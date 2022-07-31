const request = require("request");

const forecast = (lat, long, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=83f596c76c9493d0b6cab0f8f4cbb168&query=" +
    lat +
    "," +
    long +
    "&units=m";

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Can't connect to weather application", undefined);
    } else if (body.error) {
      callback("Can't find location", undefined);
    } else {
      const weatherDescription = body.current.weather_descriptions[0];
      const temperature = body.current.temperature;
      const feelsLike = body.current.feelslike;
      callback(
        undefined,
        `${weatherDescription}. It is currently ${temperature} degrees out. It feels like ${feelsLike} degrees out.`
      );
    }
  });
};

module.exports = forecast;
