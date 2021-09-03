<template>
    <div id="app">
        <Lobby />
    </div>
</template>

<script>
    import Lobby from './components/Lobby.vue'

    export default {
        name: 'App',
        components: {
            Lobby
        }
    }
</script>

<style>
    body {
        margin: 0;
        padding: 0;
    }
</style>
