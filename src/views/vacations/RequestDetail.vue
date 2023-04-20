<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import router from '@/router/index.js'
import {
  getVcReqDetail,
  download,
  createCertificate,
  createCancel,
} from '@/api'
import VacationReqConfirmation from '@/components/vacations/VacationReqConfirmation.vue'
import { successToast, inputTextModal } from '@/sweetAlert'
import store from '@/store'

const route = useRoute()
const reqId = route.params.id
const detail = ref({})
const loading = ref(false)
const showCancelBtn = ref(false)

onMounted(async () => {
  await getVcReqDetail(reqId).then((res) => {
    // console.log(res.data)
    loading.value = true
    detail.value = res.data
    // 상태가 반려/취소가 아닐 때만 취소 신청이 가능하도록 설정
    if (detail.value.status != '반려' && detail.value.status != '취소') {
      showCancelBtn.value = true
    }
  })
})

// 파일 다운로드
const onClickDownloadBtn = async () => {
  // db에 저장된 vcReq의 filePath
  const filePath = detail.value.filePath

  const encodedFilePath = encodeURIComponent(filePath)

  await download(encodedFilePath).then((response) => {
    console.log(response)
    // 응답 헤더에서 파일 이름을 가져옴
    const name = response.headers['content-disposition']
      .split('filename=')[1]
      .replace(/"/g, '')

    // 응답으로 받은 바이너리 파일을 blob 객체로 변환
    const blob = new Blob([response.data])

    // blob을 통해 객체 url을 생성
    const fileUrl = window.URL.createObjectURL(blob)

    // blob 객체 URL을 설정할 링크 생성 -> a 태그
    const link = document.createElement('a')
    link.href = fileUrl
    link.setAttribute('download', name) // 파일 이름
    link.style.cssText = 'display:none' // a 태그가 보이지 않도록 css 설정

    // 링크를 body에 추가하고 강제로 click 이벤트를 발생시켜 파일 다운로드를 실행
    document.body.appendChild(link)
    link.click()
    link.remove()

    // 다운로드가 끝난 리소스(객체 URL)를 해제
    window.URL.revokeObjectURL(fileUrl)

    successToast('등록하신 첨부파일을 다운로드합니다.')
  })
}

// 휴가 취소 신청
const onClickCancel = async () => {
  const title = '휴가 취소 신청'
  const text = '취소 사유를 입력해 주세요'
  const inputLabel = '휴가 시작일이 지났을 경우 자동 취소 처리됩니다.'
  const comm = await inputTextModal(title, text, inputLabel)
  const data = {
    reqComm: comm.value,
  }
  await createCancel(reqId, data).then(async (res) => {
    await successToast('휴가 취소 신청이 완료되었습니다!')
    router.push({ name: '휴가취소내역' })
  })
}

// 증명서 발급
const onClickIssue = async () => {
  const title = '휴가 요청 증명서 발급'
  const text = '발급 목적을 입력해 주세요'
  const inputLabel = 'ex) 인사팀 제출용, 개인 보관용 등'
  const p = await inputTextModal(title, text, inputLabel)
  const data = {
    purpose: p.value,
    vcReqDto: {
      reqId: detail.value.reqId,
    },
    empDto: {
      empId: store.state.emp.empId,
    },
  }
  if (p.value != null) {
    await createCertificate(data).then(async () => {
      await successToast('증명서 발급이 완료되었습니다!')
      router.push({ name: '증명서내역' })
    })
  }
}

// 돌아가기
const onClickBackBtn = () => {
  router.go(-1)
}
</script>

<template>
  <div>
    <BaseCard>
      <!-- axios response 후 props 넘기기 위해 v-if 설정  -->
      <div v-if="loading">
        <VacationReqConfirmation :id="reqId" />
      </div>
    </BaseCard>
    <div class="flex justify-end mt-5">
      <BaseBtn
        v-if="detail.filePath != null"
        class="mr-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        @click="onClickDownloadBtn"
      >
        첨부파일 다운로드
      </BaseBtn>
      <BaseBtn
        class="mr-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        @click="onClickIssue"
      >
        증명서 발급
      </BaseBtn>
      <BaseBtn
        v-if="showCancelBtn"
        class="mr-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        @click="onClickCancel"
      >
        취소 신청
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
