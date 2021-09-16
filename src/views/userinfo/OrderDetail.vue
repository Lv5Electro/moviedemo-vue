<template>
    <div class="order-detail">
        <el-table :data="ticketData" height="600" border style="width: 1090px">
            <el-table-column
                    prop="tkId"
                    label="编号"
                    width="150">
            </el-table-column>
            <el-table-column
                    prop="sId"
                    label="演播厅"
                    width="120">
            </el-table-column>
            <el-table-column
                    prop="mName"
                    label="电影名称"
                    width="200">
            </el-table-column>
            <el-table-column
                    prop="tkSeat"
                    label="座位号"
                    width="120">
            </el-table-column>
            <el-table-column
                    prop="tkDate"
                    label="播放时间"
                    width="300">
            </el-table-column>
            <el-table-column label="删除" width="200">
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.$index, scope.row)">删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>

    import {getTickets} from "../../network/home";
    import {deleteTicket} from "../../network/home";

    export default {
        name: "OrderDetail",
        data() {
            return {
                ticketData: [],
                tkIds: [],
            }
        },
        methods: {
            handleDelete(index, row) {
                deleteTicket(this.tkIds[index]).then(res => {
                    alert('删除成功');
                    this.$router.push("loginandregister").catch(err => err);
                    // location.reload();
                }).catch(err => {
                    console.log(err);
                })
            },
            getTickets() {
                let uId = this.$store.state.user.uId;
                getTickets(uId).then(res => {
                    this.ticketData = res.data.tickets;
                    for (let i = 0; i < this.ticketData.length; i++) {
                        this.tkIds.push(this.ticketData[i].tkId);
                        this.ticketData[i].tkId = i + 1;
                    }
                })
            },
        },
        created() {
            this.getTickets();
        }
    }
</script>

<style scoped>

    .order-detail {
        margin-top: 100px;
    }

    .el-table {
        width: 60%;
        /*margin-left: 230px;*/
        margin: 0 auto;
        box-shadow: 0 0 10px 5px #e5e5e5;
    }

    .el-tabs__content {
        margin-bottom: 200px;
    }
</style>