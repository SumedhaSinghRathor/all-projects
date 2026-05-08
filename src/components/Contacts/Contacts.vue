<template>
  <section class="grid grid-cols-3 gap-x-4 gap-y-6">
    <div
      v-for="contact in contacts.sort((a, b) =>
        a.linkTo.localeCompare(b.linkTo),
      )"
      :key="contact.id"
      class="border flex justify-between p-2 rounded hover:-translate-y-1 hover:shadow-xl hover:bg-gray-300 duration-100 group"
    >
      <div>
        <h2 class="capitalize font-bold">{{ contact.linkTo }}</h2>
        <a
          :href="contact.link"
          target="_blank"
          class="text-[#0000ff] group-hover:underline"
          >{{ contact.content }}</a
        >
      </div>
      <div class="size-12 p-2 overflow-clip border-2 rounded-full bg-[#fffafa]">
        <img :src="contact.logo" alt="" />
      </div>
    </div>
  </section>
</template>
<script>
import ContactService from "../../services/ContactService";

export default {
  name: "Contacts",

  data() {
    return {
      contacts: [],
    };
  },

  methods: {
    async getContacts() {
      try {
        this.contacts = await ContactService.getContact();
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    },
  },

  mounted() {
    this.getContacts();
  },
};
</script>
