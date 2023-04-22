<script>
import {onMounted, ref} from 'vue'
import store from '@/store/index.js'
import {getVcReqDetail} from '@/api/index.js'

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
      await getVcReqDetail(props.id).then((res) => {
        // console.log(res.data)
        item.value = res.data
        loading.value = true
      })

      const typeId = item.value.vcTypeDto.typeId
      if (item.value.reqDays <= 1 && (typeId == 3 || typeId == 2)) {
        alHalfType.value = true
      }

      startDateFormat.value = formatDateToKorean(item.value.startDate)
      endDateFormat.value = formatDateToKorean(item.value.endDate)
      reqDateFormat.value = formatDateToKorean(item.value.reqDate)
    })

    return {
      alHalfType,
      startDateFormat,
      endDateFormat,
      reqDateFormat,
      manager,
      item,
      loading,
    }
  },
}
</script>
<template>
  <div v-if="loading">
    <div class="text-center text-sm">
      <div class="text-3xl">
        휴가 요청 확인서
      </div>
      <table class="__se_tbl">
        <!-- Header -->
        <tbody>
        <!-- 제목 -->
        <tr class="h-12">
          <td class="bg-white dark:bg-foreground" colspan="2"></td>
        </tr>
        <tr>
          <td class="dext_table_border_t dext_table_border_r dext_table_border_b dext_table_border_l bg-white
            dark:bg-foreground dark:text-white">
            <table class="__se_tbl">
              <!-- User -->
              <tbody>
              <!-- 소속 부서 -->
              <tr>
                <td class="bg-white font-bold dark:bg-foreground dark:text-white text-left">
                  소 속 : {{ item.empDto.deptDto.deptName }}
                </td>
              </tr>
              <!-- 결재 담당 (상사) -->
              <!-- 연차이면 자동 승인 -->
              <tr>
                <td class="bg-white font-bold dark:bg-foreground dark:text-white text-left">
                  결재 담당자 :
                  <span v-if="item.status == '자동승인'"> 미기재 </span>
                  <span v-else>{{ manager.name + ' ' + manager.position }}</span>
                </td>
              </tr>
              <!-- 결재 상태 -->
              <tr>
                <td class="bg-white font-bold dark:bg-foreground dark:text-white text-left">
                  결재 상태 : {{ item.status }}
                </td>
              </tr>
              <!-- 성명 -->
              <tr>
                <td class="bg-white font-bold dark:bg-foreground dark:text-white text-left">
                  성 명 : <span class="ml-4">{{ item.empDto.name }}</span>
                </td>
              </tr>

              <!-- 직위 -->
              <tr>
                <td class="bg-white font-bold dark:bg-foreground dark:text-white text-left">
                  직 위 : {{ item.empDto.position }}
                </td>
              </tr>
              <tr class="h-4">
                <td class="bg-white dark:bg-foreground" colspan="2"></td>
              </tr>
              <!-- 휴가 신청일 -->
              <tr>
                <td class="bg-white font-bold dark:bg-foreground dark:text-white text-left">
                  신청일 : {{ reqDateFormat }}
                </td>
              </tr>
              </tbody>
            </table>
          </td>
        </tr>
        </tbody>
      </table>

      <br/>

      <table class="__se_tbl">
        <tbody>
        <tr>
          <td class="bg-white font-bold dark:bg-foreground dark:text-white text-left"
              colspan="2">
            상기인은 아래와 같이 휴가 신청하였음을 확인합니다.
          </td>
        </tr>
        <tr class="h-6">
          <td class="bg-white dark:bg-foreground" colspan="2"></td>
        </tr>
        <!-- 휴가 종류 -->
        <tr>
          <td
              class="bg-white font-bold dark:bg-foreground dark:text-white text-left"

          >
            1. 휴가 구분 :
          </td>
          <td
              class="bg-white dark:bg-foreground dark:text-white text-left"

          >
              <span class="mr-5" v-if="item.vcTypeDto.typeId <= 3">
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
        <tr v-if="alHalfType">
          <td
              class="bg-white font-bold dark:bg-foreground dark:text-white text-left"

          >
            &nbsp;- 반차 구분 :
          </td>
          <td
              class="bg-white dark:bg-foreground dark:text-white text-left"

          >
              <span class="mr-5" v-if="item.vcTypeDto.typeName == '오전반차'">
                ☑ 오전 반차
              </span>
            <span class="mr-5" v-else> ☐ 오전 반차 </span>
            <span class="mr-5" v-if="item.vcTypeDto.typeName == '오후반차'">
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

          >
            2. 휴가 기간 :
          </td>
          <td
              class="bg-white dark:bg-foreground dark:text-white text-left"

              v-if="item.reqDays > 1"
          >
            {{ startDateFormat }} - {{ endDateFormat }}
          </td>
          <td
              class="bg-white dark:bg-foreground dark:text-white"

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

          >
            3. 휴가 일수 :
          </td>
          <td
              class="bg-white dark:bg-foreground dark:text-white text-left"

          >
            총 {{ item.reqDays }} 일
          </td>
        </tr>
        <tr class="h-4">
          <td class="bg-white dark:bg-foreground" colspan="2"></td>
        </tr>
        <!-- 휴가 사유 -->
        <tr>
          <td
              class="bg-white font-bold dark:bg-foreground dark:text-white text-left"

          >
            4. 휴가 사유 :
          </td>
          <td
              class="bg-white dark:bg-foreground dark:text-white text-left"

          >
              <span v-if="item.comments != null">
                {{ item.comments }}
              </span>
            <span v-else>미기재</span>
          </td>
        </tr>
        <tr class="h-12">
          <td class="bg-white dark:bg-foreground" colspan="2"></td>
        </tr>
        <!-- 원칙 -->
        <tr>
          <td
              class="bg-white font-bold dark:bg-foreground dark:text-white text-left"
              colspan="2"

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
            <p class="pb-3">
              - 공가(예비군/민방위)는 사전에 통지서를, 사후에 참석증을 반드시
              제출
            </p>
            <br/>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<style>
td {
  padding: 5px;
}

p {
  padding: 3px;
}
</style>