const io = require("../servers").io;
const Orb = require("./classes/orb");
let orbs = [];
initGame();
let settings = {
  defaultOrbs: 50,
  worldWidth: 500,
};

io.sockets.on("connect", (socket) => {
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
