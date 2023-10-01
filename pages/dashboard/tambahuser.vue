<script setup>
const dataUser = reactive({
  nis: "",
  email: "",
  password: "",
  role: "Pilih salah satu",
});

const errorMsg = reactive({
  nis: "",
  email: "",
  password: "",
  role: "",
});

function handleCreateUser() {
  if (dataUser.role === "Pilih salah satu") {
    errorMsg.role = "Setidak nya pilih salah satu role";
    return;
  }

  // if (!dataUser.email) {
  //   errorMsg.email = "Email tidak boleh kosong";
  //   return;
  // }
  // if (!dataUser.password) {
  //   errorMsg.email = "Password tidak boleh kosong";
  //   return;
  // }

  // if (!dataUser.email) {
  //   errorMsg.email = "Email tidak boleh kosong";
  //   return;
  // }

  // for (const msg in errorMsg) {
  //   if (msg !== "") {
  //     return;
  //   }
  // }

  console.log("user created", dataUser);
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
          user tersebut (dibalik layar email tetap akan dibuat dengan format
          nis_user@namawebsite.com)
        </li>
      </ul>
      <ul>
        <li>
          Role yang dipilih pada saat pembuatan user baru pada menu "Tambahkan
          sebagai" akan berpengaruh kepada flexibilitas user tersebut
        </li>
      </ul>
    </div>
  </div>
</template>
