import HomeContainer from './components/HomeContainer.vue';
import MemberContainer from './components/MemberContainer.vue';
import ShopcarContainer from './components/ShopcarContainer.vue';
import SearchContainer from './components/SearchContainer.vue';
import NewsList from './components/NewsList.vue';
import NewsInfo from './components/NewsInfo.vue';


import VueRouter from '../node_modules/vue-router/dist/vue-router.js';
let router = new VueRouter({
    routes: [
        {path: '/', redirect: '/home'},
        { path: '/home', component: HomeContainer },
        { path: '/member', component: MemberContainer },
        { path: '/shopcar', component: ShopcarContainer },
        { path: '/search', component: SearchContainer },
        { path: '/home/newslist', component: NewsList },
        { path: '/home/newsinfo/:id', component: NewsInfo },
    ],
    linkActiveClass:'mui-active'
});

export default router;