<template>
  <section class="grid grid-cols-3 gap-4">
    <div
      v-for="(group, type) in groupedSkills"
      :key="type"
      class="border p-4 rounded"
    >
      <h2 class="font-bold text-2xl mb-2 capitalize">
        {{ type }}
      </h2>

      <ul class="flex flex-wrap gap-2">
        <li
          v-for="item in group"
          :key="item.id"
          :class="[
            'px-4 py-2 rounded-full shrink-0 flex items-center gap-2 text-sm cursor-pointer select-none transition-colors',
            selectedSkill?.id === item.id
              ? 'bg-black text-white'
              : 'bg-gray-300 text-black',
          ]"
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

  computed: {
    groupedSkills() {
      return this.skills.reduce((groups, skill) => {
        if (!groups[skill.type]) {
          groups[skill.type] = [];
        }

        groups[skill.type].push(skill);

        return groups;
      }, {});
    },
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
        console.error("Error fetching projects:", error);
      }
    },

    toggleSkill(skill) {
      this.selectedSkill = this.selectedSkill?.id === skill.id ? null : skill;
    },
  },

  mounted() {
    this.getSkills();
    this.getProjects();
  },
};
</script>
