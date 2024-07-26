<template>
  <button
    v-if="!isPostMode"
    @click="togglePostForm"
    class="rounded-full border border-black h-14 w-14 text-5xl cursor-pointer hover:bg-opacity-15 hover:bg-black duration-200"
  >
    <p class="flex justify-center items-center pb-4">&#43;</p>
  </button>
  <div v-else class="w-1/2 h-3/5 border-2 border-black bg-primary rounded-md">
    <div class="w-full h-full bg-white p-2 bg-opacity-5">
      <header class="flex justify-between">
        <button class="font-bold mr-2 text-2xl" @click="togglePostForm">
          &#x2715;
        </button>
      </header>
      <form class="h-full" @submit.prevent="submitPost">
        <textarea
          rows="15"
          v-model="postText"
          placeholder="what's on your mind?"
          class="w-full h- p-1 mt-4 bg-primary resize-none"
        ></textarea>
        <div
          id="form-buttons"
          class="flex items-center right-4 bottom-8 absolute gap-2"
        >
          <input
            id="file-upload"
            type="file"
            class="invisible"
            @change="addFileToPost"
            ref="fileUpload"
          />

          <div>
            <img
              v-if="postFileUrl"
              :src="postFileUrl"
              alt="file-preview"
              class="w-12 object-cover"
            />
            <label
              for="file-upload"
              class="cursor-pointer border-2 border-white px-2"
              >upload file</label
            >
          </div>

          <button
            @click="submitPost"
            class="border-2 border-secondary bg-primary px-2 rounded-lg text-lg tracking-wide"
          >
            post
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import getCurrentUserId from "../utils/getCurrentUserId.js";

export default {
  data() {
    return {
      isPostMode: false,
      postText: "",
      postFileUrl: null,
      originalFile: "",
      authorId: 0,
      authorName: "default author",
    };
  },
  methods: {
    togglePostForm() {
      this.isPostMode = !this.isPostMode;
    },
    addFileToPost(event) {
      const file = event.target.files[0];
      this.originalFile = file;
      this.postFileUrl = URL.createObjectURL(file);
    },
    submitPost() {
      if (this.authorId === null) {
        console.error("Author ID is not set.");
        return;
      }

      switch (this.originalFile.type) {
        case "video/mp4":
          this.$emit(
            "submitVideoPost",
            this.postText,
            this.postFileUrl,
            "video",
            this.authorName
          );
          break;
        case "image/jpeg":
        case "image/png":
          this.$emit(
            "submitImagePost",
            this.postText,
            this.postFileUrl,
            "image",
            this.authorName
          );
          break;
        default:
          this.$emit("submitTextPost", this.postText, this.authorName);
          break;
      }
      this.resetForm();
    },
    resetForm() {
      this.isPostMode = false;
      this.postText = "";
      this.postFileUrl = null;
    },
  },
  async mounted() {
    const currentUserId = await getCurrentUserId(
      localStorage.getItem("accessToken")
    );
    console.log("CreatePost.vue, Current userID", currentUserId);

    const token = localStorage.getItem("accessToken");
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const resp = await axios
      .get(`/user/${currentUserId}`, { headers })
      .then((q) => q.data);

    this.authorName = resp.username;
    this.authorId = currentUserId;
  },
};
</script>
