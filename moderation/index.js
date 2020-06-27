const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const PORT = 4003;

const app = express();
app.use(bodyParser.json());

app.post("/events", async (req, res) => {
  console.log("Event Received:", req.body.type);
  const { type, data } = req.body;

  if (type === "CommentCreated") {
    const status = data.content.includes("orange") ? "rejected" : "approved";

    const comment = { ...data, status };

    await axios.post("http://event-bus-srv:4005/events", {
      type: "CommentModerated",
      data: comment,
    });
  }

  res.send({});
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
