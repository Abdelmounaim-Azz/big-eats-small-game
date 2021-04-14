const io = require("../servers").io;
const Orb = require("./classes/orb");
const Player = require("./classes/player");
const PlayerPayload = require("./classes/playerPayload");
const PlayerConfig = require("./classes/playerConf");
let orbs = [];
let players = [];
let settings = {
  defaultOrbs: 50,
  defaultSpeed: 6,
  defaultSize: 6,
  defaultZoom: 1.5,
  worldWidth: 500,
  worldHeight: 500,
};

initGame();
//Run fnc every 33ms(30fps)
setInterval(() => {
  if (players.length > 0) {
    io.to("game").emit("tick", {
      players,
    });
  }
}, 33);
io.sockets.on("connect", (socket) => {
  let player = {};
  socket.on("init", (data) => {
    socket.join("game");
    let playerConfig = new PlayerConfig(settings);
    let playerPayload = new PlayerPayload(data.playerName, settings);
    player = new Player(socket.id, playerConfig, playerPayload);

    socket.emit("initOrbs", {
      orbs,
    });
    players.push(playerPayload);
  });
});
function initGame() {
  for (let i = 0; i < settings.defaultOrbs; i++) {
    orbs.push(new Orb(settings));
  }
}

module.exports = io;
