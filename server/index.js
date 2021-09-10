const httpServer = require("http").createServer();
const io = require("socket.io")(httpServer, {
    cors: {
        origin: "http://localhost:8080",
    },
});

io.use((socket, next) => {
    const username = socket.handshake.auth.username;
    if (!username) {
        return next(new Error("invalid username"));
    }
    socket.username = username;
    next();
});

io.on("connection", (socket) => {
    
    socket.on("disconnect", () => {
        io.to(socket.rooms[1]).emit("room userlist", getUserList(socket));
        socket.leave(socket.rooms[1]);
    });

    socket.on("room join", (roomname) => {
        socket.join(roomname);
    });
    

    socket.on("room userlist", () => {
        io.to(socket.rooms[1]).emit("room userlist", getUserList(socket));
    });
});

const PORT = process.env.PORT || 3000;

httpServer.listen(PORT, () =>
    console.log(`server listening at http://localhost:${PORT}`)
);

let getUserList = socket => {
    let users = [];
    for (let [id, localsocket] of io.of("/").sockets) {
        if(localsocket.rooms[1] == socket.rooms[1] && id) {
            users.push(localsocket.username);
        }
    }
    return users;
}
