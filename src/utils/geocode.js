const request = require("request");

const geocode = (location, callback) => {
  const url =
    "http://api.positionstack.com/v1/forward?access_key=cee7023ffe4d1034704775d1f7c9315f&query=" +
    location +
    "&limit=1";

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Can't connect to weather application", undefined);
    } else if (body.error) {
      callback("Can't find location", undefined);
    } else {
      const lat = body.data[0].latitude;
      const long = body.data[0].longitude;
      const name = body.data[0].name;
      const data = { latitude: lat, longitude: long, name };
      callback(undefined, data);
    }
  });
};

module.exports = geocode;
