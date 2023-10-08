<!-- eslint-disable indent -->
<script setup>
const { logout } = await useAuth();
const colorMode = useColorMode();

// const isLoggedIn = computed(() => currentUser.value !== null);
const currentUser = useState("currentUser");
const userMetadata = useState("userMetadata");

function handleTheme(theme) {
  switch (theme) {
    case "dark":
      colorMode.preference = "dark";
      break;
    case "light":
      colorMode.preference = "light";
      break;
    default:
      console.error("Cant change theme");
  }
}

async function handleLogoutUser() {
  await logout();
  await navigateTo("/");
}
</script>

<template>
  <div class="drawer z-10">
    <input id="my-drawer-3" type="checkbox" class="drawer-toggle" />
    <div
      class="drawer-content w-full flex justify-center items-center fixed top-0 left-0 right-0 shadow"
    >
      <div class="navbar p-0 px-1 max-w-screen-xl bg-base-100">
        <div class="flex-1">
          <a class="btn btn-ghost normal-case text-xl">AlumniApps</a>
        </div>
        <!-- START LINKS -->

        <div class="flex-none hidden md:flex mr-1">
          <ul class="menu text-base menu-horizontal px-1 flex gap-2">
            <li class="">
              <nuxt-link to="/"><Icon name="tabler:home" /> Home</nuxt-link>
            </li>
          </ul>
        </div>
        <!-- End Links -->
        <div class="font-thin mr-2">|</div>
        <!-- Bulb -->
        <details class="flex-none dropdown">
          <summary class="m-1 btn bg-transparent border-none p-2 rounded-2xl">
            <Icon
              v-if="colorMode.preference === 'light'"
              name="line-md:moon-alt-to-sunny-outline-loop-transition"
              size="2em"
            />
            <Icon
              v-if="colorMode.preference === 'dark'"
              name="line-md:sunny-outline-to-moon-alt-loop-transition"
              size="2em"
            />
            <Icon name="line-md:chevron-small-down" size="1.2em" />
          </summary>
          <ul
            class="p-2 shadow-lg menu dropdown-content mt-3 z-[1] bg-base-100 rounded-box w-52"
          >
            <li>
              <button @click="handleTheme('light')">
                <Icon
                  name="line-md:moon-alt-to-sunny-outline-loop-transition"
                />
                Light Theme
              </button>
            </li>
            <li>
              <button @click="handleTheme('dark')">
                <Icon
                  name="line-md:sunny-outline-to-moon-alt-loop-transition"
                />
                Dark Theme
              </button>
            </li>
          </ul>
        </details>

        <!-- end bulb -->
        <!-- <div class="font-thin mr-2">|</div>   -->
        <!-- Photo -->
        <!-- TODO: Tambahin Fancy chevron kalo lagi buka dan tutup pake iconify line-md -->
        <span
          :class="{
            'mx-2': currentUser,
          }"
          >{{ currentUser ? userMetadata.name : "" }}
        </span>
        <!-- <span
          :class="{
            'mx-2': currentUser,
          }"
          >{{ currentUser ? "NIS : 1809599001" : "" }}
        </span> -->
        <details class="dropdown dropdown-end hidden md:inline-block">
          <summary
            tabindex="0"
            class="btn btn-ghost rounded-2xl avatar flex px-2 w-full"
          >
            <!-- TODO: Ganti pake username -->
            <div class="w-10 rounded-full">
              <div class="flex items-center justify-center w-full h-full">
                <!-- <Icon name="fa-solid:user" /> -->
                <img
                  src="https://icons.veryicon.com/png/o/business/multi-color-financial-and-business-icons/user-139.png"
                  alt="User Profile"
                />
              </div>
            </div>
            <!-- <div class="avatar">
              <div class="w-10 mask mask-squircle bg-[#09435b]">
                <div class="flex items-center justify-center w-full h-full">
                  <img
                    src="https://icons.veryicon.com/png/o/business/multi-color-financial-and-business-icons/user-139.png"
                    alt="User Profile"
                  />
                </div>
              </div>
            </div> -->
            <Icon name="line-md:chevron-small-down" size="1.2em" />
          </summary>
          <ul
            v-if="currentUser"
            tabindex="0"
            class="mt-3 z-[1] p-2 shadow-lg menu menu-md dropdown-content bg-base-100 rounded-box w-52"
          >
            <!-- <li>
              <a class="justify-between">
                Profile
                <span class="badge">New</span>
              </a>
            </li> -->
            <li>
              <nuxt-link to="/dashboard/info"
                ><Icon
                  name="material-symbols:dashboard-outline"
                />Dashboard</nuxt-link
              >
            </li>
            <li>
              <button @click="handleLogoutUser">
                <Icon name="tabler:logout-2" />
                Logout
              </button>
            </li>
          </ul>
          <ul
            v-else
            tabindex="0"
            class="mt-3 z-[1] p-2 shadow-lg menu menu-md dropdown-content bg-base-100 rounded-box w-52"
          >
            <li>
              <nuxt-link to="/login"
                ><Icon name="tabler:login-2" />Login</nuxt-link
              >
            </li>
          </ul>
        </details>
        <!-- end Photo -->
        <!-- start Hamburger -->
        <div class="flex-none md:hidden">
          <label for="my-drawer-3" class="btn btn-square btn-ghost">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              class="inline-block w-6 h-6 stroke-current"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </label>
        </div>
        <!-- end Hamburger -->
      </div>
    </div>
    <div class="drawer-side">
      <label for="my-drawer-3" class="drawer-overlay"></label>
      <ul class="menu p-4 w-80 min-h-full bg-base-200">
        <!-- Photo -->
        <div class="dropdown dropdown-end inline-block md:hidden">
          <label tabindex="0" class="btn btn-ghost btn-circle avatar">
            <div class="w-10 rounded-full">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLmEKJ9OqNBW4iPLodU8lK2b4LU47EMtRmsA&usqp=CAU"
              />
            </div>
          </label>
          <ul
            tabindex="0"
            class="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
          >
            <li>
              <a class="justify-between">
                Profile
                <span class="badge">New</span>
              </a>
            </li>
            <li><a>Settings</a></li>
            <li><a>Logout</a></li>
          </ul>
        </div>
        <!-- end Photo -->

        <!-- Links -->
        <li>
          <nuxt-link to="/"><Icon name="tabler:home" /> home</nuxt-link>
        </li>
        <li>
          <nuxt-link to="/login"><Icon name="tabler:login-2" />login</nuxt-link>
        </li>
        <li>
          <nuxt-link to="/dashboard"
            ><Icon
              name="material-symbols:dashboard-outline"
            />Dashboard</nuxt-link
          >
        </li>
      </ul>
    </div>
  </div>
  <!-- </header> -->
</template>
