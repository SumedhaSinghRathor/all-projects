<script setup>
import Navbar from "./components/Navbar.vue";
import Project from "./components/Projects/Project.vue";
</script>

<template>
  <section class="flex flex-col p-4 gap-4">
    <Navbar />
    <hr />
    <router-view />
  </section>
</template>
