<template>
    <div class="pay">
        <div><img src="../../assets/img/pay/支付宝.jpg" alt=""></div>
        <div><img src="../../assets/img/pay/微信.png" alt=""></div>
    </div>
</template>

<script>
    export default {
        name: "Pay"
    }
</script>

<style scoped>
    .pay {
        width: 100%;
        display: flex;
        justify-content: center;
    }

    .pay div {
        text-align: center;
        margin-top: 100px;
        flex: 1;
    }

    .pay img {
        width: 600px;
        height: 700px;
    }
</style>