<template>
  <div>
    <div class="container mx-auto">
      <div ref="pdfContent" class="text-center text-sm">
        <div class="pr-5 pl-5">
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
                  class="text-lg dext_table_border_t dext_table_border_r dext_table_border_b dext_table_border_l bg-white dark:bg-foreground dark:text-white"
                >
                  미사용 연차유급휴가 사용계획서
                </td>
              </tr>
              <tr class="h-8">
                <td class="bg-white dark:bg-foreground" colspan="2"></td>
              </tr>
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
                            width: 100px;
                            padding: 3px !important;
                            height: 22px;
                            vertical-align: middle;
                            border: 0px solid black;
                          "
                        >
                          {{ detail?.empDto?.deptDto?.deptName }}
                        </td>
                      </tr>

                      <tr class="h-4">
                        <td
                          class="bg-white dark:bg-foreground"
                          colspan="2"
                        ></td>
                      </tr>

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
                          {{ detail?.empDto?.name }}
                        </td>
                      </tr>
                      <tr class="h-4">
                        <td
                          class="bg-white dark:bg-foreground"
                          colspan="2"
                        ></td>
                      </tr>
                      <!-- 직위 -->
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
                          직 위 :
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
                          {{ detail?.empDto?.position }}
                        </td>
                      </tr>
                      <tr class="h-4">
                        <td
                          class="bg-white dark:bg-foreground"
                          colspan="2"
                        ></td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>

          <!-- 사용계획서 폼 끝 -->
          <table
            class="__se_tbl"
            style="
              width: 800px;
              margin-top: 0px;
              border-collapse: collapse !important;
              color: black;
              background: white;
              border: 0px solid black;

              margin-left: auto;
              margin-right: auto;
            "
          >
            <tbody>
              <table
                class="__se_tbl"
                style="
                  width: 800px;
                  margin-top: 0px;
                  margin-bottom: 100px;
                  border: 2px solid black;
                  margin-left: auto;
                  margin-right: auto;
                "
              >
                <tr class="text-bold">
                  <td style="border: 1px solid black">
                    연차유급휴가 <br />당해 연도 발생시점
                  </td>
                  <td style="border: 1px solid black">
                    연차유급휴가 <br />당해 연도 사용가능기간
                  </td>
                  <td style="border: 1px solid black">발생연차</td>
                  <td style="border: 1px solid black">사용연차</td>
                  <td style="border: 1px solid black">미사용연차</td>
                </tr>
                <tr>
                  <td style="border: 1px solid black">
                    {{ detail.anvOccurDate }}
                  </td>
                  <td style="border: 1px solid black">
                    {{ detail.anvOccurDate }} ~ {{ detail.anvOccurDate }}
                  </td>
                  <td style="border: 1px solid black">{{ detail.totalAnv }}</td>
                  <td style="border: 1px solid black">
                    {{ detail.totalAnv - detail.remainAnv }}
                  </td>
                  <td style="border: 1px solid black">
                    {{ detail.remainAnv }}
                  </td>
                </tr>
              </table>

              <tr class="h-12">
                <td
                  class="p-3 text-justify bg-white dark:bg-foreground"
                  colspan="2"
                >
                  통지받은 “미사용 연차유급휴가일수”및“휴가사용 계획서 제출"에
                  의거하여 아래와 같이 본인의 미사용 연차유급휴가 사용시기를
                  지정하여 전달 드립니다.
                </td>
              </tr>
              <!-- 사용리스트 -->
              <table
                class="__se_tbl"
                style="
                  width: 800px;
                  margin-top: 0px;
                  margin-bottom: 50px;
                  border: 2px solid black;
                  margin-left: auto;
                  margin-right: auto;
                "
              >
                <tr class="text-bold">
                  <td style="border: 1px solid black">휴가출발일자</td>
                  <td style="border: 1px solid black">휴가종료일자</td>
                  <td style="border: 1px solid black">사용일수</td>
                </tr>
                <!-- 기존에 작성이력이 있으면 여기에 표시 -->
                <tr
                  v-for="(item, index) in previousDateList"
                  :key="index"
                >
                  <td style="border: 1px solid black">
                    {{ item?.startDate }}
                  </td>
                  <td style="border: 1px solid black">
                    {{ item?.endDate }}
                  </td>
                  <td style="border: 1px solid black">
                    {{ item?.useDays }}
                  </td>
                </tr>
                <tr v-for="(item, index) in dateList" :key="index">
                  <td style="border: 1px solid black">
                    {{ item?.startDate }}
                  </td>
                  <td style="border: 1px solid black">
                    {{ item?.endDate }}
                  </td>
                  <td style="border: 1px solid black">
                    {{ item?.useDays }}
                  </td>
                </tr>
              </table>
              <div
                v-if="showDiv"
              >
                <form @submit.prevent="addDate">
                  <div class="mb-4">
                    <label
                      for="date"
                      class="mb-2 font-bold text-gray-900 dark:text-white"
                      >휴가출발일자 선택 </label
                    >
                    <input
                      type="date"
                      id="startDate"
                      name="startDate"
                      class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      v-model="startDate"
                      required
                    />
                    <label
                      for="date"
                      class="mb-2 font-bold text-gray-900 dark:text-white"
                      >휴가종료일자 선택 </label
                    >
                    <input
                      type="date"
                      id="endDate"
                      name="endDate"
                      class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      v-model="endDate"
                      required
                    />
                  </div>

                  <div class="flex justify-center mt-7">
                    <BaseBtn
                    class="mr-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    type="submit"
                  >
                    날짜 추가하기
                  </BaseBtn>
                    <BaseBtn
                      class="mr-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      @click="saveDates"
                    >
                      날짜 저장하기
                    </BaseBtn>
                  </div>
                </form>
              </div>
              <!-- 사용리스트 끝-->

              <tr class="h-12">
                <td
                  class="p-3 text-lg text-center font-bold bg-white dark:bg-foreground"
                  colspan="2"
                >
                  [관련법령&nbsp;:&nbsp;근로기준법&nbsp;제&nbsp;61조&nbsp;연차&nbsp;유급휴가&nbsp;사용&nbsp;촉진]
                </td>
              </tr>
              <tr class="h-12 border">
                <td
                  class="p-3 text-center bg-white dark:bg-foreground"
                  colspan="2"
                >
                  <div class="mb-2 text-sm text-justify">
                    제 61조(연차 유급휴가의 사용 촉진) 사용자가
                    제60조제1항·제3항 및 제4항에 따른 유급휴가의 사용을 촉진하기
                    위하여 다음 각 호의 조치를 하였음에도 불구하고 근로자가
                    휴가를 사용하지 아니하여 제60조제7항 본문에 따라 소멸된
                    경우에는 사용자는 그 사용하지 아니한 휴가에 대하여 보상할
                    의무가 없고, 제60조제7항 단서에 따른 사용자의 귀책사유에
                    해당하지 아니하는 것으로 본다.
                  </div>
                  <div class="mb-2 text-xs text-justify">
                    &nbsp;1. 제60조제7항 본문에 따른 기간이 끝나기 6개월 전을
                    기준으로 10일 이내에 사용자가 근로자별로 사용하지 아니한
                    휴가 일수를 알려주고, 근로자가 그 사용 시기를정하여
                    사용자에게 통보하도록 서면으로 촉구할 것
                  </div>
                  <div class="mb-2 text-xs text-justify">
                    &nbsp; 2. 제1호에 따른 촉구에도 불구하고 근로자가 촉구를
                    받은 때부터 10일 이내에 사용하지 아니한 휴가의 전부 또는
                    일부의 사용 시기를 정하여 사용자에게 통보하지 아니하면
                    제60조제7항 본문에 따른 기간이 끝나기 2개월 전까지 사용자가
                    사용하지 아니한 휴가의 사용 시기를 정하여 근로자에게
                    서면으로 통보할 것
                  </div>
                </td>
              </tr>
              <tr class="h-12">
                <td
                  class="p-3 text-xs text-center font-light bg-white dark:bg-foreground"
                  colspan="2"
                >
                  ※ 미사용 휴가일수는 취합시기/상신여부 등에 따라 차이가 있을 수
                  있습니다. 이상이 있는 경우 연차관리자에게 문의해 주시기
                  바랍니다.
                </td>
              </tr>
            </tbody>
          </table>

          <!-- 하단 증명서 발급 정보-->
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
            <span class="mr-2"> 발급번호: {{ detail?.docId }} &nbsp;| </span>
            <span class="mr-2">
              발급일자: {{ detail?.occurDate }} &nbsp;|
            </span>
          </div>
        </div>
        <!-- 하단 증명서 발급 정보 끝-->
      </div>
      <!-- PDF container 끝 -->
      <div class="flex justify-end mt-5">
        <BaseBtn
          class="mr-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          @click="toggleDiv"
        >
          휴가 추가하기
        </BaseBtn>
        <BaseBtn
          class="mr-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          @click="downloadPDF"
        >
          PDF 다운로드하기
        </BaseBtn>
        <BaseBtn
          class="mr-3 text-white bg-light hover:bg-primary focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-primary dark:focus:ring-blue-800"
          @click="onClickBackBtn"
        >
          돌아가기
        </BaseBtn>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { insertUsePlan, getAnpDocDetail, getListUsePlan } from '@/api/index.js'
