<template>
    <div class="select-roomname">
        <form @submit.prevent="onSubmit">
            <input v-model="roomname" placeholder="Your roomname..." />
            <button :disabled="!isValid">Send</button>
        </form>
    </div>
</template>

<script>
    export default {
        name: "SelectRoomname",
        data() {
            return {
                roomname: "",
            };
        },
        computed: {
            isValid() {
                return this.roomname.length > 2 && this.roomname.match(/[A-Za-z0-9\-_]/g);
            },
        },
        methods: {
            onSubmit() {
                this.$emit("input", this.roomname);
            },
        },
    };
</script>

<style scoped>
    .select-roomname {
        width: 100vw;
        height: 100vh;
        
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>
