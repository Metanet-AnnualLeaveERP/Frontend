<script>
import { onMounted, ref } from 'vue'
import html2pdf from 'html2pdf.js'
export default {
  props: {
    item: {
      type: Object,
      required: true,
    },
  },

  setup(props) {
    const alType = ref(false)
    const startDate = ref('')
    const endDate = ref('')
    const pdfContent = ref(null)

    onMounted(() => {
      //   console.log(props.item)
      const typeName = props.item.vcTypeDto.typeName
      if (props.item.reqDays == 1 && typeName == '연차') {
        console.log('연차이고 하루만 신청했을 경우 반차인지 아닌지 표시')
        alType.value = true
      }

      // Date 객체로 변환
      const start = new Date(props.item.startDate)
      const end = new Date(props.item.endDate)

      // 월, 일을 두 자리 숫자로 표현
      const startMonth = String(start.getMonth() + 1).padStart(2, '0')
      const startDay = String(start.getDate()).padStart(2, '0')

      const endMonth = String(end.getMonth() + 1).padStart(2, '0')
      const endDay = String(end.getDate()).padStart(2, '0')

      // 변환된 문자열 생성
      startDate.value = `${start.getFullYear()}년 ${startMonth}월 ${startDay}일`
      endDate.value = `${start.getFullYear()}년 ${endMonth}월 ${endDay}일`
    })

    const downloadPDF = () => {
      const element = pdfContent.value
      const filename =
        '휴가확인서_' +
        props.item.empDto.name +
        '_' +
        props.item.startDate +
        '.pdf'
      const options = {
        filename: filename,
        margin: [15, 5, 15, 0], // top, right, bottom, left 마진 여백
        image: { type: 'jpeg', quality: 2 },
        html2canvas: {
          // html2canvas 옵션
          useCORS: true, // 영역 안에 로컬 이미지를 삽입 할 때 옵션 필요
          scrollY: 0, // 스크롤 이슈 때문에 필수
          scale: 2, // browsers device pixel ratio
          dpi: 1000,
          letterRendering: true,
          //useCORS를 true로 설정 시 반드시 allowTaint를 false 처리 해주어야함
          allowTaint: false,
          logging: true,
        },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
      }
      html2pdf().from(element).set(options).save()
    }

    return {
      alType,
      startDate,
      endDate,
      downloadPDF,
      pdfContent,
    }
  },
}
</script>

