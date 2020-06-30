import account from './account.vue';
import goodslist from './goodslist.vue';
import signin from './signin.vue';
import signout from './signout.vue';

import VueRouter from '../node_modules/vue-router/dist/vue-router.js';
let router = new VueRouter({
    routes: [
        {
            path: '/account',
            component: account,
            children: [
                { path: 'signin', component: signin },
                { path: 'signout', component: signout }
            ]
        },
        { path: '/goodslist', component: goodslist }
    ]
});

export default router;