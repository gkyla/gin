<script setup></script>

<template>
  <div class="">
    <div class="flex flex-col">
      <form @submit.prevent="handleCreateUser" class="w-3/4">
        <div class="form-control w-full max-w-xs">
          <label class="label" for="nis-user">
            <span class="label-text">Nomor Induk Sekolah (NIS) Atau Email</span>
          </label>
          <input
            type="text"
            placeholder="Masukan Disini"
            id="nis-user"
            class="input input-bordered w-full max-w-xs"
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
        <button type="submit" class="btn btn-sm btn-neutral">Cari user</button>
        <div class="divider"></div>
      </form>

      <h1 class="text-lg">Informasi tentang user yang dicari :</h1>
      <!-- TODO: KASIH TOMBOL UBAH DISAMPING INPUT -->
      <div class="form-control mt-1 w-full max-w-xs">
        <label class="label" for="nis-result">
          <span class="label-text">NIS</span>
        </label>
        <input
          type="text"
          placeholder="Masukan Disini"
          id="nis-result"
          class="input input-sm input-bordered w-full max-w-xs"
        />
      </div>
      <div class="form-control mt-1 w-full max-w-xs">
        <label class="label" for="nama-result">
          <span class="label-text">Nama</span>
        </label>
        <input
          type="text"
          placeholder="Masukan Disini"
          id="nama-result"
          class="input input-sm input-bordered w-full max-w-xs"
        />
      </div>
      <div class="form-control mt-1 w-full max-w-xs">
        <label class="label" for="email-result">
          <span class="label-text">Email</span>
        </label>
        <input
          type="text"
          placeholder="Masukan Disini"
          id="email-result"
          class="input input-sm input-bordered w-full max-w-xs"
        />
      </div>
      <div class="form-control mt-1 w-full max-w-xs">
        <label class="label" for="role-result">
          <span class="label-text">Role (Saat ini)</span>
        </label>
        <input
          type="text"
          placeholder="Masukan Disini"
          id="role-result"
          class="input input-sm input-bordered w-full max-w-xs"
        />
      </div>
    </div>
  </div>
</template>
