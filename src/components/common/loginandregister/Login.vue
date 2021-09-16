<template>
    <div class="login">
        <el-form :model="loginForm" ref="loginForm" label-width="100px"
                 class="demo-ruleForm">
            <el-form-item label="用户名" prop="username">
                <el-input placeholder="用户名" v-model="loginForm.username"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input placeholder="密码" v-model="loginForm.password" show-password></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="clickLoginBtn()">登录</el-button>
                <el-button @click="resetForm('loginForm')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import {validateUser} from "../../../network/home";

    export default {
        name: "Login",
        data() {
            return {
                loginForm: {
                    username: '',
                    password: '',
                },
            }
        },
        methods: {
            clickLoginBtn() {
                validateUser(this.loginForm.username, this.loginForm.password).then(res => {
                    if (JSON.stringify(res.data) !== '{}') {
                        console.log(res.data.user);
                        this.$store.commit("getUser", res.data.user);
                        alert('登录成功');
                        this.$router.push("/movielist").catch(err => err);
                    } else {
                        alert('用户名或密码错误');
                    }
                }).catch(err => {
                    console.log(err);
                });
            },
        },

    }
</script>

<style scoped>
    .el-container .el-tabs__content .el-form {
        height: 450px;
        margin-top: 50px;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .el-container .el-tabs__content .el-form .el-form-item {
        flex: 1;
    }

    .el-container .el-tabs__content .el-form .el-form-item__label {
        padding-left: 20px;
        text-align: left;
    }
</style>