<template>
  <div class="container mx-auto">
    <div ref="pdfContent" class="text-center text-sm">
      <table
        class="__se_tbl"
        style="
          width: 800px;
          border-collapse: collapse !important;
          color: black;
          background: white;
          border: 0px solid black;

          font-family: malgun gothic, dotum, arial, tahoma;
          margin-left: auto;
          margin-right: auto;
        "
      >
        <!-- Header -->

        <tbody>
          <!-- 제목 -->
          <tr>
            <td
              style="
                width: 300px;
                padding: 3px !important;
                border: 0px solid black;
                height: 90px !important;
                font-size: 22px;
                font-weight: bold;
                text-align: center;
                vertical-align: middle;
              "
              colspan="2"
              class="dext_table_border_t dext_table_border_r dext_table_border_b dext_table_border_l bg-white dark:bg-foreground dark:text-white"
            >
              휴가 확인서
            </td>
          </tr>
          <tr class="h-12"></tr>
          <tr>
            <td
              style="width: 300px; border: 0; padding: 0 !important"
              class="dext_table_border_t dext_table_border_r dext_table_border_b dext_table_border_l bg-white dark:bg-foreground dark:text-white"
            >
              <table
                class="__se_tbl"
                style="
                  margin: 0px;
                  border: 0px solid black;
                  border-image: none;
                  font-family: malgun gothic, dotum, arial, tahoma;
                  border-collapse: collapse !important;
                "
              >
                <!-- User -->

                <tbody>
                  <!-- 소속 부서 -->
                  <tr>
                    <td
                      class="bg-white font-bold dark:bg-foreground dark:text-white text-left"
                      style="
                        width: 100px;
                        padding: 3px !important;
                        height: 22px;
                        border: 0px solid black;
                      "
                    >
                      소 속 :
                    </td>
                    <td
                      class="text-left"
                      style="
                        width: 200px;
                        padding: 3px !important;
                        height: 22px;
                        vertical-align: middle;
                        border: 0px solid black;
                      "
                    >
                      기안 부서
                    </td>
                  </tr>
                  <tr class="h-4"></tr>
                  <!-- 결재 담당 (상사) -->
                  <tr>
                    <td
                      class="bg-white font-bold dark:bg-foreground dark:text-white text-left"
                      style="
                        width: 100px;
                        padding: 3px !important;
                        height: 22px;
                        vertical-align: middle;
                        border: 0px solid black;
                      "
                    >
                      결재 담당자 :
                    </td>
                    <td
                      class="text-left"
                      style="
                        width: 200px;
                        padding: 3px !important;
                        height: 22px;
                        vertical-align: middle;
                        border: 0px solid black;
                      "
                    >
                      기안 부서
                    </td>
                  </tr>
                  <tr class="h-4"></tr>
                  <!-- 성명 -->
                  <tr>
                    <td
                      class="bg-white font-bold dark:bg-foreground dark:text-white text-left"
                      style="
                        width: 100px;
                        height: 22px;
                        vertical-align: middle;
                        border: 0px solid black;
                        padding: 3px !important;
                      "
                    >
                      성 명 :
                    </td>

                    <td
                      class="bg-white dark:bg-foreground dark:text-white text-left"
                      style="
                        width: 200px;
                        height: 22px;
                        vertical-align: middle;
                        border: 0px solid black;
                        padding: 3px !important;
                      "
                    >
                      {{ item.empDto.name }}
                    </td>
                  </tr>
                  <tr class="h-4"></tr>
                  <!-- 휴가 신청일 -->
                  <tr>
                    <td
                      class="bg-white font-bold dark:bg-foreground dark:text-white text-left"
                      style="
                        width: 100px;
                        padding: 3px !important;
                        height: 22px;
                        vertical-align: middle;
                        border: 0px solid black;
                      "
                    >
                      신청일 :
                    </td>
                    <td
                      class="text-left"
                      style="
                        width: 200px;
                        padding: 3px !important;
                        height: 22px;
                        vertical-align: middle;
                        border: 0px solid black;
                      "
                    >
                      {{ item.reqDate }}
                    </td>
                  </tr>
                  <tr></tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>

      <br />

      <table
        class="__se_tbl"
        style="
          width: 800px;
          margin-top: 0px;
          border-collapse: collapse !important;
          color: black;
          background: white;
          border: 0px solid black;

          font-family: malgun gothic, dotum, arial, tahoma;
          margin-left: auto;
          margin-right: auto;
        "
      >
        <tbody>
          <tr class="h-4"></tr>
          <tr>
            <td
              class="bg-white font-bold dark:bg-foreground dark:text-white text-left"
              colspan="2"
              style="
                width: 800px;
                padding: 20px !important;
                border: 0px solid black;
              "
            >
              상기인은 아래와 같이 휴가 신청하였음을 확인합니다.
            </td>
          </tr>
          <tr class="h-6"></tr>
          <!-- 휴가 종류 -->
          <tr>
            <td
              class="bg-white font-bold dark:bg-foreground dark:text-white text-left"
              style="padding: 5px; border: 0px solid black; height: 25px"
            >
              1. 휴가 구분 :
            </td>
            <td
              class="bg-white dark:bg-foreground dark:text-white text-left"
              style="padding: 5px; border: 0px solid black; height: 25px"
            >
              <span class="mr-5" v-if="item.vcTypeDto.typeName == '연차'">
                ☑ 연차
              </span>
              <span class="mr-5" v-else> ☐ 연차 </span>
              <span class="mr-5" v-if="item.vcTypeDto.typeName == '보상'">
                ☑ 보상
              </span>
              <span class="mr-5" v-else> ☐ 보상 </span>
              <span class="mr-5" v-if="item.vcTypeDto.typeName == '포상'">
                ☑ 포상
              </span>
              <span class="mr-5" v-else> ☐ 포상 </span>
            </td>
          </tr>
          <!-- 반차 여부 -->
          <tr v-if="alType">
            <td
              class="bg-white font-bold dark:bg-foreground dark:text-white text-left"
              style="padding: 5px; border: 0px solid black; height: 25px"
            >
              반차 여부
            </td>
            <td
              class="bg-white dark:bg-foreground dark:text-white text-left"
              style="padding: 5px; border: 0px solid black; height: 25px"
            >
              오전반차인지 오후반차인지 추가
            </td>
          </tr>
          <tr class="h-4"></tr>

          <!-- 휴가 기간 -->
          <tr>
            <td
              class="bg-white font-bold dark:bg-foreground dark:text-white text-left"
              style="padding: 5px; border: 0px solid black; height: 25px"
            >
              2. 휴가 기간 :
            </td>
            <td
              class="bg-white dark:bg-foreground dark:text-white text-left"
              style="
                padding: 3px;
                border: 0px solid black;
                width: 700px;
                height: 22px;
              "
              v-if="item.reqDays != 1"
            >
              {{ startDate }} - {{ endDate }}
            </td>
            <td
              class="bg-white dark:bg-foreground dark:text-white"
              style="
                padding: 3px;
                border: 0px solid black;
                width: 700px;
                height: 22px;
                text-align: left;
                vertical-align: middle;
              "
              v-else
            >
              {{ item.startDate }} - {{ item?.endDate }}
            </td>
          </tr>
          <tr class="h-4"></tr>
          <!-- 휴가 일수 -->
          <tr>
            <td
              class="bg-white font-bold dark:bg-foreground dark:text-white text-left"
              style="padding: 5px; border: 0px solid black; height: 25px"
            >
              3. 휴가 일수 :
            </td>
            <td
              class="bg-white dark:bg-foreground dark:text-white text-left"
              style="
                padding: 3px;
                border: 0px solid black;
                width: 700px;
                height: 22px;
              "
            >
              총 {{ item.reqDays }} 일
            </td>
          </tr>
          <tr class="h-4"></tr>

          <!-- 휴가 사유 -->
          <tr>
            <td
              class="bg-white font-bold dark:bg-foreground dark:text-white text-left"
              style="padding: 5px; border: 0px solid black"
            >
              4. 휴가 사유 :
            </td>
            <td
              class="bg-white dark:bg-foreground dark:text-white text-left"
              style="padding: 3px; border: 0px solid black; width: 700px"
            >
              {{ item.comments }}
            </td>
          </tr>
          <tr class="h-12"></tr>
          <!-- 원칙 -->
          <tr>
            <td
              class="bg-white font-bold dark:bg-foreground dark:text-white text-left"
              colspan="2"
              style="width: 800px; border: 0px solid black"
            >
              <p class="mb-1">
                - 연차의 사용은 근로기준법에 따라 전년도에 발생한 개인별 잔여
                연차에 한하여 사용함을 원칙으로 한다.
              </p>
              <p class="mb-2 ml-3">
                단, 최초 입사 시에는 근로 기준법에 따라 발생 예정된 연차를
                차용하여 월 1회 사용할 수 있다.
              </p>
              <p class="mb-2">
                - 경조사 휴가는 행사일을 증명할 수 있는 가족 관계 증명서 또는
                등본, 청첩장 등 제출
              </p>
              <p class="mb-2">
                - 공가(예비군/민방위)는 사전에 통지서를, 사후에 참석증을 반드시
                제출
              </p>
              <br />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <div class="flex justify-end mt-7">
    <BaseBtn
      class="mr-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      @click="downloadPDF"
    >
      증명서 PDF 발급
    </BaseBtn>
  </div>
</template>
