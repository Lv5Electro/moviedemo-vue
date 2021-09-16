<template>
    <div class="seat-wrap">
        <div class="icon-info">
            <div class="icon-info-item" v-for="(item, index) in titles" :key="item.id">
                <img :src="icon[index].src" alt="">
                <span>{{item}}</span>
            </div>
            <el-dropdown @command="clickStudio" size="small" split-button type="primary" trigger="click">
                {{$store.state.studios[studioIndex].sId}}号演播厅
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item v-for="(item, index) in $store.state.studios" :key="item.id"
                                      :command="(index + 1)">
                        {{item.sId}}号演播厅
                    </el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
        <div class="choose-seat">
            <div class="seat-item" v-for="(item, index) in $store.state.studios[studioIndex].sNum"
                 :key="item.id" @click="clickSeat(index)">
                <img v-if="seats[index] === 1" src="../../../assets/img/moviedetail/已选座位.png" alt="">
                <img v-else-if="seats[index] === 2" src="../../../assets/img/moviedetail/可选座位.png" alt="">
                <img v-else src="../../../assets/img/moviedetail/已售座位.png" alt="">
            </div>
        </div>
        <a class="buy-seat" @click="clickBuy"><span>购买</span></a>
    </div>
</template>

<script>
    import iconImages from '../../../assets/js/iconImages'

    import {saveTickets} from "../../../network/home";

    import {getStudios} from "../../../network/home";
    import {getSeats} from "../../../network/home";


    export default {
        name: "SeatWrap",
        data() {
            return {
                icon: iconImages.iconImages,
                titles: ['可选', '已售', '已选'],
                seats: [],
                studioIndex: 0,
                tickets: [],
            }
        },
        methods: {
            clickSeat(index) {
                if (this.seats[index] === 1) {
                    this.$set(this.seats, index, 2);
                } else if (this.seats[index] === 2) {
                    this.$set(this.seats, index, 1);
                }
            },
            clickBuy() {
                if (this.$store.state.user.uId === undefined || this.$store.state.user.uId === 0) {
                    alert("请先登录");
                    this.$router.push("/loginandregister").catch(err => err);
                    return;
                }
                let tickets = [];
                let isSelect = false;
                for (let i = 0; i < this.seats.length; i++) {
                    if (this.seats[i] === 1) {
                        isSelect = true;
                        let ticket = {
                            "sId": 0,
                            "mId": 0,
                            "uId": 0,
                            "tkSeat": 0,
                        };
                        ticket.sId = this.$store.state.studios[this.studioIndex].sId;
                        ticket.mId = this.$store.state.movie.mId;
                        ticket.uId = this.$store.state.user.uId;
                        ticket.tkSeat = (i + 1);
                        tickets.push(ticket)
                    }
                }
                if (!isSelect) {
                    alert("请选择座位");
                    this.$router.push("moviedetail").catch(err => err);
                    // location.reload();
                    return;
                }
                console.log("购买了一些票：");
                console.log(tickets);
                this.saveTickets(JSON.stringify(tickets));
                this.$router.push("/pay").catch(err => err);
            },
            clickStudio(command) {
                this.studioIndex = command - 1;
                this.getSeats()
            },
            handleSeats() {
                this.seats = [];
                let tickets = [];
                for (let i = 0; i < this.tickets.length; i++) {
                    tickets.push(this.tickets[i].tkSeat);
                }

                for (let i = 0; i < this.$store.state.studios[this.studioIndex].sNum; i++) {
                    if (tickets.indexOf(i + 1) !== -1) {
                        this.seats.push(0);
                    } else {
                        this.seats.push(2);
                    }
                }
            },
            getStudios() {
                getStudios().then(res => {
                    this.$store.commit("getStudios", res.data.studios);
                    this.getSeats();
                })
            },
            getSeats() {
                let mId = this.$store.state.movie.mId;
                let sId = this.$store.state.studios[this.studioIndex].sId;
                getSeats(mId, sId).then(res => {
                    this.tickets = res.data.tickets;
                    this.handleSeats();
                })
            },
            saveTickets(tickets) {
                saveTickets(tickets).then(res => {
                    console.log(res);
                })
            }
        },
        created() {
            this.getStudios();
            // 由于promise是异步执行，而我是想在执行完getStudios后才执行getSeats，所以采取嵌套调用的方式，而不是一行一行调用
            // this.getSeats();
        }
    }
</script>

<style scoped>
    .seat-wrap {
        width: 990px;
        height: 500px;
        background: rgba(125, 125, 125, 0.3);
        margin: 50px auto;
        color: #ffffff;
    }

    .seat-wrap .icon-info {
        width: 100%;
        height: 34px;
        border-top: 1px solid #e5e5e5;
        border-bottom: 1px solid #e5e5e5;
    }

    .seat-wrap .icon-info .el-dropdown {
        float: right;
        margin-right: 50px;
    }

    .seat-wrap .icon-info .icon-info-item {
        font-size: 24px;
        float: left;
        margin-right: 24px;
    }

    .seat-wrap .icon-info .icon-info-item img {
        width: 32px;
        height: 32px;
        vertical-align: middle;
    }

    .seat-wrap .choose-seat {
        width: 320px;
        height: 320px;
        margin: 0 auto;
        padding: 20px;
    }

    .seat-wrap .choose-seat .seat-item {
        float: left;
        width: 36px;
        height: 36px;
    }

    .seat-wrap .choose-seat .seat-item :hover {
        cursor: pointer;
    }

    .seat-wrap .choose-seat .seat-item img {
        width: 36px;
        height: 36px;
    }

    .seat-wrap .buy-seat {
        width: 120px;
        height: 64px;
        line-height: 64px;
        margin-right: 100px;
        background: #FF9900;
        float: right;
        font-size: 36px;
        text-align: center;
        border-radius: 20px;
    }

    a {
        color: #FFFFFF;

    }

    a:hover {
        cursor: pointer;
        color: #000000;
    }

</style>