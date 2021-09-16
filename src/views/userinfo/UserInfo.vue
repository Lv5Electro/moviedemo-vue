<template>
    <div class="user-info">
        <el-tabs tab-position="left" style="height: 940px">
            <el-tab-pane label="用户信息">
                <user-list></user-list>
                <div style="width: 100%;text-align: center">
                    <el-button @click="clickReturnUser" type="primary" round>退出登录</el-button>
                </div>
            </el-tab-pane>
            <el-tab-pane label="订单详情">
                <order-detail></order-detail>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    import UserList from './UserList'
    import OrderDetail from './OrderDetail'


    export default {
        name: "UserInfo",
        components: {
            UserList,
            OrderDetail,
        },
        data() {
            return {
                /**
                 * 表单的宽度
                 */
                formLabelWidth: '120px'
            }
        },
        methods: {
            clickReturnUser() {
                this.$store.commit("returnUser", {});
                alert("退出登录成功");
                this.$router.push("/loginandregister").catch(err => err);
            }
        }
    }
</script>

<style scoped>
    .user-info /deep/ .el-tabs__item {
        text-align: center;
        width: 200px;
    }

</style>