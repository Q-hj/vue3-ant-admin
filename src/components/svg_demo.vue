<script setup lang="ts">
import SvgIcon from "@/components/SvgIcon/index.vue";

defineProps<{
  msg: string;
}>();
console.log(import.meta.env);
const { VITE_APP_TITLE, VITE_API_URL } = import.meta.env;
</script>

<template>
  <div class="greetings">
    <SvgIcon
      :style="{
        width: 50,
        height: 50,
        color: 'red',
      }"
      name="date"
    />
    <!-- <SvgIcon width="50" height="50" color="red" name="date" /> -->
    <h2 class="green">{{ VITE_APP_TITLE }}</h2>
    <h1 class="green">{{ msg }}</h1>
    <h3>
      You’ve successfully created a project with
      <a href="https://vitejs.dev/" target="_blank" rel="noopener">Vite</a> +
      <a href="https://vuejs.org/" target="_blank" rel="noopener">Vue 3</a>.
      What's next?
    </h3>
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
