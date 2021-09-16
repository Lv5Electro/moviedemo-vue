import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'


Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        movies: [],
        screen: true,
        screenCount: 0,
        unScreenCount: 0,
        movie: {},
        user: {},
        studios: [{sId: 1, sNum: 64, sGrade: 'A'}],
        // tickets: [],

    },
    getters: {},
    mutations: mutations,
    actions: {},
    modules: {}
})
