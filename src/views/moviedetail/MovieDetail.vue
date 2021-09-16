<template>
    <div class="movie-detail">
        <detail-cont></detail-cont>
        <div class="wrap-title"><span>选座购票</span></div>
        <seat-wrap v-if="isScreen"></seat-wrap>
        <div v-else style="font-size: 48px;text-align: center;">该电影暂未上映</div>
    </div>
</template>

<script>
    import DetailCont from './detailcont/DetailCont'
    import SeatWrap from './seatwrap/SeatWrap'

    export default {
        name: "MovieDetail",
        components: {
            DetailCont,
            SeatWrap,
        },
        methods: {},
        created() {

        },
        computed: {
            isScreen() {
                return this.$store.state.movie.mIsScreen === 1;
            },
        },
    }
</script>

<style scoped>
    .movie-detail {
        width: 100%;
        position: relative;
        height: 600px;
    }

    .wrap-title {
        margin-top: 50px;
        font-size: 28px;
        border-bottom: 1px solid #e5e5e5;
        text-align: center;
    }
</style>