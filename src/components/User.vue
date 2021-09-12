<template>
    <div :class="{ user: userReady }" @click="onClick()">
        {{ user.username }}
    </div>
</template>

<script>
    import socket from "../socket";

    export default {
        name: "User",
        components: { 
        },
        props: {
            user: Object,
        },
        data() {
            return {
                userReady: false,
            };
        },
        methods: {
            onClick() {
                if(socket.id === this.user.userID) {
                    this.userReady = !this.userReady;
                    this.$emit("select");
                }
            },
        },
        created() {
        },
        unmounted() {
        },
    };
</script>

<style scoped>
    .user {
        background: black;
    }
</style>