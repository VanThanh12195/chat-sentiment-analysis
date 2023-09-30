/* server.js */

console.clear();

const cors = require("cors");
const next = require("next");
const Pusher = require("pusher");
const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv").config();
const Sentiment = require("sentiment");

const dev = process.env.NODE_ENV !== "production";
const port = process.env.PORT || 4000;

const app = next({ dev });
const handler = app.getRequestHandler();
const sentiment = new Sentiment();

// Ensure that your pusher credentials are properly set in the .env file
// Using the specified variables
// const pusher = new Pusher({
//   appId: process.env.PUSHER_APP_ID,
//   key: process.env.PUSHER_APP_KEY,
//   secret: process.env.PUSHER_APP_SECRET,
//   cluster: process.env.PUSHER_APP_CLUSTER,
//   useTLS: true,
// });

const pusher = new Pusher({
  appId: "1676506",
  key: "6df44b3f6096c951d0af",
  secret: "b4b84f44c9a7bb6a8074",
  cluster: "us2",
  useTLS: true
});

app
  .prepare()
  .then(() => {
    const server = express();

    server.use(cors());
    server.use(bodyParser.json());
    server.use(bodyParser.urlencoded({ extended: true }));

    server.get("*", (req, res) => {
      return handler(req, res);
    });

    server.post("/chat", (req, res, next) => {

      pusher.trigger("chat-room", "new-message", {
        message: req.body.message,
      });
      res.send(req.body);
    });

    server.listen(port, (err) => {
      if (err) throw err;
      console.log(`> Ready on http://localhost:${port}`);
    });
  })
  .catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
  });
