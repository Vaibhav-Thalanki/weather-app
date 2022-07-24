const request = require("postman-request");

const geocode = (location, callback) => {
  const url =
    "http://api.positionstack.com/v1/forward?access_key=d2fa032db5ffa06fe57730e894359b75&query=" +
    encodeURIComponent(location);
  request({ url, json: true }, (error, response, {data}={}) => {
    if (error) {
      callback("Unable to connect to api.positionstack.com", undefined);
    } else if (!data || data.length == 0) {
      callback("Search Result not found. Try another search", undefined);
    } else {
      callback(undefined, {
        latitude: data[0].latitude,
        longitude: data[0].longitude,
        location: data[0].label,
      });
    }
  });
};

module.exports = geocode;
