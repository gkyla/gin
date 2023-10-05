<script setup>
import { onAuthStateChanged } from "firebase/auth";
const { auth } = await useFirebase();

const currentUser = useState("currentUser", () => null);
const isLoading = useState("isLoading", () => true);

onMounted(() => {
  onAuthStateChanged(auth, async (user) => {
    isLoading.value = true;
    if (user) {
      const tokenResult = await user.getIdTokenResult();
      console.log("ROLE", tokenResult.claims.role);
      currentUser.value = user;
      currentUser.value.role = tokenResult.claims.role;
      console.log(currentUser.value);
      console.log({ tokenResult });
    } else {
      currentUser.value = null;
    }
    isLoading.value = false;
  });
});
</script>

<template>
  <div class="min-h-screen h-full w-full">
    <h1 v-if="isLoading" class="text-2xl font-bold mt-24 text-black">
      Loading ...
    </h1>
    <div v-if="!isLoading">
      <TheNavbar />
      <div class="mt-20">
        testtt
        <slot />
      </div>
    </div>
  </div>
</template>
