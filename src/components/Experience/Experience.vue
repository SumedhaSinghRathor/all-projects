<template>
  <section v-if="currentExperience" class="flex flex-col grow">
    <div class="grow flex items-end justify-center p-8">
      <div class="w-2xl">
        <h1 class="text-3xl font-bold">{{ currentExperience.designation }}</h1>
        <div class="flex justify-between items-baseline">
          <h2 class="text-2xl italic">{{ currentExperience.company }}</h2>
          <h2>
            {{ currentExperience.started }} -
            {{ currentExperience.finished ?? "Present" }}
          </h2>
        </div>
        <hr class="my-2" />
        <ol class="list-disc list-outside pl-4">
          <li v-for="(desc, i) in currentExperience.description" :key="i">
            {{ desc }}
          </li>
        </ol>
      </div>
    </div>
    <div class="border flex">
      <button
        class="text-4xl bg-black text-white bx bxs-chevron-left"
        @click="prevExperience"
      ></button>
      <div class="bg-gray-300 grow flex items-center justify-center p-2">
        <div class="size-24 flex items-center justify-center">
          <img
            :src="currentExperience.logo"
            :alt="currentExperience.company"
            class="rounded-full"
          />
        </div>
      </div>
      <button
        class="text-4xl bg-black text-white bx bxs-chevron-right"
        @click="nextExperience"
      ></button>
    </div>
  </section>
</template>
<script>
import ExperienceService from "../../services/ExperienceService";

export default {
  name: "Experience",

  data() {
    return {
      experiences: [],
      currentIndex: 0,
    };
  },

  computed: {
    currentExperience() {
      return this.experiences[this.currentIndex];
    },
  },

  methods: {
    async getExperiences() {
      try {
        this.experiences = await ExperienceService.getExperience();
      } catch (error) {
        console.error("Error fetching experiences:", error);
      }
    },

    nextExperience() {
      this.currentIndex = (this.currentIndex + 1) % this.experiences.length;
    },

    prevExperience() {
      this.currentIndex =
        (this.currentIndex - 1 + this.experiences.length) %
        this.experiences.length;
    },
  },

  mounted() {
    this.getExperiences();
  },
};
</script>
