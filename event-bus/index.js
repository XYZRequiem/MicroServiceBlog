const express = require("express");
const bodyParser = require("body-parser");
const { randomBytes } = require("crypto");
const axios = require("axios");

// Local Vars
const PORT = 4005;

const app = express();
app.use(bodyParser.json());

app.post("/events", async (req, res) => {
  console.log("Event Received:", req.body.type);
  const event = req.body;

  axios.post("http://localhost:4000/events", event);
  axios.post("http://localhost:4001/events", event);
  axios.post("http://localhost:4002/events", event);

  console.log(event);
  res.send({ status: "OK" });
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
