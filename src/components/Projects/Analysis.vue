<template>
  <section
    class="fixed inset-0 flex justify-center items-center p-5 bg-black/45 backdrop-blur-sm"
    @click.self="$emit('close')"
  >
    <div class="bg-white text-black p-5 rounded-md max-w-2xl w-full">
      <h1 class="font-bold">Project Analyis</h1>
      <Bar
        v-if="selected === 1"
        :data="processedData.type.data"
        :options="barOptions"
        class="my-4"
      />
      <Bar
        v-if="selected === 2"
        :data="processedData.frameworks.data"
        :options="barOptions"
        class="my-4"
      />
      <Pie
        v-if="selected === 3"
        :data="processedData.database.data"
        :options="pieOptions"
        class="my-4"
      />
      <Pie
        v-if="selected === 4"
        :data="processedData.language.data"
        :options="pieOptions"
        class="my-4"
      />
      <Bar
        v-if="selected === 5"
        :data="processedData.tools.data"
        :options="barOptions"
        class="my-4"
      />
      <div class="text-sm">
        <div class="grid grid-cols-3 gap-2 mb-2">
          <button
            v-for="btn in topButtons"
            :key="btn.id"
            @click="selected = btn.id"
            :class="buttonClass(btn.id)"
          >
            {{ btn.label }}
          </button>
        </div>
        <div class="grid grid-cols-2 gap-2">
          <button
            v-for="btn in bottomButtons"
            :key="btn.id"
            @click="selected = btn.id"
            :class="buttonClass(btn.id)"
          >
            {{ btn.label }}
          </button>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import ProjectService from "../../services/ProjectService";
import { Bar, Pie } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
);

const colors = [
  "#61dafb",
  "#ff6384",
  "#36a2eb",
  "#cc65fe",
  "#ffce56",
  "#68d89b",
  "#331e36",
  "#04e762",
  "#29339b",
  "#ff6384",
];

export default {
  name: "Analysis",

  components: { Bar, Pie },

  data() {
    return {
      projects: [],
      selected: 1,
    };
  },

  mounted() {
    window.addEventListener("keydown", this.handleEsc);
  },

  beforeMount() {
    window.removeEventListener("keydown", this.handleEsc);
  },

  methods: {
    async getProjects() {
      try {
        this.projects = await ProjectService.getProjects();
      } catch (error) {
        console.error("Error fetching projects: ", error);
      }
    },

    handleEsc(e) {
      if (e.key === "Escape") {
        this.$emit("close");
      }
    },

    buttonClass(id) {
      return [
        "rounded p-1",
        this.selected === id ? "bg-blue-500" : "bg-gray-200 cursor-pointer",
      ];
    },
  },

  created() {
    this.getProjects();
  },

  computed: {
    processedData() {
      const countItems = (key) => {
        const all = this.projects.flatMap((p) =>
          Array.isArray(p[key]) ? p[key] : [p[key]],
        );

        return all.reduce((acc, item) => {
          acc[item] = (acc[item] || 0) + 1;
          return acc;
        }, {});
      };

      const makeBar = (counts, color) => ({
        data: {
          labels: Object.keys(counts),
          datasets: [{ data: Object.values(counts), backgroundColor: color }],
        },
        options: this.barOptions,
      });

      const makePie = (counts) => ({
        data: {
          labels: Object.keys(counts),
          datasets: [{ data: Object.values(counts), backgroundColor: colors }],
        },
        options: this.pieOptions,
      });

      return {
        type: makeBar(countItems("type"), colors[0]),
        frameworks: makeBar(countItems("frameworks"), colors[1]),
        tools: makeBar(countItems("tools"), colors[2]),
        database: makePie(countItems("database")),
        language: makePie(countItems("language")),
      };
    },

    currentChart() {
      switch (this.selected) {
        case 2:
          return {
            extends: Bar,
            props: ["data", "options"],
            mounted() {
              this.renderChart(
                this.$parent.processedData.frameworks.data,
                this.$parent.processedData.frameworks.options,
              );
            },
          };
        case 3:
          return {
            extends: Pie,
            mounted() {
              this.renderChart(
                this.$parent.processedData.database.data,
                this.$parent.processedData.database.options,
              );
            },
          };
        case 4:
          return {
            extends: Pie,
            mounted() {
              this.renderChart(
                this.$parent.processedData.language.data,
                this.$parent.processedData.language.options,
              );
            },
          };
        case 5:
          return {
            extends: Bar,
            mounted() {
              this.renderChart(
                this.$parent.processedData.tools.data,
                this.$parent.processedData.tools.options,
              );
            },
          };
        default:
          return {
            extends: Bar,
            mounted() {
              this.renderChart(
                this.$parent.processedData.type.data,
                this.$parent.processedData.type.options,
              );
            },
          };
      }
    },

    barOptions() {
      return {
        responsive: true,
        maintainAspectRatio: true,
        aspectRatio: 2,
        plugins: {
          legend: { display: false },
          tooltip: { enabled: false },
        },
      };
    },

    pieOptions() {
      return {
        responsive: true,
        maintainAspectRatio: true,
        aspectRatio: 2,
      };
    },

    topButtons() {
      return [
        { id: 1, label: "Type" },
        { id: 2, label: "Frameworks" },
        { id: 3, label: "Database" },
      ];
    },

    bottomButtons() {
      return [
        { id: 4, label: "Languages" },
        { id: 5, label: "Tools" },
      ];
    },
  },
};
</script>
