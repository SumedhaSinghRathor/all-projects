<template>
  <section class="grow flex items-center justify-center">
    <div class="border w-lg p-2 flex flex-col gap-2">
      <div class="grid grid-cols-4 gap-2">
        <div
          v-for="link in links"
          :key="link"
          :class="[
            'text-center border border-black rounded-full capitalize cursor-pointer select-none',
            setLink === link && 'bg-black text-white',
          ]"
          @click="setLink = link"
        >
          {{ link }}
        </div>
      </div>
      <form>
        <div
          class="grid grid-cols-2 gap-x-2 gap-y-1"
          v-if="setLink === 'contacts'"
        >
          <label>
            <span class="text-sm">Link To: </span> <br />
            <input
              type="text"
              class="border focus:outline-none w-full px-2 py-1 rounded"
          /></label>
          <label>
            <span class="text-sm">Logo: </span> <br />
            <input
              type="text"
              class="border focus:outline-none w-full px-2 py-1 rounded"
          /></label>
          <label>
            <span class="text-sm">Link: </span> <br />
            <input
              type="text"
              class="border focus:outline-none w-full px-2 py-1 rounded"
          /></label>
          <label>
            <span class="text-sm">Content: </span> <br />
            <input
              type="text"
              class="border focus:outline-none w-full px-2 py-1 rounded"
          /></label>
        </div>
        <div
          class="grid grid-cols-2 gap-x-2 gap-y-1"
          v-if="setLink === 'experience'"
        >
          <label class="col-span-2">
            <span class="text-sm">Designation: </span> <br />
            <input
              type="text"
              class="border focus:outline-none w-full px-2 py-1 rounded" /></label
          ><label class="col-span-2">
            <span class="text-sm">Company: </span> <br />
            <input
              type="text"
              class="border focus:outline-none w-full px-2 py-1 rounded"
          /></label>
          <label>
            <span class="text-sm">Started: </span> <br />
            <input
              type="month"
              class="border focus:outline-none w-full px-2 py-1 rounded" /></label
          ><label>
            <span class="text-sm">Finished: </span> <br />
            <input
              type="month"
              class="border focus:outline-none w-full px-2 py-1 rounded"
          /></label>
        </div>
        <div
          class="grid grid-cols-2 gap-x-2 gap-y-1"
          v-if="setLink === 'projects'"
        >
          <label>
            <span class="text-sm">Title: </span> <br />
            <input
              type="text"
              class="border focus:outline-none w-full px-2 py-1 rounded"
          /></label>
          <label>
            <span class="text-sm">Type: </span> <br />
            <select class="border focus:outline-none w-full px-2 py-1 rounded">
              <option value="Full Stack">Full Stack</option>
              <option value="Front End">Front End</option>
              <option value="Front End">Game Clone</option>
              <option value="Chat Bot">Chat Bot</option>
            </select></label
          >
          <label class="col-span-2">
            <span class="text-sm">Description: </span> <br />
            <textarea class="border rounded w-full p-1"></textarea>
          </label>
          <label>
            <span class="text-sm">Link: </span> <br />
            <input
              type="text"
              class="border focus:outline-none w-full px-2 py-1 rounded"
          /></label>
          <label>
            <span class="text-sm">Github: </span> <br />
            <input
              type="text"
              class="border focus:outline-none w-full px-2 py-1 rounded"
          /></label>
          <label>
            <span class="text-sm">Frameworks: </span> <br />
            <input
              type="text"
              class="border focus:outline-none w-full px-2 py-1 rounded"
          /></label>
          <label>
            <span class="text-sm">Tools: </span> <br />
            <input
              type="text"
              class="border focus:outline-none w-full px-2 py-1 rounded"
          /></label>
          <label>
            <span class="text-sm">Language: </span> <br />
            <input
              type="text"
              class="border focus:outline-none w-full px-2 py-1 rounded"
          /></label>
          <label>
            <span class="text-sm">Database: </span> <br />
            <input
              type="text"
              class="border focus:outline-none w-full px-2 py-1 rounded"
          /></label>
        </div>
        <div
          class="grid grid-cols-2 gap-x-2 gap-y-1"
          v-if="setLink === 'skills'"
        >
          <label class="col-span-2">
            <span class="text-sm">Content: </span> <br />
            <select class="border focus:outline-none w-full px-2 py-1 rounded">
              <option value="languages">Languages</option>
              <option value="frontend">Frontend</option>
              <option value="backend">Backend</option>
              <option value="devOps">DevOps</option>
              <option value="tools">Tools</option>
            </select>
          </label>
          <label>
            <span class="text-sm">Name: </span> <br />
            <input
              type="text"
              class="border focus:outline-none w-full px-2 py-1 rounded"
          /></label>
          <label>
            <span class="text-sm">Url: </span> <br />
            <input
              type="text"
              class="border focus:outline-none w-full px-2 py-1 rounded"
          /></label>
        </div>
      </form>
    </div>
  </section>
</template>

<script>
import ProjectService from "../services/ProjectService";

export default {
  name: "Home",

  data() {
    return {
      links: ["contacts", "experience", "projects", "skills"],
      setLink: "projects",
      projects: [],
    };
  },

  methods: {
    async getProjects() {
      try {
        this.projects = await ProjectService.getProjects();
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    },
  },

  mounted() {
    this.getProjects();
  },
};
</script>
