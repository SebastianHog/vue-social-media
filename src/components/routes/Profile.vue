<template>
  <div class="p-2">
    <h1 class="text-2xl">Name nameperson</h1>
    <button class="" @click="logOut">Log out</button>
  </div>
</template>

<script>
export default {
  props: ["userId"],
  methods: {
    logOut() {
      localStorage.clear("accessToken");
    },
  },
};
</script>
