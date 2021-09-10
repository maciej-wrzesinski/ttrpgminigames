<template>
    <div>
        <li v-for="user in users" :key="user">
            {{ user }}
        </li>
    </div>
</template>

<script>
    import socket from "../socket";

    export default {
        name: "Game",
        components: { 
        },
        data() {
            return {
                users: [],
            };
        },
        methods: {
        },
        created() {
            socket.on("connect", () => {
                console.log('connected');
                this.$emit("room userlist");
                socket.emit("room userlist");
            });

            socket.on("room userlist", (users) => {
                console.log('room userlist');
                console.log(users);
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