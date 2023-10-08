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
      console.log("ROLE", tokenResult.claims?.role);
      currentUser.value = user;
      currentUser.value.role = tokenResult.claims?.role;
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
  <div class="min-h-screen h-full w-full relative">
    <h1 v-if="isLoading" class="text-2xl font-bold mt-24 text-black">
      Loading ...
    </h1>
    <div v-if="!isLoading" class="">
      <TheNavbar />
      <div class="mt-20 absolute top-0 left-0 right-0 bottom-0">
        w
        <slot />
      </div>
    </div>
  </div>
</template>
