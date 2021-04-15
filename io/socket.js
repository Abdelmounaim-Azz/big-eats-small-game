const io = require("../servers").io;
const checkForOrbCollisions = require("./collisions").checkForOrbCollisions;
const checkForPlayerCollisions = require("./collisions")
  .checkForPlayerCollisions;
const Orb = require("./classes/orb");
const Player = require("./classes/Player");
const PlayerData = require("./classes/PlayerData");
const PlayerConfig = require("./classes/PlayerConfig");
let orbs = [];
let players = [];
let settings = {
  defaultOrbs: 5000,
  defaultSpeed: 6,
  defaultSize: 6,
  defaultZoom: 1.5,
  worldWidth: 5000,
  worldHeight: 5000,
};

initGame();

io.sockets.on("connect", (socket) => {
  let player = {};
  socket.on("init", (data) => {
    socket.join("game");
    let playerConfig = new PlayerConfig(settings);
    let playerData = new PlayerData(data.playerName, settings);
    player = new Player(socket.id, playerConfig, playerData);
    setInterval(() => {
      io.to("game").emit("tick", {
        players,
        playerX: player.playerData.locX,
        playerY: player.playerData.locY,
      });
    }, 33);
    socket.emit("initOrbs", {
      orbs,
    });
    players.push(playerData);
  });
  socket.on("tock", async (data) => {
    speed = player.playerConfig.speed;
    let xV = (player.playerConfig.xVector = data.xV);
    let yV = (player.playerConfig.yVector = data.yV);

    if (
      (player.playerData.locX < 5 && player.playerData.xV < 0) ||
      (player.playerData.locX > settings.worldWidth && xV > 0)
    ) {
      player.playerData.locY -= speed * yV;
    } else if (
      (player.playerData.locY < 5 && yV > 0) ||
      (player.playerData.locY > settings.worldHeight && yV < 0)
    ) {
      player.playerData.locX += speed * xV;
    } else {
      player.playerData.locX += speed * xV;
      player.playerData.locY -= speed * yV;
    }
    let orbEat = checkForOrbCollisions(
      player.playerData,
      player.playerConfig,
      orbs,
      settings
    ); //Returned value is orb index
    orbEat
      .then((data) => {
        const orbInfo = {
          orbIndex: data,
          newOrbGenerated: orbs[data],
        };
        io.sockets.emit("orbReplaced", orbInfo);
      })
      .catch(() => {});
  });
});
function initGame() {
  for (let i = 0; i < settings.defaultOrbs; i++) {
    orbs.push(new Orb(settings));
  }
}

module.exports = io;
