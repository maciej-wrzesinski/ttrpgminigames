const httpServer = require("http").createServer();
const io = require("socket.io")(httpServer, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    },
});

io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`);
  
    socket.on("join_room", (data) => {
      socket.join(data);
      console.log(`User with ID: ${socket.id} joined room: ${data}`);
    });
  
    socket.on("send_message", (data) => {
      socket.to(data.room).emit("receive_message", data);
    });
  
    socket.on("disconnect", () => {
      console.log("User Disconnected", socket.id);
    });
  });

const PORT = process.env.PORT || 4000;

httpServer.listen(PORT, () =>
    console.log(`server listening at http://localhost:${PORT}`)
);

let getUserList = socket => {
    let users = [];
    let roomname = Array.from(socket.rooms)[1];
    for (let [id, localsocket] of io.of("/").sockets) {
        let localroomname = Array.from(localsocket.rooms)[1];
        if(localroomname === roomname && id) {
            users.push({'username': localsocket.username, 'userID': id});
        }
    }
    return users;
}
