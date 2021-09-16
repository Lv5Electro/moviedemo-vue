<template>
    <div class="home">
        <Header>
            <nav-bar></nav-bar>
        </Header>
        <router-view></router-view>
    </div>
</template>

<script>
    import NavBar from '../../components/common/navbar/NavBar'

    export default {
        name: 'Home',
        components: {
            NavBar
        },
    }
</script>

<style>

</style>
