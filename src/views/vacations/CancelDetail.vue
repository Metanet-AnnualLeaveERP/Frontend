<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import router from '@/router/index.js'
import { getCancelDetail, createCertificate } from '@/api'
import VacationCancelConfirmation from '@/components/vacations/VacationCancelConfirmation.vue'
import { successToast, inputTextModal } from '@/sweetAlert'
import store from '@/store'

const route = useRoute()
const cancelId = route.params.id
const detail = ref({})
const loading = ref(false)

onMounted(async () => {
  await getCancelDetail(cancelId).then((res) => {
    // console.log(res.data)
    loading.value = true
    detail.value = res.data
    console.log(11111)
    console.log(detail.value)
  })
})

// 돌아가기
const onClickBackBtn = () => {
  router.go(-1)
}

// 증명서발급
const onClickIssue = async () => {
  const title = '휴가 취소 증명서 발급'
  const text = '발급 목적을 입력해 주세요'
  const inputLabel = 'ex) 인사팀 제출용, 개인 보관용 등'
  const p = await inputTextModal(title, text, inputLabel)
  // 여기수정해야댐
  const data = {
    purpose: p.value,
    cancelDto: {
      cancelId: detail.value.cancelId,
    },
    empDto: {
      empId: store.state.emp.empId,
    },
  }
  if (p.value != null) {
    await createCertificate(data).then(() => {
      successToast('증명서 발급이 완료되었습니다!')
      router.push({ name: '증명서내역' })
    })
  }
}
</script>

<template>
  <div>
    <BaseCard>
      <!-- axios response 후 props 넘기기 위해 v-if 설정  -->
      <div v-if="loading">
        <VacationCancelConfirmation :id="cancelId" />
      </div>
    </BaseCard>
    <div class="flex justify-end mt-5">
      <BaseBtn
        class="mr-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        @click="onClickIssue"
      >
        증명서 발급
      </BaseBtn>
      <BaseBtn
        class="mr-3 text-white bg-light hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        @click="onClickBackBtn"
      >
        돌아가기
      </BaseBtn>
    </div>
  </div>
</template>
