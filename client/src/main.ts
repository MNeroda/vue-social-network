import Vue from 'vue';
import router from './router';
import store from './store';

import vuetify from '@/plugins/vuetify';
import '@/plugins/message.plugin';
import '@/plugins/websocket.plugin';
import '@/modules/directives/VMask';

import App from './App.vue';
Vue.config.productionTip = false;

new Vue({
    router,
    store,
    vuetify,
    render: (h) => h(App),
}).$mount('#app');
