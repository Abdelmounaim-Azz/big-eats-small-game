const express = require("express");
const socketio = require("socket.io");
const helmet = require("helmet");
const app = express();
app.use(express.static(__dirname + "/public"));
app.use(helmet());
const server = app.listen(5000, () => {
  console.log("App listening on port 5000!");
});

const io = socketio(server);

module.exports = {
  app,
  io,
};
