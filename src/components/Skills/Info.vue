<template>
  <section
    v-if="selectedSkill"
    class="fixed bottom-4 right-4 w-xs bg-white shadow-lg border rounded p-4"
  >
    <div class="flex items-center justify-between mb-2">
      <div class="flex items-center gap-4">
        <img :src="selectedSkill.url" class="size-6" />
        <h2 class="text-xl font-bold">{{ selectedSkill.name }}</h2>
      </div>
      <i
        class="bx bx-x text-2xl hover:bg-gray-400 rounded-full cursor-pointer"
        @click="$emit('close')"
      ></i>
    </div>

    <ul v-if="filteredProjects.length" class="list-decimal list-inside">
      <li v-for="project in filteredProjects" :key="project.id">
        {{ project.title }}
      </li>
    </ul>

    <p v-else class="text-gray-500">No projects found.</p>
  </section>
</template>

<script>
export default {
  name: "Info",

  props: {
    selectedSkill: {
      type: Object,
      default: null,
    },
    allProjects: {
      type: Array,
      default: () => [],
    },
  },

  computed: {
    filteredProjects() {
      if (!this.selectedSkill) return [];

      const skillName = this.selectedSkill.name;

      return this.allProjects.filter((project) => {
        return (
          project.frameworks?.includes(skillName) ||
          project.tools?.includes(skillName) ||
          project.language?.includes(skillName) ||
          project.database?.includes(skillName)
        );
      });
    },
  },
};
</script>
