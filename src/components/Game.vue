<template>
    <div>
        GameComponent
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

</style>