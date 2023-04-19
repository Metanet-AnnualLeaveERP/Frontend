<script>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import router from '@/router/index.js'
import { getVcReqDetail, getCertificateDetail } from '@/api'
import VacationRequestCertificate from '@/components/vacations/VacationRequestCertificate.vue'
import { successToast } from '@/sweetAlert'
import html2pdf from 'html2pdf.js'
// 휴가신청확인서
import VacationReqConfirmation from '@/components/vacations/VacationReqConfirmation.vue'
// 휴가취소확인서
import VacationCancelConfirmation from '@/components/vacations/VacationCancelConfirmation.vue'
import CertificateVue from '@/components/vacations/Certificate.vue'
export default {
  components: {
    CertificateVue,
    VacationReqConfirmation,
    VacationCancelConfirmation,
  },
  setup() {
    const route = useRoute()
    const certId = route.params.id
    const detail = ref({})
    const loading = ref(false)
    const certType = ref(null)
    const propsId = ref(null)

    const pdfContent = ref(null)

    onMounted(async () => {
      await getCertificateDetail(certId).then((res) => {
        console.log(res.data)
        detail.value = res.data
        if (detail.value.vcReqDto) {
          certType.value = 'request'
          propsId.value = detail.value.vcReqDto.reqId
        } else if (detail.value.cancelDto) {
          certType.value = 'cancel'
          propsId.value = detail.value.cancelDto.cancelId
        }
        loading.value = true
        console.log(certType.value)
      })
    })
    // container div를 jpeg로 변환 후 pdf 다운로드
    const downloadPDF = () => {
      const element = pdfContent.value
      // const filename =
      //   '휴가확인서_' +
      //   props.item.vcReqDto.empDto.name +
      //   '_' +
      //   props.item.vcReqDto.reqDate +
      //   '.pdf'
      let filename = ''
      switch (certType.value) {
        case 'request':
          filename =
            '휴가요청확인서_' +
            detail.value.empDto.name +
            '_' +
            detail.value.issuedDate +
            '.pdf'
          break
        case 'cancel':
          filename =
            '휴가취소확인서_' +
            detail.value.empDto.name +
            '_' +
            detail.value.issuedDate +
            '.pdf'
          break
      }

      const options = {
        filename: filename,
        margin: [5, 0, 5, 0], // top, right, bottom, left 마진 여백
        image: { type: 'jpeg', quality: 2 },
        html2canvas: {
          // html2canvas 옵션
          useCORS: true, // 영역 안에 로컬 이미지를 삽입 할 때 옵션 필요
          scrollY: 0, // 스크롤 이슈 때문에 필수
          scale: 3, // browsers device pixel ratio
          dpi: 1000,
          letterRendering: true,
          //useCORS를 true로 설정 시 반드시 allowTaint를 false 처리 해주어야함
          allowTaint: false,
        },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
      }
      html2pdf().from(element).set(options).save()
    }

    return {
      loading,
      certType,
      propsId,
      pdfContent,
      downloadPDF,
      onClickBackBtn,
      onClickPDFBtn,
      certId,
      detail,
    }
  },
}

// 돌아가기
const onClickBackBtn = () => {
  router.go(-1)
}

const onClickPDFBtn = () => {
  console.log(111111)
}
</script>

<template>
  <div>
    <BaseCard>
      <!-- axios response 후 props 넘기기 위해 v-if 설정 -->
      <div ref="pdfContent" v-if="loading">
        <div class="pr-5 pl-5">
          <VacationReqConfirmation v-if="certType == 'request'" :id="propsId" />
          <VacationCancelConfirmation
            v-if="certType == 'cancel'"
            :id="propsId"
          />
          <!-- <VacationRequestCertificate v-if="certType =='request'" :item="detail" /> -->
          <CertificateVue :item="detail" />
        </div>
      </div>
    </BaseCard>
    <div class="flex justify-end mt-5">
      <BaseBtn
        class="mr-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        @click="downloadPDF"
      >
        PDF 다운로드하기
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
