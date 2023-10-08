<script setup></script>

<template>
  <div class="">
    <div class="flex flex-col">
      <div class="grid grid-cols-2">
        <form @submit.prevent="handleCreateUser">
          <div class="form-control w-full max-w-xs">
            <label class="label" for="nis-user">
              <span class="label-text"
                >Nomor Induk Sekolah (NIS) Atau Email</span
              >
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
          <button type="submit" class="btn btn-neutral">Cari user</button>
        </form>
        <div class="prose prose-md">
          <h1 class="text-2xl">Cara :</h1>
          <p>Cari user menggunakan NIS atau menggunakan email yang terdaftar</p>
        </div>
      </div>
      <div class="divider"></div>

      <div class="relative">
        <div
          class="toast toast-top toast-start absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 text-center"
        >
          <div
            class="flex items-center justify-center text-center alert alert-warning shadow-md"
          >
            <span class="font-bold">User yang dicari akan muncul disini</span>
          </div>
        </div>

        <div class="blur-sm pointer-events-none">
          <!-- blur-sm pointer-events-none -->
          <h1 class="text-lg">Informasi tentang user yang dicari :</h1>
          <!-- TODO: KASIH TOMBOL UBAH DISAMPING INPUT -->
          <form class="max-w-sm">
            <div class="form-control mt-1 w-full">
              <label class="label" for="nis-result">
                <span class="label-text">NIS</span>
              </label>
              <div class="flex items-center">
                <input
                  type="text"
                  placeholder="Masukan Disini"
                  id="email-result"
                  class="input input-bordered w-full"
                  :disabled="true"
                />
                <button type="button" class="btn btn-sm btn-error ml-3">
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
                  :disabled="true"
                />
                <button type="button" class="btn btn-sm btn-error ml-3">
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
                  :disabled="true"
                />
                <button type="button" class="btn btn-sm btn-error ml-3">
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
                  :disabled="true"
                />
                <button type="button" class="btn btn-sm btn-error ml-3">
                  ubah
                </button>
              </div>
            </div>
            <button type="submit" class="btn btn-neutral mt-5">
              Cari user
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
