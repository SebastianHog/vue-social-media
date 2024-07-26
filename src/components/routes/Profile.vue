<template>
  <div class="p-2">
    <h1 class="text-2xl">{{ this.profileData.username }}</h1>
  </div>
</template>

<script>
import axios from "axios";

export default {
  props: ["id"],
  data() {
    return {
      profileData: {},
    };
  },
  methods: {},

  async mounted() {
    const token = localStorage.getItem("accessToken");
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const resp = await axios.get(`/user/${this.id}`, { headers });
    console.log(resp);
    this.profileData = resp.data;
    console.log(this.profileData);
  },
};
</script>
