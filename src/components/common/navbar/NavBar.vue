<template>
    <div class="nav-bar">
        <el-menu :default-active="$route.path"
                 router
                 class="el-menu-demo"
                 mode="horizontal"
                 @select="handleSelect"
                 text-color="#000000"
                 active-text-color="#409EFF">
            <el-menu-item index="/loginandregister">登录/注册</el-menu-item>
            <el-menu-item index="/movielist">电影列表</el-menu-item>
            <el-menu-item v-if="isLogin" index="/userinfo">{{$store.state.user.uNickName}}
            </el-menu-item>
            <el-menu-item v-else @click="clickRegister">你好，请登录</el-menu-item>
        </el-menu>
        <!--<div class="nav-bar-item" v-for="(item, index) in itemTitle" :key="item.id"-->
        <!--     :class="{active: isActive(index)}" @click="clickItem(index)">-->
        <!--    <a>{{item}}</a>-->
        <!--</div>-->
        <!--<div class="user">-->
        <!--<div v-if="isLogin"><a @click="clickUserInfo">{{$store.state.user.uNickName}}</a></div>-->
        <!--<div v-else><a @click="clickRegister">你好，请登录</a></div>-->
        <!--</div>-->
    </div>
</template>

<script>
    export default {
        name: "NavBar",
        components: {},
        data() {
            return {
                activeIndex: '1',
            }
        },
        methods: {
            clickRegister() {
                this.$router.push("/loginandregister").catch(err => err);
            },
            clickMoveList() {
                this.$router.push("/movielist").catch(err => err);
            },
            clickUserInfo() {
                this.$router.push("/userinfo").catch(err => err);
            },
            isActive(index) {
                return this.$route.path.indexOf(this.path[index]) !== -1;
            },
            handleSelect(key, keyPath) {
                // console.log(key, keyPath);
            }

        },
        computed: {
            isLogin() {
                return JSON.stringify(this.$store.state.user) !== '{}';
            },
        },
    }
</script>
<style scoped>
    .nav-bar {
        text-align: center;
        display: flex;
    }


    .el-col {
        border-radius: 4px;
    }

    .row-bg {
        padding: 10px 0;
    }

    ul {
        width: 100%;
    }

    ul li {
        width: 45%;
    }

    ul li:last-child {
        width: 10%;
    }

    .el-menu--horizontal > .el-menu-item {
        font-size: 24px;
        text-align: center;
    }

    /*.nav-bar-item {*/
    /*    width: 100px;*/
    /*    height: 60px;*/
    /*    line-height: 60px;*/
    /*    margin: 0 auto;*/
    /*    text-align: center;*/
    /*    font-size: 20px;*/
    /*}*/

    /*.user {*/
    /*    width: 150px;*/
    /*    height: 60px;*/
    /*    margin-right: 100px;*/
    /*    line-height: 60px;*/
    /*    text-align: center;*/
    /*    border: 1px solid #e5e5e5;*/
    /*}*/

    /*.active {*/
    /*    color: #409EFF;*/
    /*    border-bottom: 2px solid #409EFF;*/
    /*}*/

    /*a:hover {*/
    /*    cursor: pointer;*/
    /*    color: #409EFF;*/
    /*}*/


</style>