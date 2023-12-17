<script setup>
const { login } = await useAuth();

const userLoginInfo = reactive({
  nis: "",
  email: "",
  password: "",
});

async function handleLoginUser() {
  try {
    const userCredential = await login(
      userLoginInfo.nis,
      userLoginInfo.password,
    );
    console.log(userCredential);
    if (userCredential) {
      await navigateTo("/dashboard");
    }
  } catch (error) {
    console.error(error);
  }
}

definePageMeta({
  middleware: ["auth"],
});
</script>

<template>
  <div class="w-full h-full flex items-center justify-center -mt-20">
    <div id="panel" class="max-w-[320px] w-full">
      <div class="text-center mb-8">
        <h1 class="text-2xl font-bold text-center mb-2">Selamat Datang</h1>
        <p class="text-slate-500">
          Silakan Login dengan menggunakan NIS dan Password yang sudah kamu
          tentukan
        </p>
      </div>

      <form @submit.prevent="handleLoginUser" class="flex flex-col gap-3">
        <div class="form-control w-full max-w-xs">
          <label class="label" for="nis">
            <span class="label-text font-bold">NIS</span>
          </label>
          <input
            v-model="userLoginInfo.nis"
            type="text"
            id="nis"
            placeholder="Type here"
            class="input input-bordered w-full max-w-xs"
          />
        </div>
        <div class="form-control w-full max-w-xs">
          <label class="label" for="password">
            <span class="label-text font-bold">Password</span>
          </label>
          <input
            v-model="userLoginInfo.password"
            type="password"
            id="password"
            placeholder="Type here"
            class="input input-bordered w-full max-w-xs"
          />
        </div>
        <button
          type="submit"
          class="btn hover:bg-red-300 bg-red-400 rounded-md p-2 font-bold text-white mt-3"
        >
          Login
        </button>
      </form>
      <button class="text-sm flex justify-center w-full mt-2">
        <span>Kamu lupa password ? Reset password</span>
      </button>
    </div>
  </div>
</template>
