let socket = io.connect("http://localhost:5000");
let colors = ["#d62828", "#f77f00", "#bc6c25", "#06d6a0"];
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
  let numPlayers = data[-1].numPlayers;
  document.querySelector(".leader-board").innerHTML = "";
  document.querySelector(".player-rank").innerHTML = "";
  data.board.forEach((curPlayer) => {
    document.querySelector(".leader-board").innerHTML += `
        <li class="leaderboard-player flex-p">
          <div>#${curPlayer.rank}</div>
          <div>${curPlayer.name}</div>
          <div>${curPlayer.score}</div>
        </li>
      `;
    $("#color-player").css("color", random_color);
    document.querySelector(
      ".player-rank"
    ).innerHTML += `${curPlayer.rank} of ${numPlayers}`;
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
