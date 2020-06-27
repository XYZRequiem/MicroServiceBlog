const express = require("express");
const bodyParser = require("body-parser");
const { randomBytes } = require("crypto");
const cors = require("cors");
const axios = require("axios");

// Local Vars
const PORT = 4000;

// init app
const app = express();
app.use(bodyParser.json());
app.use(cors());

// temp data store
const posts = {};
const eventBusURL = "http://event-bus-srv:4005/events";

// Post Endpoints
app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/posts/create", async (req, res) => {
  const id = randomBytes(4).toString("hex");

  const { title } = req.body;

  const post = { id, title };
  posts[id] = post;

  await axios.post(eventBusURL, {
    type: "PostCreated",
    data: post,
  });

  res.status(201).send(post);
});

// Event endpoints
app.post("/events", async (req, res) => {
  console.log("Received Event:", req.body.type);

  res.send({});
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
