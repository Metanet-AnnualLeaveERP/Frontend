<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import router from '@/router/index.js'
import { getVcReqDetail, download } from '@/api'
import VacationRequestCertificate from '@/components/VacationRequestCertificate.vue'

const route = useRoute()
const reqId = route.params.id
const detail = ref({})
const detailLoaded = ref(false)

onMounted(async () => {
  await getVcReqDetail(reqId).then((res) => {
    console.log(res.data)
    detailLoaded.value = true
    detail.value = res.data
  })
})

const onClickDownload = () => {
  // db에 저장된 vcReq의 filePath
  const filePath =
    'd:\\ALE_downloaded_files\\2023_04_14\\7d6f8f04-914e-40fe-a572-03c0e440ef55.zip'
  const encodedFilePath = encodeURIComponent(filePath)

  download(encodedFilePath).then((response) => {
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
    link.style.cssText = 'display:none' // 보이지 않도록 설정

    // 링크를 body에 추가하고 강제로 click 이벤트를 발생시켜 파일 다운로드를 실행
    document.body.appendChild(link)
    link.click()
    link.remove()

    // 다운로드가 끝난 리소스(객체 URL)를 해제
    window.URL.revokeObjectURL(fileUrl)
  })
}
</script>

<template>
  <BaseCard>
    <!-- axios response 후 props 넘기기 위해 v-if 설정  -->
    <div v-if="detailLoaded">
      <VacationRequestCertificate :item="detail" />
    </div>
    <div class="flex justify-end mt-7">
      <BaseBtn
        v-if="detail.filePath != null"
        class="mb-5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        @click="onClickDownload"
      >
        첨부파일 다운로드
      </BaseBtn>
    </div>
  </BaseCard>
</template>
