import Vue from 'vue/dist/vue.js';
import app from './app.vue';

// 按需导入
/* import { Header, Swipe, SwipeItem, Button, Lazyload } from 'mint-ui';
Vue.component(Header.name, Header);
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.component(Button.name, Button);
Vue.use(Lazyload); */
// 全部导入
import MintUI from 'mint-ui';
Vue.use(MintUI);
import 'mint-ui/lib/style.css';

import VuePreview from 'vue-preview';
Vue.use(VuePreview);
/* Vue.use(VuePreview, {
    mainClass: 'pswp--minimal--dark',
    barsSize: {top: 0, bottom: 0},
    captionEl: false,
    fullscreenEl: false,
    shareEl: false,
    bgOpacity: 0.85,
    tapToClose: true,
    tapToToggleControls: false
  }) */


import './mui/css/mui.min.css';
import './mui/css/icons-extra.css';

import VueRouter from '../node_modules/vue-router/dist/vue-router'
Vue.use(VueRouter);

import router from './router.js';

import VueResource from 'vue-resource';
Vue.use(VueResource);
Vue.http.options.root = 'http://api.cms.liulongbin.top';
Vue.http.options.emulateJSON=true;


let dateFormat = function (dateStr) {
    let date = new Date(dateStr);
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    month.toString().length < 2 ? month = '0' + month : null;
    month.toString().length < 2 ? month = '0' + month : null;
    let h = date.getHours(),
        m = date.getMinutes(),
        s = date.getSeconds();
    h.toString().length < 2 ? h = '0' + h : null;
    m.toString().length < 2 ? m = '0' + m : null;
    s.toString().length < 2 ? s = '0' + s : null;
    return `${year}-${month}-${day} ${h}:${m}:${s}`;
}

Vue.filter('dateFormat', dateFormat);


let vm = new Vue({
    el: '#app',
    render: function (createElement, context) {
        return createElement(app);
    },
    router
})