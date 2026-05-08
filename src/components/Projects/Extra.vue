<template>
  <div
    v-if="selectExtra"
    class="fixed inset-0 bg-black/30"
    @click="$router.back()"
  ></div>
  <div
    :class="[
      'fixed top-0 right-0 bg-gray-300 flex flex-col justify-between h-full w-md transition-transform duration-300 rounded-l-lg p-2',
      selectExtra ? 'translate-x-0' : 'translate-x-full',
    ]"
  >
    <div class="flex items-center gap-4">
      <img :src="project.logo" :alt="project.title" class="size-9" />
      <h1 class="text-3xl font-bold">{{ project.title }}</h1>
    </div>
    <p class="text-sm">{{ project.desc }}</p>
    <ImgSet v-if="project.carousel" :imgset="project.carousel" />
    <div>
      <h2 class="font-semibold underline mb-1">
        Information about the project
      </h2>
      <div class="flex flex-col gap-1 self-end">
        <div
          v-for="(value, key) in filteredKeys"
          :key="key"
          class="flex items-center gap-2 flex-wrap"
        >
          <span class="font-semibold capitalize text-sm">{{ key }}: </span>
          <div
            v-for="(item, i) in value"
            :key="i"
            class="text-xs bg-cyan-100 px-2 py-0.5 text-blue-500 rounded-full font-semibold hover:text-white hover:bg-blue-500 cursor-pointer"
          >
            {{ item }}
          </div>
        </div>
      </div>
    </div>
    <i
      class="bx bx-x absolute top-2 right-2 text-3xl cursor-pointer"
      @click="$router.back()"
    ></i>
  </div>
</template>

<script>
import ImgSet from "./ImgSet.vue";

export default {
  name: "Extra",
  props: {
    selectExtra: { type: Object, default: null },
  },
  components: { ImgSet },
  computed: {
    project() {
      return this.selectExtra || {};
    },
    filteredKeys() {
      return Object.fromEntries(
        Object.entries(this.project).filter(
          ([key, value]) => Array.isArray(value) && key !== "carousel",
        ),
      );
    },
  },
};
</script>
