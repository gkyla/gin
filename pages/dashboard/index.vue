<script setup>
const currentUser = useState("currentUser");

definePageMeta({
  middleware: ["auth"],
});
</script>

<template>
  <!-- <div v-if="!currentUser">Loading...</div> -->
  <div>
    <code>{{ currentUser }}</code>

    <div>dashboard element</div>
  </div>
</template>
