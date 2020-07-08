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

import Vuex from 'vuex';
Vue.use(Vuex);
let store=new Vuex.Store({
    state:{
        car:JSON.parse(localStorage.getItem('car')) || []
    },
    mutations:{
        addToCar(state, goodsinfo){
            let flag=false;
            state.car.some(item=>{
                if(item.id==goodsinfo.id){
                    item.count+=parseInt(goodsinfo.count);
                    flag=true;
                    return true;
                }
            });
            if(flag===false){
                state.car.push(goodsinfo);
            }
            localStorage.setItem('car', JSON.stringify(state.car));
        },
        updateGoodsInfo(state, goodsinfo){
            state.car.some(item=>{
                if(item.id==goodsinfo.id){
                    item.count=parseInt(goodsinfo.count);
                    return true;
                }
            })
            localStorage.setItem('car', JSON.stringify(state.car));
        },
        removeFromCar(state, id){
            state.car.some((item, index)=>{
                if(item.id==id){
                    state.car.splice(index, 1);
                    return true;
                }
            })
            localStorage.setItem('car', JSON.stringify(state.car));
        },
        updateSelected(state, params_obj){
            state.car.some(item=>{
                if(item.id==params_obj.id){
                    item.selected=params_obj.selected;
                    return true;
                }
            })
            localStorage.setItem('car', JSON.stringify(state.car));
        },
    },
    getters: {
        getAllCount(state){
            let total_count=0;
            state.car.forEach(item=>{
                total_count+=item.count;
            })
            return total_count;
        },
        getAllSelected(state){
            let total_count=0;
            state.car.forEach(item=>{
                if(item.selected==true){
                    total_count+=item.count;
                }
            })
            return total_count;
        },
        getTotalPrice(state){
            let total_price=0;
            state.car.forEach(item=>{
                if(item.selected==true){
                    total_price+=item.price * item.count;
                }
            })
            return total_price;
        },
        getGoodsCount(state){
            let goods_count={};
            state.car.forEach(item=>{
                goods_count[item.id]=item.count;
            });
            return goods_count;
        },
        getGoodsSelected(state){
            let goods_selected={};
            state.car.forEach(item=>{
                goods_selected[item.id]=item.selected;
            })
            return goods_selected;
        }
    }
});

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
    router,
    store
})