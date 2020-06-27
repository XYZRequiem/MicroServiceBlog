const express = require("express");
const bodyParser = require("body-parser");
const { randomBytes } = require("crypto");
const cors = require("cors");
const axios = require("axios");

// Local Vars
const PORT = 4001;

// init app
const app = express();
app.use(bodyParser.json());
app.use(cors());

// temp data store
const commentsByPostId = {};

// Comment Endpoints
app.get("/posts/:id/comments", (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});

app.post("/posts/:id/comments", async (req, res) => {
  const postId = req.params.id;
  const commentId = randomBytes(4).toString("hex");
  const { content } = req.body;

  const comments = commentsByPostId[postId] || [];
  const comment = { id: commentId, content, postId, status: "pending" };
  comments.push(comment);
  commentsByPostId[postId] = comments;

  await axios.post("http://event-bus-srv:4005/events", {
    type: "CommentCreated",
    data: comment,
  });

  res.status(201).send(comments);
});

// Event endpoints
app.post("/events", async (req, res) => {
  console.log("Received Event:", req.body.type);
  const { type, data } = req.body;

  if (type === "CommentModerated") {
    const { postId, id, status } = data;
    const comments = commentsByPostId[postId];

    const comment = comments.find((comment) => {
      return comment.id === id;
    });
    comment.status = status;

    axios.post("http://event-bus-srv:4005/events", {
      type: "CommentUpdated",
      data: comment,
    });
  }

  res.send({});
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
