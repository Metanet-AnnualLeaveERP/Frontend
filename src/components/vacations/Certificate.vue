<script>
export default {
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  setup() {},
}
</script>

<template>
  <div class="container mx-auto">
    <div class="text-center text-sm">
      <div class="pr-5 pl-5">
        <!-- 증명서 발급 정보 -->
        <div
          class="bg-white font-bold text-xl dark:bg-foreground dark:text-white flex justify-around mt-10 mb-7"
        >
          메타넷 디지털 (주)
        </div>
        <p
          class="bg-white text-gray-500 dark:bg-foreground text-left dark:text-white flex justify-center"
        >
          본 확인서는 발급기관의 전자적 확인을 거쳐 발급한 증명서입니다.
        </p>
        <div
          class="bg-white text-gray-500 dark:bg-foreground text-left dark:text-white flex justify-center"
        >
          <span class="mr-2"> 발급번호: {{ item.certId }} &nbsp;| </span>
          <span class="mr-2"> 발급일자: {{ item.issuedDate }} &nbsp;| </span>
          <span> 발급목적: {{ item.purpose }} </span>
        </div>
      </div>
    </div>
  </div>
</template>
