import { createRouter, createWebHistory } from "vue-router";
import Project from "../components/Projects/Project.vue";
import Skills from "../components/Skills/Skills.vue";

const routes = [
    {
        path: '/projects',
        name: 'Projects',
        component: Project
    }, {
        path: '/skills',
        name: 'Skills',
        component: Skills
    }, {
        path: '/contacts',
        name: 'Contacts',
    }, {
        path: '/experience',
        name: 'Experience',
    },
]

const router = createRouter({
    history: createWebHistory(''),
    routes
})

export default router