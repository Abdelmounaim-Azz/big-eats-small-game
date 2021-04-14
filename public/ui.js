let wHeight = $(window).height();
let wWidth = $(window).width();
let canvas = document.querySelector("#the-canvas");
let ctx = canvas.getContext("2d");
let player = {};
let orbs = [];
canvas.width = wWidth;
canvas.height = wHeight;
$(window).load(() => {
  $("#loginModal").modal("show");
});
$(".name-form").submit((event) => {
  event.preventDefault();
  player.name = document.querySelector("#name-input").value;
  $("#loginModal").modal("hide");
  $("#spawnModal").modal("show");
  document.querySelector(".player-name").innerHTML = player.name;
});
$(".start-game").click((event) => {
  $(".modal").modal("hide");
  $(".hiddenOnStart").removeAttr("hidden");
  draw();
});
