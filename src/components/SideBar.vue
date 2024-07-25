<template>
  <div class="min-w-56 max-w-56 h-[89.3vh] bg-primary">
    <h1 class="text-gray-600 text-2xl p-2 underline">categories</h1>
    <ul
      class="h-80 overflow-y-scroll scrollbar-thin pb-2 border-b border-black"
    >
      <li>
        <router-link to="/admin">admin panel</router-link>
      </li>
      <li v-for="category in categories" :key="category" class="ml-4 h-5 mb-2">
        <a :href="category" class="p-0 m-0">{{ category }}</a>
        <hr class="w-32 bg-black text-black border-gray-400" />
      </li>
    </ul>
    <div class="p-2 text-gray-500 text-sm">
      <p>contact: seblhog@gmail.com</p>
      <p>created by: Sebastian Högsander</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      categories: [
        "comedy",
        "dance",
        "cats",
        "pets",
        "sport",
        "lipsync",
        "dogs",
        "cars",
        "clothes",
        "DIY",
        "renovation",
        "travel",
        "education",
        "books",
        "adventure",
        "music",
        "food",
        "health",
        "technology",
        "science",
        "photography",
        "gardening",
        "beauty",
        "fitness",
        "gaming",
      ],
    };
  },
};
</script>

<style scoped>
.scrollbar-thin::-webkit-scrollbar {
  width: 0px;
}
</style>
