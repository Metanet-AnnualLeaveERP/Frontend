<script>
import { onMounted, ref } from 'vue'
import store from '@/store/index.js'
import { getCancelDetail } from '@/api/index.js'
import router from '@/router'
export default {
  props: {
    id: {
      // type: Number,
      required: true,
    },
  },

  setup(props) {
    const alHalfType = ref(false)

    // yyyy년 mm월 dd일 포맷
    const startDateFormat = ref('')
    const endDateFormat = ref('')
    const reqDateFormat = ref('')
    const cancelReqDateFormat = ref('')

    // 나의 상사
    const manager = store.state.mgr
    const item = ref([])
    const loading = ref(false)

    // yyyy년 mm월 dd일로 포맷 변경하는 메소드
    const formatDateToKorean = (d) => {
      // Date 객체로 변환
      const date = new Date(d)

      // 월, 일을 두 자리 숫자로 표현
      const month = String(date.getMonth() + 1).padStart(2, '0')
      const day = String(date.getDate()).padStart(2, '0')

      // 변환된 문자열 생성
      return `${date.getFullYear()}년 ${month}월 ${day}일`
    }

    onMounted(async () => {
      await getCancelDetail(props.id).then((res) => {
        // console.log(res.data)
        item.value = res.data
        loading.value = true
      })

      const typeId = item.value.vcReqDto.vcTypeDto.typeId
      if (item.value.vcReqDto.reqDays <= 1 && (typeId == 3 || typeId == 2)) {
        alHalfType.value = true
      }
      startDateFormat.value = formatDateToKorean(item.value.vcReqDto.startDate)
      endDateFormat.value = formatDateToKorean(item.value.vcReqDto.endDate)
      reqDateFormat.value = formatDateToKorean(item.value.vcReqDto.reqDate)
      cancelReqDateFormat.value = formatDateToKorean(item.value.cancelReqDate)
    })

    return {
      alHalfType,
      startDateFormat,
      endDateFormat,
      reqDateFormat,
      cancelReqDateFormat,
      manager,
      loading,
      item,
    }
  },
}
</script>

