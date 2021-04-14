const io = require("../servers").io;
const orb = require("./classes/orb");
let orbs = [];
function initGame() {
  for (let i = 0; i < settings.defaultOrbs; i++) {
    orbs.push(new Orb(settings));
  }
}

module.exports = io;
