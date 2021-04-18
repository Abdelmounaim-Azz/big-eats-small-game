let socket = io.connect("http://localhost:5000");
let colors = ["#264653", "#2a9d8f", "#e9c46a", "#f4a261", "#e76f51"];
let random_color = colors[Math.floor(Math.random() * colors.length)];
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
          <li class="leaderboard-player flex-player">
          <span id="color-player">#${curPlayer.rank}</span>
          <span id="color-player">${curPlayer.name}</span>
          <span id="color-player">#${curPlayer.score}</span>
        </li>
      `;
    $("#color-player").css("color", random_color);
  });
});

socket.on("playerKilled", (data) => {
  document.querySelector(
    "#game-message"
  ).innerHTML = `${data.died.name} absorbed by ${data.killedBy.name}`;
  $("#game-message").css({
    "background-color": "#00e6e6",
    opacity: 1,
  });
  $("#game-message").show();
  $("#game-message").fadeOut(5000);
});
