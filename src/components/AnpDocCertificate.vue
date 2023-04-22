<script>
import {onMounted, ref} from 'vue'
import store from '@/store/index.js'
import html2pdf from 'html2pdf.js'
import router from '@/router'


export default {
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const startDate = ref('')
    const expiredDateToStr = ref('')
    const pdfContent = ref(null)
    // 나의 상사
    const manager = store.state.mgr
    const docId = props.item.docId

    onMounted(async () => {
      // 날짜 출력을 위한 변환
      // Date 객체로 변환
      const start = new Date(props.item.occurDate);
      const expiredDate = new Date();
      expiredDate.setMonth(start.getMonth() + 6);
      expiredDate.setDate(start.getDate() + 10); // 만료일자
      // const end = new Date(props.item.vcReqDto.endDate)

      // 월, 일을 두 자리 숫자로 표현
      const startMonth = String(start.getMonth() + 1).padStart(2, '0')
      const startDay = String(start.getDate()).padStart(2, '0')

      const expiredMonth = String(expiredDate.getMonth() + 1).padStart(2, '0')
      const expiredDay = String(expiredDate.getDate()).padStart(2, '0')

      // 변환된 문자열 생성
      startDate.value = `${start.getFullYear()}년 ${startMonth}월 ${startDay}일`
      expiredDateToStr.value = `${start.getFullYear()}년 ${expiredMonth}월 ${expiredDay}일`
    })

    // container div를 jpeg로 변환 후 pdf 다운로드
    const downloadPDF = () => {
      const element = pdfContent.value
      const filename =
          '연차촉진요청서_' +
          props.item.empDto.name +
          '_' +
          props.item.occurDate +
          '.pdf'
      const options = {
        filename: filename,
        margin: [5, 0, 5, 0], // top, right, bottom, left 마진 여백
        image: {type: 'jpeg', quality: 2},
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
        jsPDF: {unit: 'mm', format: 'a4', orientation: 'portrait'},
      }
      html2pdf().from(element).set(options).save()
    }

    const onClickCreatePlan = () => {
      const docId = props.item.docId;
      router.push({name: '연차사용계획서', params: {id: docId}})
    }

    return {
      startDate,
      expiredDateToStr,
      downloadPDF,
      pdfContent,
      manager,
      onClickCreatePlan
    }
  },
}
</script>

