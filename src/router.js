
import Vue from 'vue';
import Router from 'vue-router';
import HelloWorld from '@/components/HelloWorld';
import login from '@/components/login';
 
Vue.use(Router)

const router = new Router({
    linkActiveClass: 'active',
    hashbang: true, 
    history: true,
    routes: [
        {
            path: '/helloworld',
            component: HelloWorld
        },
        {
            path: '/login',
            component: login
        }
    ]
})

export default router