<template>
  <div class="p-2">
    <h1 class="text-2xl">{{ this.profileData.username }}</h1>
  </div>
</template>

<script>
import axios from "axios";
import getCurrentUserId from "@/utils/getCurrentUserId";

export default {
  props: ["userId"],
  data() {
    return {
      profileData: {},
    };
  },
  methods: {},

  async mounted() {
    const token = localStorage.getItem("accessToken");
    // const id = await getCurrentUserId(token);
    // const headers = {
    //   Authorization: `Bearer ${token}`,
    // };
    //MAKE IT SO THAT THIS SHOWS THE ID THAT IS IN THE URL
    const resp = await axios.get(`/user/${id}`, { headers });
    this.profileData = resp.data;
    console.log(this.profileData);
  },
};
</script>
