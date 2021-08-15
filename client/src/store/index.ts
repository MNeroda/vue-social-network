import Vue from 'vue';
import Vuex from 'vuex';
import { mutations } from '@/store/mutations';
import { AppState } from '@/store/types';
import { actions } from '@/store/actions';

Vue.use(Vuex);

export default new Vuex.Store<AppState>({
    state: {
        token: '',
        prevTokenTimeout: undefined, //предыдущий таймаут нужен чтобы в случае логаута отменились обновления токенов
        userId: '',
    },
    actions,
    mutations,
    modules: {},
});
