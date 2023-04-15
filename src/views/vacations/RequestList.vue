<template>
  <div>
    휴가신청내역~~~~
    <!-- 현재 id route param 추가 -->
    <BaseBtn
      class="mb-5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      @click="onClickDetail"
    >
      상세보기버튼
    </BaseBtn>
  </div>
</template>

<script>
import router from '@/router/index.js'
export default {
  setup() {
    const onClickDetail = () => {
      router.push({ name: '휴가신청상세' })
    }

    return {
      onClickDetail,
    }
  },
}
</script>

<style></style>
