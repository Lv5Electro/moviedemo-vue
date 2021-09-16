<template>
    <div class="sidebar">
        <div class="sidebar-item" v-for="(item, index) in $store.state.blogCategories" :key="item.id"
             :class="{active:index === currentIndex}" @click="clickCategory(index)">
            <span>{{item.cName}}</span>
        </div>
    </div>
</template>

<script>
    import {getBlogPosts} from "../../../network/home";
    import {getBlogPostsByCategoryCount} from "../../../network/home";

    export default {
        name: "Sidebar",
        components: {},
        data() {
            return {
                currentIndex: 0,
            }
        },
        methods: {
            clickCategory(index) {
                this.currentIndex = index;
                this.$store.commit('getPostCategoryIndex', index);
                this.getBlogPosts();
                this.getBlogPostsByCategoryCount();
            },
            getBlogPosts() {
                getBlogPosts(this.currentIndex, 0).then(res => {
                    this.$store.commit('initBlogPosts', res.data.blogPosts);
                });
            },
            getBlogPostsByCategoryCount() {
                getBlogPostsByCategoryCount(this.$store.state.blogCategoryIndex).then(res => {
                    let nums = [];
                    let pageCount = Math.ceil(res.data.num / 5.);
                    for (let i = 0; i < pageCount; i++) {
                        nums[i] = i + 1;
                    }
                    this.$store.commit('getPageCounts', nums);
                });
            }
        },
        created() {
            this.getBlogPosts();
            this.getBlogPostsByCategoryCount();
        }
    }
</script>

<style scoped>
    .sidebar {
        height: 500px;
        width: 15%;
        background: var(--content-color);
        position: absolute;
        top: 10%;
        left: 15%;
        opacity: 0.88;
        border-radius: 20px;
        border: 3px solid var(--border-color);
    }

    .sidebar-item {
        cursor: pointer;
        text-align: center;
        font-size: 16px;
        height: 50px;
        line-height: 50px;
        border-bottom: 2px solid var(--border-color);
    }

    .active {
        color: var(--touch-color);
    }
</style>