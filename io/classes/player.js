class Player {
  constructor(socketId, playerConf, playerPayload) {
    this.socketId = socketId;
    this.playerConf = playerConf;
    this.playerPayload = playerPayload;
  }
}

module.exports = Player;
