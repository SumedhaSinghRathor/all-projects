<template>
  <div
    class="w-full flex items-center bg-black aspect-video relative border-2 border-black rounded-lg text-white overflow-clip"
  >
    <div
      class="flex transition-transform duration-300"
      :style="{ transform: `translateX(-${curr * 100}%)` }"
    >
      <img
        v-for="(item, index) in imgset"
        :key="index"
        :src="item"
        :alt="`slide-${index}`"
        class="w-full h-full object-cover shrink-0"
      />
    </div>
    <div
      v-if="imgset.length > 1"
      class="w-full flex p-2 justify-between absolute top-1/2 -translate-y-1/2"
    >
      <i
        class="bx bx-chevron-left text-2xl bg-red-400 rounded-full cursor-pointer"
        @click="prev"
      ></i>
      <i
        class="bx bx-chevron-right text-2xl bg-red-400 rounded-full cursor-pointer"
        @click="next"
      ></i>
    </div>
  </div>
</template>
<script>
export default {
  name: "ImgSet",
  props: { imgset: { type: Array, default: () => [] } },
  data() {
    return {
      curr: 0,
    };
  },
  methods: {
    next() {
      this.curr = (this.curr + 1) % this.imgset.length;
    },
    prev() {
      this.curr = (this.curr - 1 + this.imgset.length) % this.imgset.length;
    },
  },
  watch: {
    imgset() {
      this.curr = 0;
    },
  },
};
</script>
