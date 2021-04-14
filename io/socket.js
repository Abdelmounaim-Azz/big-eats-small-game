const io = require("../servers").io;
const Orb = require("./classes/orb");
const Player = require("./classes/player");
const PlayerPayload = require("./classes/playerPayload");
const PlayerConf = require("./classes/playerConf");
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
    let playerConf = new PlayerConf(settings);
    let playerPayload = new PlayerPayload(data.playerName, settings);
    player = new Player(socket.id, playerConf, playerPayload);

    socket.emit("initOrbs", {
      orbs,
    });
    players.push(playerPayload);
  });
  socket.on("tock", (data) => {
    speed = player.playerConf.speed;
    let xV = (player.playerConf.xVector = data.xV);
    let yV = (player.playerConf.yVector = data.yV);
    console.log(speed, xV, yV, player);

    if (
      (player.playerPayload.locX < 5 && player.playerPayload.xV < 0) ||
      (player.playerPayload.locX > 500 && xV > 0)
    ) {
      player.playerPayload.locY -= speed * yV;
    } else if (
      (player.playerPayload.locY < 5 && yV > 0) ||
      (player.playerPayload.locY > 500 && yV < 0)
    ) {
      player.playerPayload.locX += speed * xV;
    } else {
      player.playerPayload.locX += speed * xV;
      player.playerPayload.locY -= speed * yV;
    }
  });
});
function initGame() {
  for (let i = 0; i < settings.defaultOrbs; i++) {
    orbs.push(new Orb(settings));
  }
}

module.exports = io;
