<script setup>
import { exportToPDF } from "#imports";
const pdfEl = ref();

function generatePDF() {
  const DOCUMENT_OPTIONS = {}; // See all options: http://raw.githack.com/MrRio/jsPDF/master/docs/jsPDF.html
  const HTML_OPTIONS = {
    html2canvas: {
      scale: 1,
      useCORS: true,
    },
  }; // See all options: http://raw.githack.com/MrRio/jsPDF/master/docs/module-html.html#~html

  exportToPDF("FILE_NAME.pdf", pdfEl.value, DOCUMENT_OPTIONS, HTML_OPTIONS);
}

onMounted(() => {
  console.log(pdfEl);
});
</script>

<template>
  <div class="flex w-full">
    <div
      id="sidenav-create"
      class="min-w-[350px] min-h-screen bg-[#313131] shadow-xl"
    >
      <button @click="generatePDF" class="bg-slate-200 p-2 rounded-md">
        generate pdf
      </button>
    </div>
    <div class="bg-slate-100 w-full flex justify-center">
      <div
        ref="pdfEl"
        id="pdf-target"
        class="w-[803px] h-[1132px] bg-white shadow-xl"
      >
        <h1 class="font-bold text-2xl">Hello!</h1>
        <div class="bg-red-200">sdsd</div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
