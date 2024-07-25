<template>
  <div id="register-form">
    <div class="flex flex-col w-1/3">
      <input
        type="text"
        id="username"
        placeholder="select a username"
        class="bg-primary ml-2 mt-2 border-2 border-black p-2"
        ref="usernameInput"
      />
      <input
        type="password"
        id="password"
        placeholder="select a password"
        class="bg-primary ml-2 mt-2 border-2 border-black p-2"
        ref="passwordInput"
      />
      <input
        type="email"
        id="email"
        placeholder="enter your email"
        class="bg-primary ml-2 mt-2 border-2 border-black p-2"
        ref="emailInput"
      />
      <div class="flex justify-between ml-3 text-sm">
        <router-link to="/login">
          already have an account? sign in!
        </router-link>
        <router-link to="#" @click="registerUser">register</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  methods: {
    async registerUser() {
      const username = this.$refs.usernameInput.value;
      const password = this.$refs.passwordInput.value;
      const email = this.$refs.emailInput.value;
      console.log("Username: ", username);

      await axios.post("/register", { username, password, email });
    },
  },
};
</script>
