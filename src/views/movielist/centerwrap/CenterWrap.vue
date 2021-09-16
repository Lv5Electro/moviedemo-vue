<template>
    <div class="center-wrap">
        <div class="tab-movie-title">
            <a v-for="(item, index) in titles" :key="item.id" class="tab-control-item"
               :class="{active: index === currentIndex}"
               @click="clickTitile(index)">{{item.title}}({{item.num}})</a>
            <a class="more" @click="clickMore" v-if="isLimit">展开&nbsp></a>
            <a class="more" @click="clickMore" v-else>收起&nbsp></a>
        </div>
        <tab-movie-list></tab-movie-list>
    </div>
</template>

<script>
    import TabMovieList from './TabMovieList'

    import {getIsScreenMovieCount} from "../../../network/home";
    import {getMovieByIsScreen} from "../../../network/home";


    export default {
        name: "CenterWrap",
        components: {
            TabMovieList,
        },
        data() {
            return {
                titles: [
                    {title: '正在热映', num: 0},
                    {title: '即将上映', num: 0}
                ],
                currentIndex: 0,
                isLimit: true,
            }
        },
        methods: {
            /**
             * 1.将对应的index传入到currentIndex中
             * 2.获取对应的电影数据
             * @param index 索引
             */
            clickTitile(index) {
                this.isLimit = true;
                this.currentIndex = index;
                if (index === 0) {
                    this.getMovieByIsScreen(1, this.isLimit);
                } else {
                    this.getMovieByIsScreen(0, this.isLimit);
                }
            },
            clickMore() {
                if (this.isLimit) {
                    this.isLimit = false;
                } else {
                    this.isLimit = true;
                }
                if (this.currentIndex === 0) {
                    this.getMovieByIsScreen(1, this.isLimit);
                } else {
                    this.getMovieByIsScreen(0, this.isLimit);
                }
            },

            /**
             * 请求参数相关
             */

            /**
             * 获取“正在热映”的电影数量
             * @param isScreen 是否上映
             */
            getScreenCount(isScreen) {
                getIsScreenMovieCount(isScreen).then(res => {
                    this.titles[0].num = res.data;
                    this.$store.commit("getScreenCount", res.data);
                })
            },
            /**
             * 获取“即将上映”的电影数量
             * @param isScreen 是否上映
             */
            getUnScreenCount(isScreen) {
                getIsScreenMovieCount(isScreen).then(res => {
                    this.titles[1].num = res.data;
                    this.$store.commit("getUnScreenCount", res.data);
                })
            },
            /**
             * 获取所有的电影数据
             * @param isScreen 是否上映
             * @param isLimit 是否限制
             */
            getMovieByIsScreen(isScreen, isLimit) {
                getMovieByIsScreen(isScreen, isLimit).then(res => {
                    this.$store.commit('getMovieByIsScreen', res.data.movies);
                })
            },
        },
        computed: {},
        created() {
            this.getScreenCount(1);
            this.getUnScreenCount(0);
            this.getMovieByIsScreen(1, true);
        }

    }
</script>

<style scoped>
    .center-wrap {
        flex: 1;
        width: 990px;
        height: 225px;
        margin: 0 auto;
    }

    .tab-movie-title {
        height: 24px;
        border-bottom: 1px solid #e5e5e5;
    }

    .tab-movie-title a {
        padding: 2px;
    }

    .tab-movie-title a:first-child {
        margin-right: 20px;
    }

    .tab-movie-title .tab-control-item {
        color: #999999;
    }

    .tab-movie-title .tab-control-item:hover {
        color: #3e3e3e;
    }

    .tab-movie-title .more {
        float: right;
        color: #409EFF;
    }

    a:hover {
        cursor: pointer;
    }

    .active {
        border-bottom: 2px solid #409EFF;
    }


</style>