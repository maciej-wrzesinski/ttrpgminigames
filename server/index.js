const httpServer = require("http").createServer();
const io = require("socket.io")(httpServer, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    },
});

io.on("connection", socket => {
    socket.on("set_name", username => {
        socket.username = username;
        io.to(socket.roomname).emit("user_list", getUserList(socket.roomname));
    });

    socket.on("join_room", roomname => {
        socket.roomname = roomname;
        socket.join(roomname);
    });

    socket.on("send_message", messagedata => io.to(socket.roomname).emit("receive_message", {id: socket.id, timestamp: Date.now(), username: socket.username, content: messagedata }));

    socket.on("disconnect", () => io.to(socket.roomname).emit("user_list", getUserList(socket.roomname)));
});

const PORT = process.env.PORT || 4000;

httpServer.listen(PORT);

let getUserList = roomname => {
    let users = [];
    for (let [id, localsocket] of io.of("/").sockets) {
        if(localsocket.roomname === roomname && id) {
            users.push({'username': localsocket.username, 'userID': id});
        }
    }
    return users;
}
