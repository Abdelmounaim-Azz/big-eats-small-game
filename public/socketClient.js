let socket = io.connect("http://localhost:5000");
socket.on("initOrbs", (data) => {
  orbs = data.orbs;
});
