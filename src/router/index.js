import { createRouter, createWebHistory } from "vue-router";
import Project from "../components/Projects/Project.vue";
import Skills from "../components/Skills/Skills.vue";
import Experience from "../components/Experience/Experience.vue";
import Contacts from "../components/Contacts/Contacts.vue";

const routes = [
    {
        path: '/projects/:id?',
        name: 'Projects',
        component: Project
    },
    {
        path: '/skills',
        name: 'Skills',
        component: Skills
    },
    {
        path: '/contacts',
        name: 'Contacts',
        component: Contacts
    },
    {
        path: '/experience',
        name: 'Experience',
        component: Experience
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router