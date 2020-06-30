import Vue from 'vue/dist/vue.js';
import app from './app.vue';

import {Header} from 'mint-ui';
Vue.component(Header.name, Header);

import './mui/css/mui.min.css';

let vm=new Vue({
    el:'#app',
    render: function (createElement, context) {
        return createElement(app);
    }
})