<template>
  <div class="container mx-auto">
    <div ref="pdfContent" class="text-center text-sm">
      <div class="pr-5 pl-5">
        <!-- 제목 -->
        <div class="text-3xl font-bold">
          미사용 연차유급휴가일수 통지 및<br/>
          연차 사용시기 지정 통보 촉구
        </div>
        <div class="flex flex-row justify-end">
        <table class="__se_tbl name-table">
          <!-- Header -->
          <tbody>
          <tr>
            <td class="text-left py-3">
              소 속 : {{ item.empDto.deptDto.deptName }}
            </td>
          </tr>
          <!-- 성명 -->
          <tr>
            <td class="text-left pb-3">
              성 명 : {{ item.empDto.name }}
            </td>
          </tr>
          <tr>
            <td class="text-left pb-3">
              직 위 : {{ item.empDto.position }}
            </td>
          </tr>
          </tbody>
        </table>
        </div>
        <div class="flex flex-row justify-center">
          <table class="__se_tbl vc-table">
            <tr class="text-bold text-1xl ">
              <td>연차유급휴가<br>당해 연도 발생시점</td>
              <td>연차유급휴가 <br>당해 연도 사용가능기간</td>
              <td>발생연차</td>
              <td>사용연차</td>
              <td>미사용연차</td>
            </tr>
            <tr>
              <td>{{ item.anvOccurDate }}</td>
              <td>{{ item.anvOccurDate }}
                ~ {{ item.anvOccurDate }}
              </td>
              <td>{{ item.totalAnv }}</td>
              <td>{{ item.totalAnv - item.remainAnv }}</td>
              <td> {{ item.remainAnv }}</td>
            </tr>
          </table>
        </div>
        <table class="__se_tbl">
          <tbody>
          <tr class="h-12">
            <td class="p-3 text-justify bg-white dark:bg-foreground" colspan="2">
              <strong> [ {{ item.empDto.name }} ] </strong>님의 현재 사용 가능한 미사용 연차유급휴가일수는
              <strong> [ {{ item.remainAnv }} 일 ] </strong>임을 알려드립니다.
            </td>
          </tr>

          <tr class="h-12">
            <td class="p-3 text-justify bg-white dark:bg-foreground" colspan="2">
              미사용연차 <strong class="text-md text-bold"> [ {{ item.remainAnv }} 일 ]</strong>에 대하여
              <strong>[ {{ expiredDateToStr }} ] </strong> 까지 미사용 연차유급휴가일수의
              사용시기를 지정하고 연차휴가계획서를 작성하여 경영지원팀으로 서면통보 하여
              주실 것을 촉구드리는 바입니다.
            </td>
          </tr>
          <tr class="h-12">
            <td class="p-3 text-justify bg-white dark:bg-foreground" colspan="2">
              동 기한 내에 연차휴가계획서에 의한 미사용 연차유급휴가 사용시기 지정 통보가
              제출되지 아니한 경우 관련 규정에 의해 추후 회사가 임의 지정할 할 예정이며,
              그럼에도 불구하고 사용하지 아니한 연차유급휴가일수에 대하여는 향 후 연차유금휴가수당이
              지급되지 않음을 알려드리니 유념하시기 바랍니다.
            </td>
          </tr>
          <tr class="h-12">
            <td class="p-3 text-lg text-center font-bold bg-white dark:bg-foreground" colspan="2">
              [관련법령&nbsp;:&nbsp;근로기준법&nbsp;제&nbsp;61조&nbsp;연차&nbsp;유급휴가&nbsp;사용&nbsp;촉진]
            </td>
          </tr>
          <tr class="h-12 border">
            <td class="p-3 text-center bg-white dark:bg-foreground" colspan="2">
              <div class="mb-2 text-sm text-justify">
                제 61조(연차 유급휴가의 사용 촉진) 사용자가 제60조제1항·제3항 및 제4항에 따른 유급휴가의
                사용을 촉진하기 위하여 다음 각 호의 조치를 하였음에도 불구하고 근로자가 휴가를 사용하지 아니하여
                제60조제7항 본문에 따라 소멸된 경우에는 사용자는 그 사용하지 아니한 휴가에 대하여 보상할 의무가 없고,
                제60조제7항 단서에 따른 사용자의 귀책사유에 해당하지 아니하는 것으로 본다.
              </div>
              <div class="mb-2 text-xs text-justify">
                &nbsp;1. 제60조제7항 본문에 따른 기간이 끝나기 6개월 전을 기준으로 10일 이내에 사용자가 근로자별로 사용하지
                아니한 휴가 일수를 알려주고, 근로자가 그 사용 시기를정하여 사용자에게 통보하도록 서면으로 촉구할 것
              </div>
              <div class="mb-2 text-xs text-justify">
                &nbsp; 2. 제1호에 따른 촉구에도 불구하고 근로자가 촉구를 받은 때부터 10일 이내에 사용하지 아니한 휴가의 전부
                또는 일부의 사용 시기를 정하여 사용자에게 통보하지 아니하면 제60조제7항 본문에 따른 기간이 끝나기 2개월 전까지
                사용자가 사용하지 아니한 휴가의 사용 시기를 정하여 근로자에게 서면으로 통보할 것
              </div>
            </td>
          </tr>
          <tr class="h-12">
            <td class="p-3 text-xs text-center font-light bg-white dark:bg-foreground" colspan="2">
              ※ 미사용 휴가일수는 취합시기/상신여부 등에 따라 차이가 있을 수 있습니다.
              이상이 있는 경우 연차관리자에게 문의해 주시기 바랍니다.
            </td>
          </tr>
          </tbody>
        </table>
        <!-- 증명서 발급 정보 -->
        <div class="bg-white pb-5 font-bold text-xl dark:bg-foreground dark:text-white flex justify-around mt-10 mb-7">
          메타넷 디지털 (주)
        </div>
        <p class="bg-white pb-5 text-gray-500 dark:bg-foreground text-left dark:text-white flex justify-center">
          본 확인서는 발급기관의 전자적 확인을 거쳐 발급한 증명서입니다.
        </p>
        <div class="bg-white  pb-5 text-gray-500 dark:bg-foreground text-left dark:text-white flex justify-center">
          <span class="mr-2"> 발급번호: {{ item.docId }} &nbsp;| </span>
          <span class="mr-2"> 발급일자: {{ item.occurDate }} &nbsp;|</span>
        </div>
      </div>
    </div>

    <div class="flex justify-end mt-7">
      <BaseBtn
          class="mr-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none
        focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center
         dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          @click="downloadPDF">
        PDF 다운로드하기
      </BaseBtn>

      <BaseBtn
          class="mr-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300
         font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600
         dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          @click="onClickCreatePlan">
        사용계획서
      </BaseBtn>
    </div>
  </div>
</template>
<style>
.vc-table > tr > td{
  border: 1px solid black;
  padding-bottom: 10px;
}

.name-table >tbody > tr > td{
  border: 1px solid black;
  /*padding: 10px;*/
  align-items: center;
  text-align: left;
}
</style>