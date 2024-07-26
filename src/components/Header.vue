<template>
  <div class="w-full h-22 flex justify-between items-center p-2 bg-primary">
    <router-link to="/" class="font-bold text-6xl tracking-wide"
      >Browsarr</router-link
    >
    <div class="w-auto flex gap-32 text-2xl">
      <router-link to="/home">home</router-link>
      <router-link to="/feed">following</router-link>
      <router-link to="/trending">trending</router-link>
      <router-link to="/discover">discover</router-link>
    </div>
    <ProfileIcon :iconSize="56" :linkTo="'me'" />
  </div>
</template>

<script>
import ProfileIcon from "./ProfileIcon.vue";

export default {
  components: {
    ProfileIcon,
  },
  data() {
    return {
      loggedin: false,
    };
  },
  mounted() {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken === undefined || accessToken === null)
      return (this.loggedin = false);
    console.log("User is logged in");
  },
};
</script>
