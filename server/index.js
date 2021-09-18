const httpServer = require("http").createServer();
const io = require("socket.io")(httpServer, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    },
});

io.on("connection", (socket) => {
    console.log(`User with ID: ${socket.id} connected`);
  
    socket.on("set_name", (data) => {
        socket.username = data;
        
        io.to(socket.roomname).emit("user_list", getUserList(socket.roomname));
    });

    socket.on("join_room", (data) => {
        socket.join(data);
        socket.roomname = data;
    });

    socket.on("send_message", (data) => {
        socket.to(data.room).emit("receive_message", data);
    });

    socket.on("disconnect", () => {
        io.to(socket.roomname).emit("user_list", getUserList(socket.roomname));
    });
});

const PORT = process.env.PORT || 4000;

httpServer.listen(PORT, () =>
    console.log(`server listening at http://localhost:${PORT}`)
);

let getUserList = roomname => {
    let users = [];
    for (let [id, localsocket] of io.of("/").sockets) {
        if(localsocket.roomname === roomname && id) {
            users.push({'username': localsocket.username, 'userID': id});
        }
    }
    return users;
}
