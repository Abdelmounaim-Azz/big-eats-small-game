let socket = io.connect("http://localhost:5000");
function init() {
  draw();
  socket.emit("init", {
    playerName: player.name,
  });
}
socket.on("initOrbs", (data) => {
  orbs = data.orbs;
  setInterval(() => {
    socket.emit("tock", {
      xV: player.xVector,
      yV: player.yVector,
    });
  }, 33);
});

socket.on("tick", (data) => {
  players = data.players;
});
