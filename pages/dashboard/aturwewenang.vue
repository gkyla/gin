<script setup>
// const { getUserData } = await useFirestore();
const { validateUsernameOrEmail } = useValidator();

const loading = ref(true);
const errorSign = ref("");
const searchBar = ref("");
const user = ref(null);
const isUser = computed(() => user.value != null);
const disableChangeUserData = reactive({
  username: true,
  name: true,
  email: true,
  role: true,
});

const beforeUpdateUserState = ref(null);

async function findUser() {
  const validate = validateUsernameOrEmail(searchBar.value);
  if (validate.error) {
    errorSign.value = validate.error;
    return;
  } else {
    errorSign.value = "";
  }
  console.log(validate);

  const { data: userData, error } = await useFetch("/api/auth/admin/users", {
    method: "POST",
    body: {
      userInput: validate.value,
    },
  });

  if (!error.value) {
    console.log("value user :", userData.value);

    if (userData.value) {
      user.value = { ...userData.value };
      beforeUpdateUserState.value = { ...userData.value };
    }
  } else {
    user.value = null;
    errorSign.value = error.value.statusMessage;
  }
}

async function updateUserInfo() {
  console.log(user.value);
  const { data, error } = await useFetch("/api/auth/admin/users/update", {
    method: "POST",
    body: {
      userInput: {
        id: user.value.data.id,
        username: user.value.data.username,
        email: user.value.data.email,
        name: user.value.metadata.name,
      },
    },
  });

  if (error.value) {
    errorSign.value = error.value.statusMessage;
  } else {
    alert(data.value.message);
  }
}

function toggleChange(field) {
  /* field = property */
  disableChangeUserData[field] = !disableChangeUserData[field];
}
</script>

<template>
  <div class="">
    <div class="flex flex-col">
      <div class="grid w-full justify-center">
        <div class="prose prose-md text-center mt-4">
          <h1 class="text-2xl">Atur Wewenang</h1>
          <p>
            Cari user menggunakan Username atau menggunakan email yang terdaftar
          </p>
        </div>
        <div role="alert" v-if="errorSign" class="alert alert-error mt-5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>{{ errorSign }}</span>
        </div>
        <form @submit.prevent="findUser" class="flex items-center my-2">
          <div class="form-control w-full max-w-lg">
            <label class="label" for="username-user">
              <span class="label-text">Username Atau Email</span>
            </label>
            <input
              v-model="searchBar"
              type="text"
              placeholder="Masukan Disini"
              id="username-user"
              class="input input-bordered w-full max-w-lg"
            />
          </div>
          <div class="flex gap-5 my-2 items-center">
            <!-- <h1 class="my-2">Role Sekarang</h1> -->
            <!-- <button class="btn btn-sm btn-info">Periksa Role</button> -->
          </div>

          <!-- <div class="form-control w-full max-w-xs mt-2">
          <label class="label">
            <span class="label-text">Atur sebagai</span>
          </label>
          <select class="select select-bordered">
            <option disabled selected>Pilih salah satu</option>
            <option value="Admin">- Admin</option>
            <option value="Alumni">- Alumni</option>
            <option value="DU/DI">- DU/DI</option>
          </select>
         </div> -->
          <button type="submit" class="btn btn-neutral self-end ml-2">
            Cari user
          </button>
        </form>
      </div>
      <div class="divider"></div>

      <div class="relative">
        <div v-if="!isUser" class="min-h-[300px] grid place-content-center">
          <div class="grid place-items-center">
            <span class="font-bold">User yang dicari akan muncul disini</span>
            <!-- <span class="loading loading-spinner loading-lg"></span> -->
          </div>
        </div>
        <div v-if="isUser">
          <!-- blur-sm pointer-events-none -->
          <h1 class="text-lg">Informasi tentang user yang dicari :</h1>

          <!-- TODO: KASIH TOMBOL UBAH DISAMPING INPUT -->
          <form class="max-w-sm">
            <div class="form-control mt-1 w-full">
              <label class="label" for="username-result">
                <span class="label-text">Username</span>
              </label>
              <div class="flex items-center">
                <input
                  type="text"
                  placeholder="Masukan Disini"
                  id="email-result"
                  class="input input-bordered w-full"
                  :disabled="disableChangeUserData.username"
                  v-model="user.data.username"
                />
                <button
                  @click="toggleChange('username')"
                  type="button"
                  class="btn btn-sm btn-error ml-3"
                >
                  ubah
                </button>
              </div>
            </div>
            <div class="form-control mt-1 w-full">
              <label class="label" for="nama-result">
                <span class="label-text">Nama</span>
              </label>
              <div class="flex items-center">
                <input
                  type="text"
                  placeholder="Masukan Disini"
                  id="email-result"
                  class="input input-bordered w-full"
                  :disabled="disableChangeUserData.name"
                  v-model="user.metadata.name"
                />
                <button
                  @click="toggleChange('name')"
                  type="button"
                  class="btn btn-sm btn-error ml-3"
                >
                  ubah
                </button>
              </div>
            </div>
            <div class="form-control mt-1 w-full">
              <label class="label" for="email-result">
                <span class="label-text">Email</span>
              </label>
              <div class="flex items-center">
                <input
                  type="text"
                  placeholder="Masukan Disini"
                  id="email-result"
                  class="input input-bordered w-full"
                  :disabled="disableChangeUserData.email"
                  v-model="user.data.email"
                />
                <button
                  @click="toggleChange('email')"
                  type="button"
                  class="btn btn-sm btn-error ml-3"
                >
                  ubah
                </button>
              </div>
            </div>
            <div class="form-control mt-1 w-full">
              <label class="label" for="role-result">
                <span class="label-text">Role (Saat ini)</span>
              </label>
              <div class="flex items-center">
                <input
                  type="text"
                  placeholder="Masukan Disini"
                  id="email-result"
                  class="input input-bordered w-full"
                  :disabled="disableChangeUserData.role"
                />
                <button
                  @click="toggleChange('role')"
                  type="button"
                  class="btn btn-sm btn-error ml-3"
                >
                  ubah
                </button>
              </div>
            </div>
            <button
              @click="updateUserInfo"
              type="button"
              class="btn btn-neutral mt-5"
            >
              Lakukan perubahan
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
