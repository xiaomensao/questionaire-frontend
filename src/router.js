
import Vue from 'vue';
import Router from 'vue-router';
import HelloWorld from '@/components/HelloWorld';
import login from '@/components/login';
import home from '@/components/home';
import questionaireList from '@/components/questionaireList';
import questionaire from '@/components/questionaire';
import questionaireView from '@/components/questionaireView';
 
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
        },
        {
            path: '/home',
            component: home
        },
        {
            path: '/questionairelist',
            component: questionaireList
        },
        {
            path: '/questionaire/:id',
            component: questionaire
        },
        {
            path: '/questionaireView/:id',
            component: questionaireView
        }
    ]
})

export default router