import { successToast, failToast } from '@/sweetAlert'
import router from '@/router/index.js'
import html2pdf from 'html2pdf.js'

export default {
  setup() {
    const route = useRoute()

    const docId = route.params.id
    const startDate = ref('') // 시작날짜입력
    const endDate = ref('') // 종료날짜입력
    const useDays = ref(0) // 잔여일수계산용

    // 작성자정보
    const detail = ref({})
    const getEmpInfoList = () => {
      getAnpDocDetail(docId).then((res) => {
        console.log(res.data)
        detail.value = res.data
      })
    }
    getEmpInfoList()

    // 기존작성정보
    const previousDateList = ref({})
    const getUsePlanDateList = () => {
      getListUsePlan(docId).then((res) => {
        previousDateList.value = res.data
        console.log(previousDateList)
      })
    }
    getUsePlanDateList()

    // 연차사용계획 저장리스트
    const dateList = ref([]) // 저장하는 리스트
    const addDate = () => {
      const calculateDiffInDays = () => {
        const start = new Date(startDate.value)
        const end = new Date(endDate.value)
        const diffInTime = end.getTime() - start.getTime()
        const diffInDays = Math.round(diffInTime / (1000 * 3600 * 24))
        useDays.value = diffInDays + 1
      }
      calculateDiffInDays()

      dateList.value.push({
        startDate: startDate.value,
        endDate: endDate.value,
        useDays: useDays.value,
        anpDocDto: { docId: docId },
      })
      console.log(dateList.value)
      console.log(docId) // 왜래키(문서번호)
    }

    // 제출하기버튼
    const saveDates = () => {
      insertUsePlan(dateList.value)
        .then((res) => {
          console.log(res.data)
          successToast('저장이 완료되었습니다.')
        })
        .catch(() => {
          failToast('오류가 발생했습니다.')
        })
    }

    // container div를 jpeg로 변환 후 pdf 다운로드
    const pdfContent = ref(null)
    const downloadPDF = () => {
      const element = pdfContent.value
      const filename = '연차사용계획서_.pdf'
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

    // 돌아가기
    const onClickBackBtn = () => {
      router.go(-1)
    }

    // 휴가 추가 버튼
    const showDiv = ref(false);
    const toggleDiv = () => {
      showDiv.value = !showDiv.value;
    };

    return {
      onMounted,
      startDate,
      endDate,
      dateList,
      addDate,
      saveDates,
      detail,
      previousDateList,
      onClickBackBtn,
      downloadPDF,
      showDiv,
      toggleDiv
    }
  },
}
</script>