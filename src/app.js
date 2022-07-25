const path = require("path");
const express = require("express");
const geocode = require("./utils/geocode.js");
const forecast = require("./utils/forecast.js");
const app = express();
const port = process.env.PORT || 3000;
const hbs = require("hbs");

// Paths
const publicDirectoryPath = path.join(__dirname, "..", "public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");
// Handlebars views
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);
// Static folder to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  if (!req.query.location) {
    // res.render("error", {
    //   title: "Where?",
    //   errorMessage: "Location Not Provided",
    //   name: "Vaibhav T",
    // });
    res.send({
      error: "Location Not Provided",
    });
    return;
  }
  geocode(req.query.location, (err, { latitude, longitude } = {}) => {
    if (err) {
      // res.render("error", {
      //   title: "Something went wrong!",
      //   errorMessage: err,
      //   name: "Vaibhav T",
      // });
      res.send({
        error: err,
      });
      console.log("error is " + err);
      return;
    }
    forecast(
      latitude,
      longitude,
      (
        err,
        { current, location: place, forecast = null, pictures = null } = {}
      ) => {
        if (err) {
          // res.render("error", {
          //   title: "Something went wrong!",
          //   errorMessage: err,
          //   name: "Vaibhav T",
          // });
          res.send({
            error: err,
          });
          console.log("error is " + err);
          return;
        }
        console.log("PLACE:", place, "\n", current);
        // res.render("index", {
        //   title: "Weather App",
        //   name: "Vaibhav T",
        //   data : JSON.stringify(current),
        // });
        res.send({
          location: place,
          weather: current,
          forecast,
          pictures,
        });
      }
    );
  });
});
app.get("/weather", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Vaibhav T",
  });
  console.log("homelander");
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "Vaibhav T",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    name: "Vaibhav T",
    helpText: "Page which lists all FAQ",
  });
});

app.get("/help/*", (req, res) => {
  res.render("error", {
    title: "404",
    errorMessage: "Cannot find the Help documentation",
    name: "Vaibhav T",
  });
});

app.get("*", (req, res) => {
  res.render("error", {
    title: "404",
    errorMessage: "Cannot find the page",
    name: "Vaibhav T",
  });
});

app.listen(port, () => {
  console.log("Server Started on port " + port);
});
