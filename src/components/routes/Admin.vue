<template>
  <div class="flex gap-3">
    <router-link to="/login" class="border-2 border-black rounded-md p-2"
      >log in</router-link
    >
    <router-link to="/register" class="border-2 border-black rounded-md p-2"
      >register</router-link
    >
    <button class="border-2 border-black rounded-md p-2" @click="logOut">
      Log out
    </button>
  </div>
  <div class="grid grid-cols-2">
    <div class="flex items-center justify-center h-16">
      <button
        @click="clearUsers"
        class="border-black border-2 h-12 px-3 hover:bg-black hover:bg-opacity-15 min-w-16"
      >
        Clear all users
      </button>
    </div>

    <div>
      <ul>
        <li v-for="user in users" :key="user.id">
          <div class="border-white border-2 pl-1 my-1 w-96">
            <p>user ID: {{ user.id }}</p>
            <p>username: {{ user.username }}</p>
            <p>email: {{ user.email }}</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  methods: {
    clearUsers() {
      axios.delete("/clearUsers");
    },

    logOut() {
      localStorage.clear("accessToken");
    },
  },
  data() {
    return {
      users: [],
    };
  },
  async mounted() {
    console.log("Mounted");
    const resp = await axios.get("/users", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    this.users = resp.data;
    console.log(this.users);
  },
};
</script>
