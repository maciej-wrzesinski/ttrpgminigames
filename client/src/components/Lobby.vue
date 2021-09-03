<template><div>
        <div id="wrapper" v-if="typewindow == 'Lobby'">
            <div id="rooms">
                <div id="rooms-buttons">
                        <form @submit.prevent="roomCreate">
                            <input type="submit" value="Create room" />
                        </form>
                </div>
                <div id="rooms-room">
                    <div v-if="typeroom == 'None'">

                    </div>
                    <div class="centered-content" v-else-if="typeroom == 'CreateRoom'">
hello :)
                    </div>
                </div>
            </div>
            <div id="nav">
                <div id="players">
                    <li v-for="(user, index) in users" :key="index">
                        {{ user }}
                    </li>
                </div>
                <div id="chat">
                    <div id="chat-history">
                        <li v-for="(message, index) in messages" :key="index">
                            {{ message }}
                        </li>
                    </div>
                    <div id="chat-message">
                        <form @submit.prevent="sendMessage">
                            <input type="text" v-model="message" placeholder="Write something..." />
                            <input type="submit" value="Send" />
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <div id="wrapper" class="centered-content" v-else-if="typewindow == 'PickUsername'">

            <form @submit.prevent="setUsername">
                <input type="text" v-model="username" placeholder="Username..." />
                <input type="submit" value="Join" />
            </form>

        </div>
    </div>
</template>

<script src="/socket.io/socket.io.js"></script>
<script>
    let socket = null;
    import io from "socket.io-client";
    export default {
        name: 'Lobby',
        data() {
            return {
                socket: {},

                users: [],
                username: '',

                messages: [],
                message: '',

                typewindow: 'PickUsername',
                typeroom: 'None',
            }
        },
        created() {
            this.socket = io('http://localhost:3000');
            
            this.socket.on('message lobby', message => {
                this.messages.push(message);
            });
            
            this.socket.on('user list', users => {
                this.users = users;
            });
        },
        destroyed() {
            this.socket.off('user list');
            this.socket.off('message lobby');
        },
        methods: {
            setUsername() {
                this.socket.emit('user login', this.username);

                this.typewindow = 'Lobby';
            },
            sendMessage() {
                this.socket.emit('message lobby', this.username + ": " + this.message);

                this.message = '';
            },
            roomCreate() {
                this.typeroom = 'CreateRoom';
            },
        },
    }
</script>

<style scoped>
    #wrapper {
        background-color: cyan;
        display: flex;

        width: 100vw;
        height: 100vh;
    }

    #rooms {
        background-color: black;
        display: flex;
        flex-direction: column;

        width: 70vw;
        height: 100vh;
    }

    #nav {
        background-color: red;
        display: flex;
        flex-direction: column;

        width: 30vw;
        height: 100vh;
    }

    #players {
        background-color: green;
        display: flex;
        flex-direction: column;

        width: 30vw;
        height: 50vh;

        overflow: scroll;
    }

    #chat {
        background-color: blue;
        display: flex;
        flex-direction: column;

        width: 30vw;
        height: 50vh;
    }

    #chat-history {
        background-color: pink;
        width: 30vw;
        height: calc(50vh - 30px);

        overflow: scroll;
    }

    #chat-message {
        background-color: silver;
        width: 30vw;
        height: 30px;
    }
    
    #rooms-room {
        background-color: yellow;
        width: 70vw;
        height: calc(100vh - 30px);
    }

    #rooms-buttons {
        background-color: gray;
        width: 70vw;
        height: 30px;
    }

    .centered-content {
        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>
