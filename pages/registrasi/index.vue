<script setup>
const { login } = await useAuth();

const userRegistrationInfo = reactive({
  name: "",
  nis: "",
  email: "",
  role: "Pilih salah satu",
  password: "",
});

const errorSign = ref({});
const isLoading = ref(false);

async function handleRegistrationUser() {
  isLoading.value = true;
  const { data, error } = await useFetch("/api/auth/basic/create-account", {
    method: "POST",
    body: {
      ...userRegistrationInfo,
    },
  }).catch((fetchErr) => console.error(fetchErr));
  isLoading.value = false;

  if (error.value) {
    console.log(error.value?.data);
    errorSign.value = error.value?.data?.data;
  } else {
    errorSign.value = null;
    isLoading.value = true;
    const userCredential = await login(
      userRegistrationInfo.nis,
      userRegistrationInfo.password,
    );

    isLoading.value = false;
    if (userCredential) {
      console.log(userCredential);
      navigateTo("/dashboard");
    } else {
      console.log("no user credential");
    }
  }
}

/* TODO: fungi registrasi, alihkan user ke dashboard jika user sudah login */
definePageMeta({
  middleware: ["auth"],
});
</script>

<template>
  <div class="w-full h-full flex items-center justify-center -mt-10">
    <div id="panel" class="max-w-[320px] w-full">
      <div class="text-center mb-8">
        <h1 class="text-2xl font-bold text-center mb-2">Selamat Datang</h1>
        <p class="text-slate-500">
          Silakan Registrasi dengan menggunakan NIS dan Password yang valid
        </p>
      </div>

      <div
        v-if="errorSign.isError"
        class="bg-red-300 text-slate-600 rounded-xl shadow my-2 p-3"
      >
        {{ errorSign.message || "" }}
      </div>
      <form
        @submit.prevent="handleRegistrationUser"
        class="flex flex-col gap-2"
      >
        <div class="form-control w-full max-w-xs">
          <label class="label" for="Nama">
            <span class="label-text font-bold">Nama</span>
          </label>
          <input
            v-model="userRegistrationInfo.name"
            type="text"
            id="Nama"
            placeholder="Masukan Nama"
            class="input input-bordered w-full max-w-xs"
          />
        </div>
        <div class="form-control w-full max-w-xs">
          <label class="label" for="nis">
            <span class="label-text font-bold">NIS</span>
          </label>
          <input
            v-model="userRegistrationInfo.nis"
            type="text"
            id="nis"
            placeholder="Masukan NIS"
            class="input input-bordered w-full max-w-xs"
          />
        </div>
        <div class="form-control w-full max-w-xs">
          <label class="label" for="email">
            <span class="label-text font-bold">Email</span>
          </label>
          <input
            v-model="userRegistrationInfo.email"
            type="text"
            id="email"
            placeholder="Masukkan Email"
            class="input input-bordered w-full max-w-xs"
          />
        </div>
        <div class="form-control w-full max-w-xs mt-2">
          <label class="label" for="role">
            <span class="label-text font-bold">Kamu adalah: </span>
          </label>
          <select
            class="select select-bordered"
            id="role"
            v-model="userRegistrationInfo.role"
          >
            <option disabled selected>Pilih salah satu</option>
            <option value="Alumni">Alumni</option>
            <option value="DU/DI">DU/DI</option>
          </select>
        </div>
        <div class="form-control w-full max-w-xs">
          <label class="label" for="password">
            <span class="label-text font-bold">Kata sandi</span>
          </label>
          <input
            v-model="userRegistrationInfo.password"
            type="password"
            id="password"
            placeholder="Masukan Kata Sandi"
            class="input input-bordered w-full max-w-xs"
          />
        </div>
        <button
          v-if="!isLoading"
          type="submit"
          class="btn hover:bg-red-300 bg-red-400 rounded-md p-2 font-bold text-white mt-3"
        >
          Registrasi
        </button>
        <button
          v-if="isLoading"
          type="submit"
          disabled
          class="btn hover:bg-red-300 bg-red-400 rounded-md p-2 font-bold text-white mt-3 flex justify-center items-center"
        >
          <div class="loading loading-spinner loading-md text-red-400"></div>
        </button>
      </form>

      <button class="text-sm flex justify-center w-full mt-2">
        <span>Kamu lupa password ? Reset password</span>
      </button>
    </div>
  </div>
</template>
