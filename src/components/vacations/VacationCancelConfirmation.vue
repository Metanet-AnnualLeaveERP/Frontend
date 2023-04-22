<script>
import {onMounted, ref} from 'vue'
import store from '@/store/index.js'
import {getCancelDetail} from '@/api/index.js'
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
    const manager = store.state.mgr.length === 0 ? {name: '인사', position: '팀장'} : store.state.mgr
    // const manager = store.state.mgr
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
  <div class="mx-auto  flex flex-col" v-if="loading">
    <div class="text-center text-sm pl-5">
      <!-- 제목 -->
      <div class="text-3xl pb-20">휴가 취소 확인서</div>
      <table class="cancel-table ">
        <!-- Header -->
        <tbody>
        <!--   소속 -->
        <tr>
          <td class="bg-white font-bold dark:bg-foreground dark:text-white text-left">
            소 속 : <span class="ml-4">{{ item.vcReqDto.empDto.deptDto.deptName }}</span>
          </td>
        </tr>
        <!-- 결재 담당 (상사) -->
        <tr>
          <td class="bg-white font-bold dark:bg-foreground dark:text-white text-left">
            결재 담당자 :
            <span class="ml-4" v-if="item.vcReqDto.status == '자동승인'">미기재</span>
            <span class="ml-4" v-else>{{ manager.name + '' + manager.position }}</span>
          </td>
        </tr>
        <!-- 결재 상태 -->
        <tr>
          <td class="bg-white font-bold dark:bg-foreground dark:text-white text-left">
            결재 상태 :<span class="ml-4">{{ item.vcReqDto.status }}</span>
          </td>
        </tr>
        <!-- 성명 -->
        <tr>
          <td class="bg-white font-bold dark:bg-foreground dark:text-white text-left">
            성 명 :<span class="ml-4">{{ item.vcReqDto.empDto.name }}</span>
          </td>
        </tr>
        <!-- 직위 -->
        <tr>
          <td class="bg-white font-bold dark:bg-foreground dark:text-white text-left">
            직 위 :<span class="ml-4">{{ item.vcReqDto.empDto.position }}</span>
          </td>
        </tr>
        <!-- 휴가 신청일 -->
        <tr>
          <td class="bg-white font-bold dark:bg-foreground
                       dark:text-white text-left">
            신청일 : <span class="ml-4">{{ reqDateFormat }}</span>
          </td>

        </tr>
        </tbody>
      </table>
      <hr class="m-6">
      <table class="__se_tbl">
        <tbody>
        <tr>
          <td class="bg-white dark:bg-foreground" colspan="2"></td>
        </tr>
        <!-- 휴가 종류 -->
        <tr>
          <td class="bg-white font-bold dark:bg-foreground dark:text-white text-left">
            1. 휴가 구분 :
            <span class="ml-4 mr-5" v-if="item.vcReqDto.vcTypeDto.typeId <= 3"> ☑ 연차 </span>
            <span class="ml-4 mr-5" v-else> ☐ 연차 </span>
            <span class="ml-4 mr-5" v-if="item.vcReqDto.vcTypeDto.typeName == '보상'">☑ 보상</span>
            <span class="ml-4 mr-5" v-else> ☐ 보상 </span>
            <span class="ml-4 mr-5" v-if="item.vcReqDto.vcTypeDto.typeName == '포상'">☑ 포상</span>
            <span class="ml-4 mr-5" v-else> ☐ 포상 </span>
          </td>
        </tr>
        <!-- 반차 여부 -->
        <tr v-if="alHalfType">
          <td class="bg-white font-bold dark:bg-foreground dark:text-white text-left">
            &nbsp;- 반차 구분 :
            <span class="ml-4 mr-5" v-if="item.vcReqDto.vcTypeDto.typeName == '오전반차'">☑ 오전 반차</span>
            <span class="ml-4 mr-5" v-else> ☐ 오전 반차 </span>
            <span class="ml-4 mr-5" v-if="item.vcReqDto.vcTypeDto.typeName == '오후반차'">☑ 오후 반차</span>
            <span class="ml-4 mr-5" v-else> ☐ 오후 반차 </span>
          </td>
        </tr>

        <!-- 휴가 기간 -->
        <tr>
          <td class="bg-white font-bold dark:bg-foreground dark:text-white text-left">
            2. 휴가 기간 : <span class="ml-4">{{
              item.vcReqDto.reqDays > 1 ? startDateFormat + '-' + endDateFormat : startDateFormat
            }}</span>
          </td>
        </tr>
        <!-- 휴가 일수 -->
        <tr>
          <td class="bg-white font-bold dark:bg-foreground dark:text-white text-left">
            3. 휴가 일수 :<span class="ml-4">총 {{ item.vcReqDto.reqDays }} 일</span>
          </td>
        </tr>
        <!-- 휴가 사유 -->
        <tr>
          <td class="bg-white font-bold dark:bg-foreground dark:text-white text-left">
            4. 휴가 사유 :
            <span v-if="item.vcReqDto.comments != null">{{ item.vcReqDto.comments }}</span>
            <span v-else class="ml-4">미기재</span>
          </td>
        </tr>
        <!-- 휴가 취소 관련 내용 -->
        <tr>
          <td class="bg-white font-bold dark:bg-foreground dark:text-white text-left" colspan="2">
            상기인은 위 휴가를 취소하였음을 확인합니다.
          </td>
        </tr>

        <!-- 취소 요청일 -->
        <tr>
          <td class="bg-white font-bold dark:bg-foreground dark:text-white text-left">
            취소 일자 : <span class="pl-4">{{ cancelReqDateFormat }}</span>
          </td>
        </tr>
        <!-- 취소 상태 -->
        <tr>
          <td class="bg-white font-bold dark:bg-foreground dark:text-white text-left">
            취소 상태 :<span class="ml-4">{{ item.cancelStatus }}</span>
          </td>
          <!-- 취소 사유 -->
        </tr>
        <tr>
          <td class="bg-white font-bold dark:bg-foreground dark:text-white text-left">
            취소 사유 : <span class="ml-4">{{ item.reqComm }}</span>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style>

table > tbody > tr > td {
  padding: 10px 0px 10px 0px;
}
</style>