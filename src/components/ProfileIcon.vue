<template>
  <router-link
    to="/profile/1"
    href="#"
    class="rounded-full border-4 border-green-500"
    :style="{ width: iconSize + 'px', height: iconSize + 'px' }"
  >
    <img
      src="https://thispersondoesnotexist.com/"
      alt=""
      class="w-full object-cover rounded-full"
    />
  </router-link>
</template>

<script>
export default {
  props: ["iconSize"],
};
</script>
