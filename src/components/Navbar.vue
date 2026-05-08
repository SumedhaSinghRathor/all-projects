<template>
  <div
    class="flex justify-between p-2 bg-black text-white rounded hover:outline-2 outline-offset-4 outline-red-500"
  >
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
