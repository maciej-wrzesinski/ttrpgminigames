<template>
    <div>
        <div class="left-panel">
            <user
                v-for="user in users"
                :key="user.userID"
                :user="user"
                @select="onUserSelect(user)"
            />
        </div>
        <div class="right-panel">
            <game />
        </div>
    </div>
</template>

<script>
    import Game from "../components/Game";
    import User from "../components/User";
    import socket from "../socket";

    export default {
        name: "Lobby",
        components: { 
            Game,
            User,
        },
        data() {
            return {
                users: {},
                players: [],
            };
        },
        methods: {
            onUserSelect(user) {
                if(socket.id === user.userID) {
                    let playingUser = this.players.find(player => player === user);
                    if(playingUser){
                        this.players.splice(this.players.indexOf(playingUser), 1);
                    }
                    else {
                        this.players.push(user);
                    }
                    console.log(this.players);
                }
            },
        },
        created() {
            socket.on("connect", () => {
                socket.emit("room userlist");
            });

            socket.on("room userlist", (users) => {
                this.users = users;
            });
        },
        unmounted() {
            socket.off("connect");

            socket.off("room userlist");
        },
    };
</script>

<style scoped>
    .left-panel {
        background-color: blue;
        position: fixed;
        left: 0;
        top: 0;
        bottom: 0;
        width: 260px;
        overflow-x: hidden;
        color: white;
    }

    .center-panel {
        position: fixed;
        left: 0;
        top: 0;
        bottom: 0;
        width: 260px;
        overflow-x: hidden;
        background-color: #3f0e40;
        color: white;
    }

    .right-panel {
        margin-left: 260px;
    }
</style>