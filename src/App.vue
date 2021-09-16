<template>
    <div id="app">
        <nav-bar></nav-bar>
        <router-view/>
    </div>
</template>

<script>
    import NavBar from './components/common/navbar/NavBar'

    export default {
        name: 'App',
        components: {
            NavBar
        },
        methods: {},
        created() {
            if (sessionStorage.getItem("store")) {
                this.$store.replaceState(Object.assign({}, this.$store.state, JSON.parse(sessionStorage.getItem("store"))))
            }

            window.addEventListener("beforeunload", () => {
                sessionStorage.setItem("store", JSON.stringify(this.$store.state))
            })
        }
    }
</script>

<style>
    @import "assets/css/base.css";
</style>
