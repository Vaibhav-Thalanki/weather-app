const request = require("postman-request");

const forecast = (lat, lon, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=73b17a44146e3bd578c9254a2b9c7f7f&query=" +
    encodeURIComponent(lat) +
    "," +
    encodeURIComponent(lon);
  request(
    { url, json: true },
    (err, resp, { error, location, current } = {}) => {
      if (err) {
        callback("Unable to connect to api.weatherstack.com", undefined);
      } else if (error) {
        callback(
          "Search Result not found. Try another search",
          undefined
        );
      } else {
        callback(undefined, {
          current: current,
          location:
            location.name + "," + location.region + "," + location.country,
          forecast:
            "It is " +
            current.temperature +
            " degrees but feels like " +
            current.feelslike +
            " in "+location.name + "," + location.region + "," + location.country+". Weather observed is " +
            current.weather_descriptions.join(", ") +
            ". Humidity is " +
            current.humidity +
            " and cloud cover is " +
            current.cloudcover +
            ".",
          pictures: current.weather_icons,
        });
      }
    }
  );
};

module.exports = forecast;
