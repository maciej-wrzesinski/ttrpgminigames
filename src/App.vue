<template>
    <div id="app">
        <select-roomname v-if="!roomnameAlreadySelected" @input="onRoomnameSelection" />
        <select-username v-else-if="!usernameAlreadySelected" @input="onUsernameSelection" />
        <game v-else />
    </div>
</template>

<script>
    import SelectUsername from "./components/SelectUsername";
    import SelectRoomname from "./components/SelectRoomname";
    import Game from "./components/Game";
    import socket from "./socket";

    export default {
        name: "App",
        components: {
            Game,
            SelectUsername,
            SelectRoomname,
        },
        data() {
            return {
                usernameAlreadySelected: false,
                roomnameAlreadySelected: false,
            };
        },
        methods: {
            onUsernameSelection(username) {
                this.usernameAlreadySelected = true;
                socket.auth = { username };
                socket.connect();
            },
            onRoomnameSelection(roomname) {
                this.roomnameAlreadySelected = true;
                socket.room = { roomname };
                window.history.pushState("", "", '/' + roomname);
                socket.emit("room join", roomname);
            },
        },
        created() {
            let uri = window.location.href.split('/');
            let roomname = uri[3];
            if(roomname.length > 2) {
                this.roomnameAlreadySelected = true;
                socket.emit("room join", roomname);
            }

            socket.on("connect_error", (err) => {
                if (err.message === "invalid username") {
                    this.usernameAlreadySelected = false;
                }
            });
        },
        unmounted() {
            socket.off("connect_error");
        },
    };
</script>

<style>
    body {
        margin: 0;
    }
</style>
