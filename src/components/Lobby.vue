<template>
    <div>
        <li v-for="user in users" :key="user">
            {{ user }}
        </li>
        {{ owner }}
        <game />
    </div>
</template>

<script>
    import Game from "../components/Game";
    import socket from "../socket";

    export default {
        name: "Lobby",
        components: { 
            Game,
        },
        data() {
            return {
                users: [],
                owner: '',
            };
        },
        methods: {
        },
        created() {
            socket.on("connect", () => {
                socket.emit("room userlist");
            });

            socket.on("room userlist", (users) => {
                this.users = users;
                if(this.owner === '') {
                    this.owner = users[0];
                }
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