<template>
    <div class="tab-movie-list">
        <div class="movie-card-wrap" v-for="(item, index) in $store.state.movies" :key="item.id">
            <a class="movie-card" @click="clickDetail(item)" @mouseenter="mouseenterImg(index)"
               @mouseleave="mouseleave(index)">
                <div class="movie-card-img">
                    <img :src="movieImages[item.mImage].src" alt="">
                </div>
                <div class="movie-card-info">
                    <div class="movie-card-mask"></div>
                    <div class="movie-card-list">
                        <span>导演：{{item.mDirector}}</span>
                        <span>主演：<span style="display: inline"
                                       v-for="(actor, index) in item.actors">{{actor.aName}}/</span></span>
                        <span>类型：<span style="display: inline" v-for="(movieType, index) in item.movieTypes">{{movieType.tName}}/</span></span>
                        <span>热度：{{item.mHot}}</span>
                        <span>评分：{{item.mGrade}}</span>
                        <span>片长：{{item.mTime}}</span>
                    </div>
                </div>
            </a>
            <a class="movie-card-soon" href="">
                <span>{{item.mScreenDate}}</span>
                <span>{{item.mName}}</span>
            </a>
        </div>
    </div>
</template>

<script>
    import movieImages from '../../../assets/js/movieImages';

    export default {
        name: "tabmovielist",
        data() {
            return {
                // screen: this.$store.state.screen,
                movieImages: movieImages.movieImages,
            }
        },
        methods: {
            clickDetail(item) {
                this.$store.commit("getMovieId", item);
                console.log("进入了《" + item.mName + "》的详情页");
                this.$router.push("/movieDetail").catch(err => err);
            },
            mouseenterImg(index) {
                let mask = document.getElementsByClassName("movie-card-info")[index];
                mask.style.display = "block";
            },
            mouseleave(index) {
                let mask = document.getElementsByClassName("movie-card-info")[index];
                mask.style.display = "none";
            },

        },

    }
</script>

<style scoped>
    .tab-movie-list {
        height: 225px;
        margin-top: 40px;
    }

    .movie-card-wrap {
        width: 161px;
        height: 273px;
        float: left;
        position: relative;
        margin-right: 35px;
        margin-bottom: 35px;
        text-align: center;
    }

    .movie-card-wrap img {
        width: 160px;
        height: 224px;
    }

    .movie-card-wrap .movie-card-mask {
        position: absolute;
        top: 0;
        height: 225px;
        width: 100%;
        overflow: hidden;
        background: rgba(0, 0, 0, 0.65);
    }

    .movie-card-wrap .movie-card-info {
        z-index: 101;
        display: none;
        font-size: 14px;
        text-align: left;
    }

    .movie-card-wrap .movie-card-info:hover {
        cursor: pointer;
    }

    .movie-card-wrap .movie-card-info .movie-card-list {
        position: absolute;
        top: 0;
        width: 125px;
        padding-top: 30px;
        padding-left: 20px;
        color: #ffffff;
    }

    .movie-card-wrap .movie-card-info .movie-card-list span {
        line-height: 24px;
        display: block;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }

    .movie-card-wrap .movie-card-soon {
        position: absolute;
        display: block;
        bottom: -3px;
        height: 40px;
        width: 158px;
        padding: 5px 0;
        border: 1px solid #e5e5e5;
        text-align: center;
        color: #3e3e3e;
    }

    .movie-card-wrap .movie-card-soon span {
        display: block;
    }
</style>