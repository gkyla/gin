<script setup>
const { login } = await useAuth();

const currentUser = useState("currentUser");

const userLoginInfo = reactive({
  email: "",
  password: "",
});

async function handleLoginUser() {
  try {
    const userCredential = await login(
      userLoginInfo.email,
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
  <code>{{ currentUser }}</code>

  <div class="w-full min-h-screen flex flex-col items-center justify-center">
    <div id="panel" class="max-w-[320px] w-full">
      <div class="text-center mb-8">
        <h1 class="text-2xl font-bold text-center mb-2">Selamat Datang</h1>
        <p class="text-slate-500">
          Silakan Login dengan menggunakan NIS dan Password yang sudah kamu
          tentukan
        </p>
      </div>

      <form @submit.prevent="handleLoginUser" class="flex flex-col gap-3">
        <div class="flex flex-col">
          <!-- Pake email dulu -->
          <label for="nis" class="font-bold mb-1">NIS</label>
          <input
            v-model="userLoginInfo.email"
            type="text"
            id="nis"
            class="border rounded-md px-2 py-1"
            placeholder="Masukan NIS"
          />
        </div>
        <div class="flex flex-col">
          <label for="password" class="font-bold mb-1">Password</label>
          <input
            v-model="userLoginInfo.password"
            type="password"
            id="password"
            class="border rounded-md px-2 py-1"
            placeholder="Masukan Password"
          />
        </div>
        <button
          type="submit"
          class="bg-red-400 rounded-md p-2 font-bold text-white mt-3"
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
