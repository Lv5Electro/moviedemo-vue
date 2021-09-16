import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

const Home = () => import('../views/home/Home');
const MovieDetail = () => import('../views/moviedetail/MovieDetail');
const MovieList = () => import('../views/movielist/MovieList');
const LoginAndRegister = () => import('../views/loginandregister/LoginAndRegister');
const Pay = () => import('../views/pay/Pay');
const UserInfo = () => import('../views/userinfo/UserInfo');

const routes = [
    {
        path: '/',
        component: LoginAndRegister,
        // children: [
        //     {
        //         path: 'movielist',
        //         name: 'MovieList',
        //         component: MovieList,
        //     },
        //     {
        //         path: 'loginandregister',
        //         name: 'LoginAndRegister',
        //         component: LoginAndRegister,
        //     },
        //     {
        //         path: 'movieDetail',
        //         name: 'MovieDetail',
        //         component: MovieDetail,
        //     },
        //     {
        //         path: 'pay',
        //         name: 'Pay',
        //         component: Pay,
        //     },
        //     {
        //         path: 'userinfo',
        //         name: 'UserInfo',
        //         component: UserInfo,
        //     }
        // ]
    },
    {
        path: '/movielist',
        name: 'MovieList',
        component: MovieList,
    },
    {
        path: '/loginandregister',
        name: 'LoginAndRegister',
        component: LoginAndRegister,
    },
    {
        path: '/movieDetail',
        name: 'MovieDetail',
        component: MovieDetail,
    },
    {
        path: '/pay',
        name: 'Pay',
        component: Pay,
    },
    {
        path: '/userinfo',
        name: 'UserInfo',
        component: UserInfo,
    }

];

const router = new VueRouter({
    // mode: 'history',
    base: process.env.BASE_URL,
    routes
});

//element-ui的NavBar-menu-item在多次点击时会报错，这是错误的解决方法（直接从网上copy的
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
};

export default router
