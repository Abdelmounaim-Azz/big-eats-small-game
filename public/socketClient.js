let socket = io.connect("http://localhost:5000");
function init() {
  draw();
  socket.emit("init", {
    playerName: player.name,
  });
}
socket.on("initOrbs", (data) => {
  orbs = data.orbs;
});
