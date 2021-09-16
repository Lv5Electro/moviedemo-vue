<template>
    <div class="user-list">
        <el-row>
            <div class="grid-content bg-purple"><h2>用户信息</h2></div>
        </el-row>
        <el-row>
            <el-col :span="12">
                <div class="grid-content bg-purple"><span>昵称：</span></div>
            </el-col>
            <el-col :span="12">
                <div class="grid-content bg-purple-light"><span>{{user.uNickName}}</span></div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="12">
                <div class="grid-content bg-purple"><span>用户名：</span></div>
            </el-col>
            <el-col :span="12">
                <div class="grid-content bg-purple-light"><span>{{user.uName}}</span></div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="12">
                <div class="grid-content bg-purple"><span>手机号：</span></div>
            </el-col>
            <el-col :span="12">
                <div class="grid-content bg-purple-light"><span>{{user.uPhone}}</span></div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="12">
                <div class="grid-content bg-purple"><span>邮箱：</span></div>
            </el-col>
            <el-col :span="12">
                <div class="grid-content bg-purple-light"><span>{{user.uEmail}}</span></div>
            </el-col>
        </el-row>
        <el-row>
            <el-button type="text" @click="dialogFormVisible = true">修改信息</el-button>
        </el-row>
        <el-dialog title="用户信息" :visible.sync="dialogFormVisible">
            <el-form :model="userForm" :rules="rules" ref="userForm" label-width="100px"
                     class="demo-ruleForm">
                <el-form-item label="昵称" prop="nickname">
                    <el-input placeholder="昵称" v-model="userForm.nickname"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input placeholder="密码" v-model="userForm.password" show-password></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="password2">
                    <el-input placeholder="确认密码" v-model="userForm.password2" show-password></el-input>
                </el-form-item>
                <el-form-item label="手机号" prop="phone">
                    <el-input placeholder="手机号" v-model="userForm.phone"></el-input>
                </el-form-item>
                <el-form-item label="电子邮箱" prop="email">
                    <el-input placeholder="电子邮箱" v-model="userForm.email"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="clickUpdate('userForm')">确 定</el-button>
            </div>
        </el-dialog>
    </div>

</template>

<script>
    import {updateUser, validateUName} from "../../network/home";


    export default {
        name: "UserList",
        data() {
            /**
             * 二次密码输入验证
             * @param rule
             * @param value
             * @param callback
             */
            var confirmPwd = (rule, value, callback) => {
                if (value !== this.userForm.password) {
                    callback(new Error("两次输入的密码不一致"));
                } else {
                    callback();
                }
            };
            /**
             * 验证手机号格式是否正确
             * @param rule
             * @param value
             * @param callback
             */
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
            /**
             * 验证邮箱格式是否正确
             * @param rule
             * @param value
             * @param callback
             */
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
                /**
                 * 控制显示弹出来的对话
                 */
                dialogFormVisible: false,
                /**
                 * 表单对象
                 */
                userForm: {
                    nickname: '',
                    password: '',
                    password2: '',
                    phone: '',
                    email: '',
                },
                /**
                 * 验证规则
                 */
                rules: {
                    nickname: [
                        {required: true, message: '请输入昵称', trigger: 'blur'},
                        {max: 8, message: '长度不能超过8个字符', trigger: 'blur'},
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
                user: this.$store.state.user,
            }
        },
        methods: {
            /**
             * 点击更改触发的事件
             * @param formName 表单对象名的字符串类型
             */
            clickUpdate(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        validateUName(this.userForm.username, this.userForm.nickname).then(res => {
                            if (!res.data) {
                                let user = {
                                    uId: '',
                                    uNickName: '',
                                    uName: '',
                                    uPassword: '',
                                    uPhone: '',
                                    uEmail: '',
                                };
                                user.uId = this.$store.state.user.uId;
                                user.uNickName = this.userForm.nickname;
                                user.uName = this.$store.state.user.uName;
                                user.uPassword = this.userForm.password;
                                user.uPhone = this.userForm.phone;
                                user.uEmail = this.userForm.email;
                                updateUser(JSON.stringify(user)).then(res => {
                                    console.log(res.data);
                                    this.$store.commit("getUser", res.data);
                                    this.$router.push("userinfo").catch(err => err);
                                    // location.reload();
                                }).catch(err => {
                                    console.log(err);
                                });
                                alert('修改成功');
                            } else {
                                alert('修改失败，该用户或昵称已被注册');
                            }
                        }).catch(err => {
                            console.log(err);
                        });
                    } else {
                        alert('修改失败，输入的数据格式有误');
                        return false;
                    }
                });
            },
        }
    }
</script>

<style scoped>
    .user-list {
        margin: 200px auto;
        width: 50%;
        text-align: left;
        border: 1px solid #e5e5e5;
        border-radius: 15px;
        box-shadow: 0 0 10px 5px #e5e5e5;
    }

    .user-list .el-row {
        margin: 20px 0;
    }

    .user-list .el-col {
        border-radius: 4px;
    }

    .user-list span {
        display: block;
        width: 80px;
        margin: 0 auto;
    }

    .user-list .el-row:first-child {
        text-align: center;
    }

    .user-list .el-row:nth-child(6) {
        color: #409EFF;
        margin-right: 40px;
        text-align: right;
    }

    a:hover {
        cursor: pointer;
    }
</style>