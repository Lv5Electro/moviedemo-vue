<template>
    <div class="login-and-register">
        <div class="login-img">
            <img src="../../assets/img/login/闪电.png" alt="">
            <span>闪电般的购票速度</span>
        </div>
        <el-container>
            <el-main>
                <el-tabs v-model="isActive" type="card" @tab-click="clickTab">
                    <el-tab-pane label="登录" name="login-tab">
                        <login></login>
                    </el-tab-pane>
                    <el-tab-pane label="注册" name="register-tab">
                        <register></register>
                    </el-tab-pane>
                </el-tabs>
            </el-main>
        </el-container>
    </div>
</template>

<script>
    import Login from '../../components/common/loginandregister/Login'
    import Register from '../../components/common/loginandregister/Register'



    export default {
        name: "LoginAndRegister",
        components: {
            Login,
            Register,
        },
        data() {

            return {
                isActive: 'login-tab',
            }
        },
        methods: {
            clickTab(tab, event) {
                // console.log(tab, event);
            },

        }
    }
</script>

<style>
    .login-and-register {
        width: 100%;
        height: 1000px;
    }

    .login-and-register .login-img {
        margin-top: 5%;
        margin-left: 15%;
        width: 250px;
        height: 250px;
        border: 1px solid #e5e5e5;
        box-shadow: 0 0 10px 5px #e5e5e5;
        float: left;

    }

    .login-and-register .login-img span {
        display: block;
        margin: 0 auto;
        text-align: center;
        width: 200px;
        font-size: 46px;
        font-weight: bold;
        background-image: -webkit-linear-gradient(bottom, yellow, #fd8403, red);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }

    .login-and-register .login-img img {
        width: 250px;
        height: 250px;
        vertical-align: bottom;
    }

    .el-container {
        width: 600px;
        height: 600px;
        float: right;
        margin-top: 5%;
        margin-right: 15%;
        border: 1px solid #e5e5e5;
        box-shadow: 0 0 10px 5px #e5e5e5;
    }

    .el-container .el-main {
        text-align: center;
        line-height: 60px;
        padding: 0;
    }

    .el-container .el-main .el-tabs {
        height: 100%;
    }

    .el-container .el-main .el-tabs__nav {
        border: 0;
        height: 60px;
        width: 100%;
    }

    .el-container .el-main .el-tabs__nav .el-tabs__item {
        height: 60px;
        line-height: 60px;
        width: 50%;
        font-size: 24px;
    }

    .el-container .el-main .el-form-item__content {
        width: 70%;
    }

</style>