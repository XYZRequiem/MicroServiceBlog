const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

// Local Vars
const PORT = 4005;

const app = express();
app.use(bodyParser.json());

const events = [];

const serviceURLS = [
  "http://posts-clusterip-srv:4000/events",
  "http://comments-srv:4001/events",
  "http://query-srv:4002/events",
  "http://moderation-srv:4003/events",
];

app.post("/events", async (req, res) => {
  console.log("Event Received:", req.body.type);
  const event = req.body;

  events.push(event);
  serviceURLS.forEach((serviceURL) => {
    axios.post(serviceURL, event);
  });

  res.send({ status: "OK" });
});

app.get("/events", (req, res) => {
  res.send(events);
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
