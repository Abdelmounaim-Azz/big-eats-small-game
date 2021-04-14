const io = require("../servers").io;
const orb = require("./classes/orb");
let orbs = [];
initGame();
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
