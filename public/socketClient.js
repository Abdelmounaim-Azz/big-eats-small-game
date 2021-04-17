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
socket.on("orbReplaced", (data) => {
  orbs.splice(data.orbIndex, 1, data.newOrbGenerated);
});

socket.on("clientOnly", (data) => {
  (player.locX = data.playerX), (player.locY = data.playerY);
});
socket.on("updateBoard", (data) => {
  document.querySelector(".leader-board").innerHTML = "";
  data.forEach((curPlayer) => {
    document.querySelector(".leader-board").innerHTML += `
          <li class="leaderboard-player">${curPlayer.name} - ${curPlayer.score}</li>
      `;
  });
});
