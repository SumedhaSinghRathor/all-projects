<template>
  <div class="flex justify-between p-2 bg-black text-white rounded">
    <RouterLink to="/" class="font-bold">/* HOME */</RouterLink>
    <nav class="flex gap-6">
      <router-link
        v-for="link in links"
        :key="link"
        :to="`/${link}`"
        active-class="bg-white text-black"
        class="px-2 rounded-full capitalize"
      >
        {{ link }}
      </router-link>
    </nav>
  </div>
</template>

<script setup>
const links = ["contacts", "experience", "projects", "skills"];
</script>
