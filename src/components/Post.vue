<template>
  <div
    class="h-auto w-[40rem] bg-black bg-opacity-15 m-4 rounded-sm p-1 tracking-wider"
  >
    <div class="flex items-center gap-2">
      <ProfileIcon :iconSize="42" />
      <h1 class="text-2xl">{{ postAuthor }}</h1>
      <div class="flex flex-col">
        <div class="px-1 leading-3 font-thin flex gap-2">
          <router-link
            :to="tag"
            class="px-2 pb-1 py-1 border-2 border-secondary rounded-full flex items-center justify-center"
            v-for="tag in postTags"
            :key="tag"
            >{{ tag }}</router-link
          >
        </div>
      </div>
    </div>
    <p v-if="postText" class="p-1 leading-4 tracking-normal">
      {{ postText }}
    </p>
    <component
      v-if="postMedia"
      :is="postType === 'video' ? 'video' : 'img'"
      :src="postMedia"
      alt="user-media"
      class="max-w-96 my-2"
      v-bind="{ autoplay: postType === 'video', loop: postType === 'video' }"
    ></component>
  </div>
</template>

<script>
import axios from "axios";
import ProfileIcon from "./ProfileIcon.vue";

export default {
  components: { ProfileIcon },
  data() {
    return {
      postAuthor: null,
    };
  },
  props: [
    "postTitle",
    "postText",
    "postMedia",
    "postTags",
    "postType",
    "postAuthorId",
  ],
  async mounted() {
    const postAuthorData = await axios.get(`/user/${this.postAuthorId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    this.postAuthor = postAuthorData.username;
  },
};
</script>
