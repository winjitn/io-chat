var app = require("express")();
var http = require("http").createServer(app);
var io = require("socket.io")(http);

// app.get("/", function(req, res) {
//   res.sendFile(__dirname + "/index.html");
// });

var PORT = process.env.PORT || 5000;

var Room = "";

io.on("connection", function(socket) {
  if (Room !== "") {
    io.emit(Room, "a user connected");
  }
  socket.on("disconnect", function() {
    io.emit(Room, "a user disconnected");
  });
  socket.on("chat", function(room) {
    Room = room;
    socket.on(room, function(msg) {
      io.emit(room, msg);
    });
    io.emit("chat", "connected");
  });
});

http.listen(PORT, function() {
  console.log("listening on *:5000");
});
