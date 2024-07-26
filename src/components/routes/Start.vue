<template>
  <div class="h-auto bg-primary mb-20 flex flex-col-reverse">
    <CreatePost
      class="bottom-4 right-6 fixed"
      @submitImagePost="newImagePost"
      @submitVideoPost="newVideoPost"
      @submitTextPost="newTextpost"
    />
    <div v-for="post in feedPosts" :key="post.id">
      <Post
        :postText="post.content"
        :postMedia="post.media_url"
        :postType="post.media_type"
        :postAuthorId="post.author_id"
      />
    </div>
  </div>
</template>

<script>
import CreatePost from "../CreatePost.vue";
import Header from "../Header.vue";
import SideBar from "../SideBar.vue";
import Post from "../Post.vue";
import axios from "@/axios"; // Use the axios instance with interceptor

export default {
  name: "Start",
  components: { Header, SideBar, CreatePost, Post },
  data() {
    return {
      feedPosts: [],
    };
  },
  methods: {
    async newTextpost(text, authorId) {
      const newPost = {
        author_id: authorId, // This should be dynamic, typically from the logged-in user context
        text: text,
      };
      await this.sendPostToDB(newPost.author_id, text);
    },
    async newImagePost(text, image, authorId) {
      const newPost = {
        author_id: authorId, // This should be dynamic
        text: text,
        media_type: "image",
        media_url: image,
      };
      await this.sendPostToDB(
        newPost.author_id,
        text,
        newPost.media_type,
        image
      );
    },
    async newVideoPost(text, video, authorId) {
      const newPost = {
        author_id: authorId, // This should be dynamic
        text: text,
        media_type: "video",
        media_url: video,
      };
      await this.sendPostToDB(
        newPost.author_id,
        text,
        newPost.media_type,
        video
      );
    },
    async sendPostToDB(author_id, text, media_type = null, media_url = null) {
      try {
        const resp = await axios.post("/post", {
          author_id,
          text,
          media_type,
          media_url,
        });
        console.log("Sent post to backend:", resp);
        this.fetchPosts(); // Refresh the posts after adding a new one
      } catch (error) {
        console.error("Error sending post:", error);
      }
    },
    async fetchPosts() {
      try {
        const token = localStorage.getItem("accessToken");
        const headers = {
          Authorization: `Bearer ${token}`,
        };
        const response = await axios.get("/posts", { headers });
        this.feedPosts = response.data;
        console.log("Fetched posts:", this.feedPosts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    },
  },
  async mounted() {
    await this.fetchPosts();
  },
};
</script>

<style>
#app {
  height: 100vh;
  width: 100vw;
  margin: 0;
  padding: 0;
  color: white;
  overflow: hidden;
}
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
</style>