<template>
  <div class="container mx-auto" v-if="loading">
    <div class="text-center text-sm">
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
              휴가 취소 확인서
            </td>
          </tr>
          <tr class="h-12">
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
                        width: 200px;
                        padding: 3px !important;
                        height: 22px;
                        vertical-align: middle;
                        border: 0px solid black;
                      "
                    >
                      {{ item.vcReqDto.empDto.deptDto.deptName }}
                    </td>
                  </tr>
                  <tr class="h-4">
                    <td class="bg-white dark:bg-foreground" colspan="2"></td>
                  </tr>
                  <!-- 결재 담당 (상사) -->
                  <!-- 연차이면 자동 승인 -->
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
                      <span v-if="item.vcReqDto.status == '자동승인'">
                        미기재
                      </span>
                      <span v-else>
                        {{ manager.name + ' ' + manager.position }}
                      </span>
                    </td>
                  </tr>
                  <tr class="h-4">
                    <td class="bg-white dark:bg-foreground" colspan="2"></td>
                  </tr>

                  <!-- 결재 상태 -->
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
                      결재 상태 :
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
                      <span>
                        {{ item.vcReqDto.status }}
                      </span>
                    </td>
                  </tr>
                  <tr class="h-4">
                    <td class="bg-white dark:bg-foreground" colspan="2"></td>
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
                      {{ item.vcReqDto.empDto.name }}
                    </td>
                  </tr>
                  <tr class="h-4">
                    <td class="bg-white dark:bg-foreground" colspan="2"></td>
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
                      {{ item.vcReqDto.empDto.position }}
                    </td>
                  </tr>
                  <tr class="h-4">
                    <td class="bg-white dark:bg-foreground" colspan="2"></td>
                  </tr>
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
                      {{ reqDateFormat }}
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
          <tr class="h-4">
            <td class="bg-white dark:bg-foreground" colspan="2"></td>
          </tr>

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
              <span class="mr-5" v-if="item.vcReqDto.vcTypeDto.typeId <= 3">
                ☑ 연차
              </span>
              <span class="mr-5" v-else> ☐ 연차 </span>
              <span
                class="mr-5"
                v-if="item.vcReqDto.vcTypeDto.typeName == '보상'"
              >
                ☑ 보상
              </span>
              <span class="mr-5" v-else> ☐ 보상 </span>
              <span
                class="mr-5"
                v-if="item.vcReqDto.vcTypeDto.typeName == '포상'"
              >
                ☑ 포상
              </span>
              <span class="mr-5" v-else> ☐ 포상 </span>
            </td>
          </tr>
          <!-- 반차 여부 -->
          <tr v-if="alHalfType">
            <td
              class="bg-white font-bold dark:bg-foreground dark:text-white text-left"
              style="padding: 5px; border: 0px solid black; height: 25px"
            >
              &nbsp;- 반차 구분 :
            </td>
            <td
              class="bg-white dark:bg-foreground dark:text-white text-left"
              style="padding: 5px; border: 0px solid black; height: 25px"
            >
              <span
                class="mr-5"
                v-if="item.vcReqDto.vcTypeDto.typeName == '오전반차'"
              >
                ☑ 오전 반차
              </span>
              <span class="mr-5" v-else> ☐ 오전 반차 </span>
              <span
                class="mr-5"
                v-if="item.vcReqDto.vcTypeDto.typeName == '오후반차'"
              >
                ☑ 오후 반차
              </span>
              <span class="mr-5" v-else> ☐ 오후 반차 </span>
            </td>
          </tr>
          <tr class="h-4">
            <td class="bg-white dark:bg-foreground" colspan="2"></td>
          </tr>
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
              v-if="item.vcReqDto.reqDays > 1"
            >
              {{ startDateFormat }} - {{ endDateFormat }}
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
              {{ startDateFormat }}
            </td>
          </tr>
          <tr class="h-4">
            <td class="bg-white dark:bg-foreground" colspan="2"></td>
          </tr>
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
              총 {{ item.vcReqDto.reqDays }} 일
            </td>
          </tr>
          <tr class="h-4">
            <td class="bg-white dark:bg-foreground" colspan="2"></td>
          </tr>
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
              <span v-if="item.vcReqDto.comments != null">
                {{ item.vcReqDto.comments }}
              </span>
              <span v-else>미기재</span>
            </td>
          </tr>
          <tr class="h-4">
            <td class="bg-white dark:bg-foreground" colspan="2"></td>
          </tr>

          <!-- 휴가 취소 관련 내용 -->
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
              상기인은 위 휴가를 취소하였음을 확인합니다.
            </td>
          </tr>
          <tr class="h-4">
            <td class="bg-white dark:bg-foreground" colspan="2"></td>
          </tr>
          <!-- 취소 요청일 -->
          <tr>
            <td
              class="bg-white font-bold dark:bg-foreground dark:text-white text-left"
              style="padding: 5px; border: 0px solid black"
            >
              취소 일자 :
            </td>
            <td
              class="bg-white dark:bg-foreground dark:text-white text-left"
              style="padding: 3px; border: 0px solid black; width: 700px"
            >
              {{ cancelReqDateFormat }}
            </td>
          </tr>
          <tr class="h-4">
            <td class="bg-white dark:bg-foreground" colspan="2"></td>
          </tr>
          <!-- 취소 상태 -->
          <tr>
            <td
              class="bg-white font-bold dark:bg-foreground dark:text-white text-left"
              style="padding: 5px; border: 0px solid black"
            >
              취소 상태 :
            </td>
            <td
              class="bg-white dark:bg-foreground dark:text-white text-left"
              style="padding: 3px; border: 0px solid black; width: 700px"
            >
              {{ item.cancelStatus }}
            </td>
          </tr>
          <tr class="h-4">
            <td class="bg-white dark:bg-foreground" colspan="2"></td>
          </tr>
          <!-- 취소 사유 -->
          <tr>
            <td
              class="bg-white font-bold dark:bg-foreground dark:text-white text-left"
              style="padding: 5px; border: 0px solid black"
            >
              취소 사유 :
            </td>
            <td
              class="bg-white dark:bg-foreground dark:text-white text-left"
              style="padding: 3px; border: 0px solid black; width: 700px"
            >
              {{ item.reqComm }}
            </td>
          </tr>

          <tr class="h-12">
            <td class="bg-white dark:bg-foreground" colspan="2"></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
