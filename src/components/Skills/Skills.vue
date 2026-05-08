<template>
  <section class="grid grid-cols-3 gap-4">
    <div v-for="skill in skills" :key="skill.id" class="border p-4 rounded">
      <h2 class="font-bold text-2xl mb-2">
        {{ skill.content }}
      </h2>

      <ul class="flex flex-wrap gap-2">
        <li
          v-for="item in skill.list"
          :key="item"
          class="bg-gray-300 text-black px-4 py-2 rounded-full shrink-0 flex items-center gap-2 text-sm cursor-pointer"
          @click="toggleSkill(item)"
        >
          <img :src="item.url" :alt="item.name" class="size-4" />
          {{ item.name }}
        </li>
      </ul>
    </div>
  </section>
  <Info
    :selectedSkill="selectedSkill"
    :allProjects="projects"
    @close="selectedSkill = null"
  />
</template>

<script>
import ProjectService from "../../services/ProjectService";
import SkillService from "../../services/SkillService";
import Info from "./Info.vue";

export default {
  name: "Skills",

  components: { Info },

  data() {
    return {
      skills: [],
      projects: [],
      selectedSkill: null,
    };
  },

  methods: {
    async getSkills() {
      try {
        this.skills = await SkillService.getSkills();
      } catch (error) {
        console.error("Error fetching skills:", error);
      }
    },

    async getProjects() {
      try {
        this.projects = await ProjectService.getProjects();
      } catch (error) {
        console.error("Error fetching projects:", projects);
      }
    },

    toggleSkill(skill) {
      this.selectedSkill = this.selectedSkill === skill ? null : skill;
    },
  },

  mounted() {
    this.getSkills();
    this.getProjects();
  },
};
</script>
