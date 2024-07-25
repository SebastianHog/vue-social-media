<template>
  <div id="register-form">
    <div class="flex flex-col w-1/3">
      <input
        type="email"
        id="email"
        placeholder="enter your email"
        class="bg-primary ml-2 mt-2 border-2 border-black p-2"
        ref="emailInput"
      />
      <input
        type="password"
        id="password"
        placeholder="enter your password"
        class="bg-primary ml-2 mt-2 border-2 border-black p-2"
        ref="passwordInput"
      />
      <div class="flex justify-between ml-3 text-sm">
        <router-link to="/register">
          dont have an account yet? make one!
        </router-link>
        <router-link to="" @click="loginUser">log in</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  methods: {
    async loginUser() {
      const password = this.$refs.passwordInput.value;
      const email = this.$refs.emailInput.value;

      try {
        const resp = await axios.post(
          "/login",
          { password, email },
          { withCredentials: true }
        );
        if (resp.status === 200) {
          // this.$store.commit("login", resp.data.accessToken);
          localStorage.setItem("accessToken", resp.data.accessToken);
          console.log(localStorage.getItem("accessToken"));
        }
      } catch (e) {
        console.log("Error:", e);
      }
    },
  },
};
</script>
