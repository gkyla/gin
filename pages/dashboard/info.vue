<template>
  <!-- Wrapped by flex-1 -->

  <!-- Stats -->
  <div class="stats shadow bg-base-200">
    <div class="stat">
      <div class="stat-figure text-primary">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          class="inline-block w-8 h-8 stroke-current"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          ></path>
        </svg>
      </div>
      <div class="stat-title">Jumlah Siswa</div>
      <div class="stat-value my-1">727</div>
      <div class="stat-desc">727 Akun telah dibuat</div>
    </div>

    <div class="stat">
      <div class="stat-figure text-secondary">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          class="inline-block w-8 h-8 stroke-current"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M13 10V3L4 14h7v7l9-11h-7z"
          ></path>
        </svg>
      </div>
      <div class="stat-title">Template dibuat</div>
      <div class="stat-value">50</div>
      <div class="stat-desc">Dari jumlah semua siswa</div>
    </div>

    <div class="stat">
      <div class="stat-figure text-secondary">
        <div class="avatar online">
          <div class="w-16 rounded-full">
            <img
              src="https://icons.veryicon.com/png/o/business/multi-color-financial-and-business-icons/user-139.png"
            />
          </div>
        </div>
      </div>
      <div class="stat-value">86%</div>
      <div class="stat-title">Tasks done</div>
      <div class="stat-desc text-secondary">31 tasks remaining</div>
    </div>
  </div>
  <h2 class="text-xl mt-5 mb-2">Info</h2>
  <!-- End Stats -->
</template>
