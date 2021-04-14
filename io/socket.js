const io = require("../servers").io;
const Orb = require("./classes/orb");
const Player = require("./classes/Player");
const PlayerPayload = require("./classes/PlayerPayload");
const PlayerConfig = require("./classes/PlayerConfig");
let orbs = [];
let settings = {
  defaultOrbs: 50,
  worldWidth: 500,
};

initGame();

io.sockets.on("connect", (socket) => {
  let playerConfig = new PlayerConfig(settings);
  let playerPayload = new PlayerPayload(null, settings);
  let player = new Player(socket.id, playerConfig, playerPayload);
  socket.emit("initOrbs", {
    orbs,
  });
});
function initGame() {
  for (let i = 0; i < settings.defaultOrbs; i++) {
    orbs.push(new Orb(settings));
  }
}

module.exports = io;
