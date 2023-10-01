<script setup>
const currentUser = useState("currentUser");

definePageMeta({
  middleware: [
    "auth",
    (to, from) => {
      if (to.path === "/dashboard") {
        return navigateTo("/dashboard/info");
      }
    },
  ],
});
</script>

<template>
  <!-- <div v-if="!currentUser">Loading...</div> -->
  <div class="max-w-screen-xl mx-auto px-1">
    <div class="flex gap-5">
      <!-- <code>{{ currentUser }}</code> -->
      <div class="bg-base-100 max-w-[265px] w-full py-5 rounded-xl shadow-md">
        <div class="flex mb-2">
          <div class="avatar mx-auto">
            <div class="w-24 mask mask-squircle bg-[#09435b]">
              <img
                src="https://icons.veryicon.com/png/o/business/multi-color-financial-and-business-icons/user-139.png"
                class="w-[550px] h-[550px] object-fill"
              />
            </div>
          </div>
        </div>
        <div class="flex flex-col items-center gap-1">
          <h1 class="text-center font-bold text-slate-600">Hi, Garry Ongko</h1>
          <span class="badge badge-sm badge-neutral">Admin</span>
        </div>
        <!-- Links -->
        <ul class="menu menu-xl mt-5 gap-2">
          <li></li>
          <li class="menu-title flex flex-row items-center text-base gap-4">
            <Icon name="fa:group" size="1.5em" class="text-[#09435b]" />

            <span class="">Pribadi</span>
          </li>
          <li>
            <NuxtLink to="/dashboard/info" class="font-bold">
              <Icon name="line-md:account" />
              Info User</NuxtLink
            >
          </li>

          <li>
            <NuxtLink to="/dashboard/editprofile" class="font-bold">
              <Icon name="eos-icons:rotating-gear" />
              Edit Profile</NuxtLink
            >
          </li>
          <!-- <div class="text-lg">
            <h1>
              <Icon name="meteocons:code-orange" size="2em" /> Atur Siswa
              <span class="badge badge-sm badge-accent ml-3">Admin</span>
            </h1>
          </div> -->
        </ul>
        <ul class="menu menu-xl gap-2">
          <li></li>
          <li class="menu-title flex flex-row items-center text-base gap-4">
            <Icon name="fa:group" size="1.5em" class="text-[#09435b]" />

            <span class="">Atur Siswa</span>
          </li>
          <li>
            <NuxtLink to="/dashboard/tambahuser" class="font-bold">
              <Icon name="line-md:account-add" />

              Tambah Siswa
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/dashboard/manageuser" class="font-bold">
              <Icon name="line-md:account-alert" />

              Manage Siswa
            </NuxtLink>
          </li>
        </ul>
        <!-- End Links -->
      </div>
      <div class="flex-1">
        <h2 class="text-xl mb-4">
          Selamat Datang, Garry Ongko

          <span class="badge badge-lg badge-neutral ml-3">Admin</span>
        </h2>
        <NuxtPage />
      </div>
    </div>
  </div>
</template>
