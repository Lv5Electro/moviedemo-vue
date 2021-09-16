<template>
    <div class="register">
        <el-form :model="registerForm" :rules="rules" ref="registerForm" label-width="100px"
                 class="demo-ruleForm">
            <el-form-item label="昵称" prop="nickname">
                <el-input placeholder="昵称" v-model="registerForm.nickname"></el-input>
            </el-form-item>
            <el-form-item label="用户名" prop="username">
                <el-input placeholder="用户名" v-model="registerForm.username"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input placeholder="密码" v-model="registerForm.password" show-password></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="password2">
                <el-input placeholder="确认密码" v-model="registerForm.password2" show-password></el-input>
            </el-form-item>
            <el-form-item label="手机号" prop="phone">
                <el-input placeholder="手机号" v-model="registerForm.phone"></el-input>
            </el-form-item>
            <el-form-item label="电子邮箱" prop="email">
                <el-input placeholder="电子邮箱" v-model="registerForm.email"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="clickRegisterBtn('registerForm')">注册</el-button>
                <el-button @click="resetForm('registerForm')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import {saveUser} from "../../../network/home";
    import {validateUName} from "../../../network/home";

    export default {
        name: "Register",
        data() {
            var confirmPwd = (rule, value, callback) => {
                if (value !== this.registerForm.password) {
                    callback(new Error("两次输入的密码不一致"));
                } else {
                    callback();
                }
            };
            var validatePhone = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入手机号'));
                } else {
                    if (!(/^1[3456789]\d{9}$/.test(value))) {
                        callback(new Error('请输入正确的手机号'));
                    } else {
                        callback();
                    }
                }
            };
            var validateEmail = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入邮箱'));
                } else {
                    if (!(/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(value))) {
                        callback(new Error('请输入正确的邮箱'));
                    } else {
                        callback();
                    }
                }
            };
            return {
                registerForm: {
                    nickname: '',
                    username: '',
                    password: '',
                    password2: '',
                    phone: '',
                    email: '',
                },
                rules: {
                    nickname: [
                        {required: true, message: '请输入昵称', trigger: 'blur'},
                        {max: 8, message: '长度不能超过8个字符', trigger: 'blur'},
                    ],
                    username: [
                        {required: true, message: '请输入用户名', trigger: 'blur'},
                        {min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur'},
                    ],
                    password: [
                        {required: true, message: '请输入密码', trigger: 'blur'},
                        {min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur'},
                    ],
                    password2: [
                        {required: true, message: '请再次输入密码', trigger: 'blur'},
                        {min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur'},
                        {validator: confirmPwd, trigger: 'blur'}
                    ],
                    phone: [
                        {required: true, message: '请输入手机号', trigger: 'blur'},
                        {validator: validatePhone, trigger: 'blur'},
                    ],
                    email: [
                        {required: true, message: '请输入电子邮箱', trigger: 'blur'},
                        {validator: validateEmail, trigger: 'blur'},
                    ]
                },
            }
        },
        methods: {
            clickRegisterBtn(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        validateUName(this.registerForm.username, this.registerForm.nickname).then(res => {
                            if (!res.data) {
                                let user = {
                                    uNickName: '',
                                    uName: '',
                                    uPassword: '',
                                    uPhone: '',
                                    uEmail: '',
                                };
                                user.uNickName = this.registerForm.nickname;
                                user.uName = this.registerForm.username;
                                user.uPassword = this.registerForm.password;
                                user.uPhone = this.registerForm.phone;
                                user.uEmail = this.registerForm.email;
                                console.log(user);
                                saveUser(JSON.stringify(user)).then(res => {
                                    this.$router.push("loginandregister").catch(err => err);
                                }).catch(err => {
                                    console.log(err);
                                });
                                alert('注册成功');
                            } else {
                                alert('注册失败，该用户或昵称已被注册');
                            }
                        }).catch(err => {
                            console.log(err);
                        });
                    } else {
                        alert('注册失败，输入的数据格式有误');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
        }
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