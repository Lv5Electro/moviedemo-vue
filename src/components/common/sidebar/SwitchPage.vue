<template>
    <div class="switch-page">
        <img @click="clickLeft" src="@/assets/img/home/左.svg" alt="">
        <label>
            <select ref="pageValue" @change="clickItem($event)">
                <option :value="item" v-for="item in $store.state.pageCounts">{{item}}</option>
            </select>
        </label>
        <img @click="clickRight" src="@/assets/img/home/右.svg" alt="">

    </div>
</template>

<script>
    import {getBlogPosts} from '@/network/home';
    import {getBlogPostsByCategoryCount} from '@/network/home';

    export default {
        name: "SwitchPage",
        data() {
            return {}
        },

        methods: {
            clickLeft() {
                // 使当前option的值-1
                this.$refs.pageValue.value--;
                // 减1是因为option的初始值是从1开始算的，而数据库中的分页是从0开始算的
                getBlogPosts(this.$store.state.blogCategoryIndex, (this.$refs.pageValue.value - 1) * 5).then(res => {
                    this.$store.commit('initBlogPosts', res.data.blogPosts);
                });
            },
            clickRight() {
                this.$refs.pageValue.value++;
                getBlogPosts(this.$store.state.blogCategoryIndex, (this.$refs.pageValue.value - 1) * 5).then(res => {
                    this.$store.commit('initBlogPosts', res.data.blogPosts);
                });
            },
            clickItem(event) {
                let page = Number(event.target.value);
                getBlogPosts(this.$store.state.blogCategoryIndex, (page - 1) * 5).then(res => {
                    this.$store.commit('initBlogPosts', res.data.blogPosts);
                });
            },

        },

    }
</script>

<style scoped>
    .switch-page {
        position: absolute;
        left: 43%;
        bottom: 5px;
    }

    .switch-page img {
        vertical-align: middle;
        cursor: pointer;
    }

    .switch-page label {
        margin: 0 10px;
    }

    .switch-page select {
        background: var(--content-color);
        border: 1px solid var(--border-color);
        outline: 1px solid var(--border-color);
        color: var(--font-color);
    }

    .switch-page select option {
        border: 1px solid var(--border-color);
    }

</style>