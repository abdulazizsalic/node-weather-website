const express = require("express");
const path = require("path");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
const publiDirectoryPath = path.join(__dirname, "../public");
const viewsFilePath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

app.use(express.static(publiDirectoryPath));

app.set("view engine", "hbs");
app.set("views", viewsFilePath);
hbs.registerPartials(partialsPath);

app.get("", (req, res) => {
  res.render("index", { title: "Weather App", name: "Abdul" });
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About me", name: "Abdul Aziz Salic" });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help page",
    message: "This is a sample message",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({ error: "Please provide an address" });
  }

  geocode(req.query.address, (error, { latitude, longitude, name } = {}) => {
    if (error) {
      return res.send({ error });
    }
    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({ error });
      }

      res.send({
        forecast: forecastData,
        location: name,
        address: req.query.address,
      });
    });
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    message: "Help article not found",
    name: "Abdul",
  });
});

app.get("*", (req, res) => {
  res.render("404", { title: "404", message: "Page not found", name: "Abdul" });
});

app.listen(3000, () => {
  console.log("Web server is running");
});
