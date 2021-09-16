<template>
    <div class="movie-list">
        <center-wrap></center-wrap>
        <process-wrap></process-wrap>
    </div>
</template>

<script>
    import CenterWrap from './centerwrap/CenterWrap'
    import ProcessWrap from './processwrap/ProcessWrap'


    export default {
        name: 'Home',
        components: {
            CenterWrap,
            ProcessWrap,
        },

    }
</script>

<style scoped>
    .movie-list {
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin-top: 200px;
    }
</style>