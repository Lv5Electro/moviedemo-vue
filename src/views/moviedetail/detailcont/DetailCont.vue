<template>
    <div class="detail-cont">
        <div class="detail-bg">
            <img :src="movieImages[movie.mImage].src" alt="">
        </div>
        <div class="center-wrap">
            <h3 class="cont-title">{{movie.mName}}</h3>
            <div class="cont-img">
                <img :src="movieImages[movie.mImage].src" alt="">
            </div>
            <ul class="cont-info">
                <li>导演：{{movie.mDirector}}</li>
                <li>主演：<span style="display: inline" v-for="(actor, index) in movie.actors">{{actor.aName}}/</span></li>
                <li>类型：<span style="display: inline" v-for="(movieType, index) in movie.movieTypes">{{movieType.tName}}/</span></li>
                <li>热度：{{movie.mHot}}</li>
                <li>评分：{{movie.mGrade}}</li>
                <li>剧情介绍：{{movie.mProfile}}</li>
            </ul>
            <div class="cont-time">上映时间：{{movie.mScreenDate}}</div>
        </div>
    </div>
</template>

<script>
    import movieImages from '../../../assets/js/movieImages';


    export default {
        name: "DetailCont",
        data() {
            return {
                movie: this.$store.state.movie,
                movieImages: movieImages.movieImages,
            }
        },
        methods: {},

    }
</script>

<style scoped>
    .detail-cont {
        width: 100%;
        height: 100%;
    }

    .detail-cont .detail-bg {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        overflow: hidden;
    }

    .detail-cont .detail-bg img {
        width: 100%;
        height: 100%;
        position: absolute;
        z-index: -1;
        filter: blur(80px);
    }

    .center-wrap {
        height: 100%;
        width: 1150px;
        margin: 0 auto;
        color: #fff;
    }

    .center-wrap .cont-title {
        padding-bottom: 10px;
        font-size: 28px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.7);
    }


    .center-wrap .cont-img {
        width: 270px;
        height: 400px;
        margin-right: 80px;
        float: left;
    }

    .center-wrap .cont-info {
        width: 590px;
        float: left;
    }

    .center-wrap ul li {
        margin-bottom: 20px;
    }

    .center-wrap .cont-time {
        float: right;
    }


</style>