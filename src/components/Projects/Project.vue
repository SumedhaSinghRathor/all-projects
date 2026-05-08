<template>
  <section class="w-full h-full">
    <div class="w-full flex items-center gap-4 text-2xl mb-4">
      <input
        name="search"
        v-model="search"
        type="text"
        class="focus:outline-none px-2 py-1.5 rounded border border-black/30 text-xl grow"
      />
      <i
        :class="[
          'bx border border-black/30 p-2 rounded cursor-pointer',
          sortConfig === 'asc'
            ? 'bx-sort-a-z text-white bg-black'
            : sortConfig === 'desc'
              ? 'bx-sort-z-a text-white bg-black'
              : 'bx-sort-a-z',
        ]"
        @click="toggleSort"
        :title="`Sort: ${sortConfig}`"
      ></i>
      <div class="flex items-center p-1 border border-black/30 rounded">
        <i
          :class="[
            'bx bxs-grid-alt p-1 rounded',
            grid ? 'bg-black/20' : 'cursor-pointer',
          ]"
          @click="grid = true"
          title="View: Grid"
        ></i>
        <i
          :class="[
            'bx bx-list-ul p-1 rounded',
            grid ? 'cursor-pointer' : 'bg-black/20',
          ]"
          @click="grid = false"
          title="View: List"
        ></i>
      </div>
      <button
        class="text-lg bg-black text-white py-1.5 px-3 rounded font-semibold cursor-pointer select-none"
        title="Graphical Analysis"
        @click="showModal = true"
      >
        Analysis
      </button>
      <Analysis v-if="showModal" @close="showModal = false" />
    </div>
    <section v-if="grid" class="grid grid-cols-3 gap-4">
      <div
        v-for="project in processedProjects"
        :key="project.id"
        class="border-2 border-black/20 flex flex-col gap-4 p-4 rounded-lg"
      >
        <div class="flex justify-between">
          <div class="flex items-center gap-4">
            <img :src="project.logo" :alt="project.title" class="size-9" />
            <div class="text-sm">
              <p class="font-bold">{{ project.title }}</p>
              <a
                :href="project.link"
                target="_blank"
                rel="noreferrer"
                class="hover:underline text-black/80 line-clamp-1"
                >{{ project.link }}</a
              >
            </div>
          </div>
          <div class="text-3xl text-black/70 flex items-center gap-2">
            <a
              :href="`https://github.dev/SumedhaSinghRathor/${project.github}`"
              target="_blank"
            >
              <i class="bx bx-code-alt rounded-full hover:bg-slate-500/20"></i>
            </a>
            <i
              :class="[
                'bx bx-dots-horizontal-rounded rounded-full hover:bg-slate-500/20 cursor-pointer',
                selectedProject === project ? 'bg-slate-500/40' : '',
              ]"
              @click.stop="toggleExtra(project)"
            ></i>
          </div>
        </div>
        <a
          :href="`https://github.com/SumedhaSinghRathor/${project.github}`"
          target="_blank"
          rel="noreferrer"
          class="w-fit rounded-full"
        >
          <div
            class="bg-gray-300 w-fit max-w-full font-semibold flex items-center gap-2 px-2 rounded-full"
          >
            <i class="bx bxl-github text-xl"></i>
            <p class="line-clamp-1">SumedhaSinghRathor/{{ project.github }}</p>
          </div></a
        >
      </div>
    </section>
    <section v-else class="grid grid-col-1">
      <div
        v-for="project in processedProjects"
        :key="project.id"
        @click.stop="toggleExtra(project)"
        class="flex justify-between items-center p-2 border-b border-black/30 hover:bg-slate-500/10 cursor-pointer"
      >
        <div class="flex items-center gap-4">
          <img :src="project.logo" :alt="project.title" class="size-12" />
          <div>
            <p class="font-bold">{{ project.title }}</p>
            <a
              :href="project.link"
              target="_blank"
              class="hover:underline text-black/80 line-clamp-1"
              rel="noreferrer"
              >{{ project.link }}</a
            >
          </div>
        </div>
        <a
          :href="`https://github.com/SumedhaSinghRathor/${project.github}`"
          target="_blank"
          rel="noreferrer"
        >
          <div class="flex gap-1 bg-gray-300 px-2 rounded-full font-semibold">
            <i class="bx bxl-github text-2xl"></i>
            <p>SumedhaSinghRathor/{{ project.github }}</p>
          </div></a
        >
      </div>
    </section>
  </section>
  <Extra :selectExtra="selectedProject" @close="closeExtra" />
</template>

<script>
import ProjectService from "../../services/ProjectService";
import Analysis from "./Analysis.vue";
import Extra from "./Extra.vue";

export default {
  name: "Project",

  data() {
    return {
      projects: [],
      search: "",
      sortConfig: "none",
      grid: true,
      selectedProject: null,
      showModal: false,
    };
  },

  components: { Extra, Analysis },

  computed: {
    processedProjects() {
      return this.projects
        .filter((item) =>
          item.title.toLowerCase().includes(this.search.toLowerCase()),
        )
        .slice()
        .sort((a, b) => {
          if (this.sortConfig === "asc") return a.title.localeCompare(b.title);
          if (this.sortConfig === "desc") return b.title.localeCompare(a.title);
          return 0;
        });
    },
  },

  methods: {
    async getProjects() {
      try {
        this.projects = await ProjectService.getProjects();
        this.syncProjectFromRoute();
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    },

    syncProjectFromRoute() {
      const id = Number(this.$route.params.id);

      if (!id) {
        this.selectedProject = null;
        return;
      }

      this.selectedProject =
        this.projects.find((project) => project.id === id) || null;
    },

    toggleSort() {
      this.sortConfig =
        this.sortConfig === "none"
          ? "asc"
          : this.sortConfig === "asc"
            ? "desc"
            : "none";
    },

    toggleExtra(project) {
      if (this.selectedProject?.id === project.id) {
        this.closeExtra();
      } else {
        this.$router.push(`/projects/${project.id}`);
      }
    },

    closeExtra() {
      this.$router.push("/projects");
    },
  },

  created() {
    this.getProjects();

    const saved = localStorage.getItem("sort");
    if (saved && saved !== "undefined") {
      try {
        this.sortConfig = JSON.parse(saved);
      } catch (error) {
        this.sortConfig = "none";
        localStorage.removeItem("sort");
      }
    } else {
      this.sortConfig = "none";
    }

    const gridView = localStorage.getItem("gridView");
    if (gridView && gridView !== "undefined") {
      try {
        this.grid = JSON.parse(gridView);
      } catch (error) {
        this.grid = true;
        localStorage.removeItem("gridView");
      }
    }
  },

  watch: {
    "$route.params.id": {
      immediate: true,
      handler() {
        this.syncProjectFromRoute();
      },
    },

    sortConfig(val) {
      localStorage.setItem("sort", JSON.stringify(val));
    },

    grid(val) {
      localStorage.setItem("gridView", JSON.stringify(val));
    },
  },
};
</script>
