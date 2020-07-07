import HomeContainer from './components/HomeContainer.vue';
import MemberContainer from './components/MemberContainer.vue';
import ShopcarContainer from './components/ShopcarContainer.vue';
import SearchContainer from './components/SearchContainer.vue';
import NewsList from './components/NewsList.vue';
import NewsInfo from './components/NewsInfo.vue';
import PhotoList from './components/PhotoList.vue';
import PhotoInfo from './components/PhotoInfo.vue';
import GoodsList from './components/GoodsList.vue';
import GoodsInfo from './components/GoodsInfo.vue';
import GoodsDesc from './components/GoodsDesc.vue';
import GoodsComment from './components/GoodsComment.vue';


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
        { path: '/home/photolist', component: PhotoList },
        { path: '/home/photoinfo/:id', component: PhotoInfo },
        { path: '/home/goodslist', component: GoodsList },
        { path: '/home/goodsinfo/:id', component: GoodsInfo },
        { path: '/home/goodsdesc/:id', component: GoodsDesc, name:'goodsdesc' },
        { path: '/home/goodscomment/:id', component: GoodsComment, name:'goodscomment' },
    ],
    linkActiveClass:'mui-active'
});

export default router;