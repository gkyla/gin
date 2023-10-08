<script setup>
const currentUser = useState("currentUser");
const { auth } = await useFirebase();

const dataUser = reactive({
  nis: "",
  email: "",
  password: "",
  role: "Pilih salah satu",
  name: "",
});

const errorMsg = reactive({
  nis: "",
  email: "",
  password: "",
  role: "",
});

async function handleCreateUser() {
  try {
    if (dataUser.role === "Pilih salah satu") {
      errorMsg.role = "Setidak nya pilih salah satu role";
      return;
    }
    const currentUserIdToken = await auth.currentUser.getIdToken(true);
    const { data, error } = await useFetch("/admin/createAccount", {
      body: {
        idToken: currentUserIdToken,
        ...dataUser,
      },
      method: "POST",
    });

    if (data.value) {
      console.log({ data });
    }

    if (error.value) {
      throw createError(error.value);
    }
  } catch (error) {
    console.error(error);
  }
}
</script>

<template>
  <!-- Wrapped by flex-1 (dashboard) -->
  <div class="flex">
    <form @submit.prevent="handleCreateUser" class="w-3/4">
      <div class="form-control w-full max-w-xs">
        <label class="label" for="nis-user">
          <span class="label-text">Nomor Induk Sekolah (NIS)</span>
        </label>
        <input
          v-model="dataUser.nis"
          type="text"
          placeholder="Masukan Disini"
          id="nis-user"
          class="input input-bordered w-full max-w-xs"
        />
      </div>
      <div class="form-control w-full max-w-xs mt-2">
        <label class="label" for="email-user">
          <span class="label-text">Email</span>
        </label>
        <input
          v-model="dataUser.email"
          type="text"
          id="email-user"
          placeholder="Masukan Disini"
          class="input input-bordered w-full max-w-xs"
        />
      </div>
      <div class="form-control w-full max-w-xs mt-2">
        <label class="label" for="name-user">
          <span class="label-text">Nama</span>
        </label>
        <input
          v-model="dataUser.name"
          type="text"
          id="name-user"
          placeholder="Masukan Disini"
          class="input input-bordered w-full max-w-xs"
        />
      </div>
      <div class="form-control w-full max-w-xs mt-2">
        <label class="label" for="password-user">
          <span class="label-text">Password</span>
        </label>
        <input
          v-model="dataUser.password"
          type="password"
          id="password-user"
          placeholder="Masukan Disini"
          class="input input-bordered w-full max-w-xs"
        />
      </div>
      <div class="form-control w-full max-w-xs mt-2">
        <label class="label">
          <span class="label-text">Tambahkan sebagai</span>
        </label>
        <select class="select select-bordered" v-model="dataUser.role">
          <option disabled selected>Pilih salah satu</option>
          <option value="Admin">- Admin</option>
          <option value="Alumni">- Alumni</option>
          <option value="DU/DI">- DU/DI</option>
        </select>
      </div>
      <button type="submit" class="btn mt-4 btn-neutral">Tambah Siswa</button>
    </form>
    <!-- End Form -->

    <div class="flex flex-col p2 rounded-lg prose prose-md w-full">
      <h2>Aturan pembuatan user :</h2>
      <ul>
        <li>
          Email disarankan agar diisi oleh user agar bisa dipulihkan lewat
          email, namun jika tidak maka hanya admin yang bisa mereset password
          user tersebut
        </li>
      </ul>
      <ul>
        <li>
          Role yang dipilih pada saat pembuatan user baru pada menu "Tambahkan
          sebagai" akan berpengaruh kepada hak akses user tersebut terhadap
          website
        </li>
      </ul>
    </div>
  </div>
</template>
