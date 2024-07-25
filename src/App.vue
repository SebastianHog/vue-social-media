<template>
  <div>
    <div class="font-jockey bg-primary text-white">
      <Header class="fixed w-full h-16 z-10" />
      <div class="flex h-screen">
        <SideBar class="fixed top-16 w-64 h-full z-10" />
        <div class="flex-1 ml-56 mt-16 overflow-x-hidden h-full">
          <Router-View
            class="h-auto min-h-[85%] bg-primary border-2 border-black mb-20"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CreatePost from "./components/CreatePost.vue";
import Header from "./components/Header.vue";
import SideBar from "./components/SideBar.vue";
import Post from "./components/Post.vue";

export default {
  components: { Header, SideBar, CreatePost, Post },
};
</script>

<style></style>
